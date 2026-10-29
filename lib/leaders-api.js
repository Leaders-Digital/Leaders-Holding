const API = (process.env.LEADERS_API_URL || 'https://serveur.leaders-business.com/api').replace(/\/$/, '');

// Backend sessions last ADMIN_SESSION_HOURS (10h); used only when the JWT has no exp claim.
const FALLBACK_TOKEN_TTL_MS = 9 * 60 * 60 * 1000;
const REFRESH_MARGIN_MS = 5 * 60 * 1000;

export class LeadersApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

let cached = null;
let pendingLogin = null;

function jwtExpiryMs(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'));
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

async function login() {
  const telephone = process.env.LEADERS_API_TELEPHONE;
  const password = process.env.LEADERS_API_PASSWORD;
  if (!telephone || !password) {
    throw new LeadersApiError('LEADERS_API_TELEPHONE and LEADERS_API_PASSWORD must be set', 503);
  }

  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Api-Client': '1' },
    body: JSON.stringify({ telephone, password }),
    cache: 'no-store',
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.accessToken) {
    throw new LeadersApiError(json.message || 'Leaders API login failed', res.ok ? 502 : res.status);
  }

  const exp = jwtExpiryMs(json.accessToken) ?? Date.now() + FALLBACK_TOKEN_TTL_MS;
  cached = { token: json.accessToken, exp: exp - REFRESH_MARGIN_MS };
  return cached.token;
}

async function getToken({ force = false } = {}) {
  if (!force && cached && Date.now() < cached.exp) return cached.token;
  if (force) cached = null;
  if (!pendingLogin) {
    pendingLogin = login().finally(() => { pendingLogin = null; });
  }
  return pendingLogin;
}

async function leadersGet(path) {
  const doFetch = (token) => fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    cache: 'no-store',
  });

  let res = await doFetch(await getToken());
  if (res.status === 401) {
    res = await doFetch(await getToken({ force: true }));
  }
  return res;
}

async function readJson(res) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new LeadersApiError(json.message || `Leaders API error (${res.status})`, res.status);
  return json;
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
  const params = new URLSearchParams({ includeExpired: 'false', page: String(page), limit: String(limit) });
  const json = await readJson(await leadersGet(`/job-offers?${params}`));

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
  const res = await leadersGet(`/job-offers/${encodeURIComponent(id)}`);
  if (res.status === 404 || res.status === 400) return null;
  const json = await readJson(res);

  const offer = json.data ?? json;
  if (!isPublished(offer)) return null;
  return toPublicOffer(offer);
}
