const API = (process.env.LEADERS_API_URL || 'https://serveur.leaders-business.com/api').replace(/\/$/, '');

let cachedToken = null;
let tokenExpiry = 0;

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const telephone = process.env.LEADERS_API_TELEPHONE;
  const password = process.env.LEADERS_API_PASSWORD;
  if (!telephone || !password) {
    throw new Error('LEADERS_API_TELEPHONE and LEADERS_API_PASSWORD must be set');
  }

  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Api-Client': '1' },
    body: JSON.stringify({ telephone, password }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.accessToken) {
    throw new Error(json.message || 'Leaders API login failed');
  }

  cachedToken = json.accessToken;
  tokenExpiry = Date.now() + 23 * 60 * 60 * 1000;
  return cachedToken;
}

function isPublished(offer) {
  if (offer.status !== 'published' || offer.isActive === false) return false;
  if (!offer.expirationDate) return true;
  return new Date(offer.expirationDate) >= new Date();
}

export function toPublicOffer(offer) {
  if (!offer) return null;
  return {
    _id: offer._id,
    title: offer.title,
    jobType: offer.jobType,
    experience: offer.experience,
    educationLevel: offer.educationLevel,
    vacancies: offer.vacancies,
    salary: offer.salary,
    categories: offer.categories,
    expirationDate: offer.expirationDate,
    description: offer.description,
    requirements: offer.requirements,
    location: offer.location,
    societe: offer.societe
      ? {
          nom: offer.societe.nom,
          adresse: offer.societe.adresse,
          logo: offer.societe.logo,
        }
      : undefined,
    questions: (offer.questions || []).map((q) => ({
      _id: q._id,
      label: q.label,
      type: q.type,
      required: q.required,
      helpText: q.helpText,
      options: q.options,
    })),
  };
}

export async function getPublishedJobOffers(page = 1, limit = 20) {
  const token = await getToken();
  const url = new URL(`${API}/job-offers`);
  url.searchParams.set('includeExpired', 'false');
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    cache: 'no-store',
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || `Leaders API error (${res.status})`);

  const data = (json.data || []).filter(isPublished).map(toPublicOffer);
  return {
    data,
    count: data.length,
    total: json.total ?? data.length,
    page: json.page ?? page,
    totalPages: json.totalPages ?? 1,
  };
}

export async function getJobOffer(id) {
  const token = await getToken();
  const res = await fetch(`${API}/job-offers/${id}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    cache: 'no-store',
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || `Leaders API error (${res.status})`);

  const offer = json.data ?? json;
  if (!isPublished(offer)) return null;
  return toPublicOffer(offer);
}
