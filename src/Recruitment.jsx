import { useEffect, useRef, useState } from 'react';
import holdingLogo from './assets/leaders-logo.webp';

const API = 'https://serveur.leaders-business.com';
const MONO = "'IBM Plex Mono', monospace";

const initials = (n) => {
  const w = (n || '').split(' ').filter(Boolean);
  return ((w[0] ? w[0][0] : '') + (w[1] ? w[1][0] : '')).toUpperCase() || 'L';
};
const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
};
const logoUrl = (j) => (j.societe && j.societe.logo ? API + j.societe.logo : '');

const translateJobType = (value) => {
  const map = {
    'Full-time': 'Temps plein',
    'Part-time': 'Temps partiel',
    'Contract': 'Contrat',
    Internship: 'Stage',
    Temporary: 'Temporaire',
  };
  return map[value] || value || '';
};

const translateExperience = (value) => {
  const map = {
    '1-2 years': '1 à 2 ans',
    '2-3 years': '2 à 3 ans',
    '3-5 years': '3 à 5 ans',
    '5+ years': '5 ans et plus',
  };
  return map[value] || value || '';
};

const translateEducation = (value) => {
  const map = {
    Master: 'Master',
    Bachelor: 'Licence',
    Other: 'Autre',
    Diploma: 'Diplôme',
  };
  return map[value] || value || '';
};

function sample() {
  return [
    { _id: '6a203eebff8f5c9e940e9b62', title: 'Responsable Achat', jobType: 'Temps plein', experience: '1 à 2 ans', educationLevel: 'Master', vacancies: 1, categories: ['Achat'], expirationDate: '2026-07-05T00:00:00.000Z', description: "Le Responsable Achats est chargé de définir et mettre en œuvre la politique d'approvisionnement de l'entreprise afin de garantir l'acquisition des biens et services nécessaires dans les meilleures conditions de coût, qualité et délai.", requirements: "Diplôme universitaire en gestion, commerce, logistique, achats ou domaine équivalent.\nExpérience confirmée dans les achats et les négociations commerciales.\nBonne maîtrise des techniques d'achat et de gestion des fournisseurs.\nExcellentes capacités de négociation et de communication.\nMaîtrise des outils informatiques et des logiciels ERP.\nSens de l'organisation, rigueur et esprit d'analyse.", location: { country: 'Tunisie', governorate: 'Tunis' }, societe: { nom: 'Leaders Import Export', adresse: 'Les berges du lac 2 - Cité les Pins, En face clinique Hannibal', logo: '/uploads/societes/logo-1779703892420-181025189.webp' }, questions: [] },
    { _id: '6a200c1aff8f5c9e940e9696', title: 'Menuisier Aluminium', jobType: 'Temps plein', experience: '1 à 2 ans', educationLevel: 'Autre', vacancies: 1, categories: ['Aluminium', 'Fabrication'], expirationDate: '2026-12-31T00:00:00.000Z', description: "Nous recherchons un menuisier aluminium pour renforcer notre équipe.\nFabrication et assemblage d'ouvrages en aluminium (portes, fenêtres, façades, vérandas, etc.).\nLecture et interprétation des plans techniques.\nDécoupe, usinage et montage des profilés aluminium.\nInstallation et pose des ouvrages sur chantier.", requirements: "Diplôme en aluminium.\nExpérience en menuiserie aluminium.\nBonne maîtrise des techniques de fabrication et de pose.\nSens de la précision, de l'organisation et du travail en équipe.", location: { country: 'Tunisie', governorate: 'Tunis' }, societe: { nom: 'leaders wood', adresse: 'Les berges du lac 2 - Cité les Pins, En face clinique Hannibal', logo: '/uploads/societes/logo-1781000611367-392481595.png' }, questions: [{ label: 'Avez-vous un diplôme en aluminium ?', type: 'yes_no', required: true, helpText: '', options: [], _id: '6a200c1aff8f5c9e940e9699' }] },
    { _id: '6a1ff889ff8f5c9e940e8af6', title: 'Technicien menuiserie bois', jobType: 'Temps plein', experience: '1 à 2 ans', educationLevel: 'Autre', vacancies: 1, categories: ['Menuiserie'], expirationDate: '2026-12-31T00:00:00.000Z', description: "Nous recherchons un menuisier bois qualifié pour rejoindre notre équipe.\nFabrication et assemblage de meubles et éléments d'agencement en bois.\nTravail sur panneaux MDF, mélaminés et dérivés du bois.\nUtilisation et programmation de machines CNC pour la découpe et l'usinage.\nLecture de plans techniques et contrôle qualité.", requirements: "Diplômé en menuiserie.\nExpérience en menuiserie bois.\nMaîtrise du travail du MDF et des panneaux dérivés du bois.\nBonne connaissance des machines CNC.\nSérieux, rigueur et esprit d'équipe.", location: { country: 'Tunisie', governorate: 'Ariana', city: 'La Soukra' }, societe: { nom: 'leaders wood', adresse: 'Les berges du lac 2 - Cité les Pins, En face clinique Hannibal', logo: '/uploads/societes/logo-1781000611367-392481595.png' }, questions: [{ label: 'Est-ce que vous avez un diplôme en menuiserie ?', type: 'yes_no', required: true, helpText: '', options: [], _id: '6a1ff889ff8f5c9e940e8af9' }, { label: 'Travaillez-vous sur des panneaux MDF ?', type: 'yes_no', required: true, helpText: '', options: [], _id: '6a1ff889ff8f5c9e940e8afd' }, { label: "Maîtrisez-vous l'utilisation et la programmation de machines CNC ?", type: 'yes_no', required: true, helpText: '', options: [], _id: '6a1ff889ff8f5c9e940e8b02' }] },
    { _id: '69df62fffbe6b467b5295e6a', title: 'Coordinatrice Digitale', jobType: 'Temps plein', experience: '1 à 2 ans', educationLevel: 'Licence', vacancies: 1, salary: '1000', categories: ['Gestion', 'Service Client', 'Commerce', 'digital'], expirationDate: '2026-10-05T00:00:00.000Z', description: "Nous recherchons un Responsable Gestion Équipe et Clients pour superviser efficacement les membres de l'équipe et répondre aux demandes des clients. Vous serez chargé d'optimiser les processus internes pour améliorer l'efficacité et la satisfaction client.", requirements: "Compétences en gestion d'équipe et leadership.\nExcellentes compétences en communication et relation client.\nCapacité à résoudre les problèmes de manière proactive.\nExpérience dans le secteur commercial.\nQualités organisationnelles et de planification.", location: { country: 'Tunisie', governorate: 'Tunis', city: 'Tunis' }, societe: { nom: 'Leaders Digital', adresse: 'Tunis, Tunisie', logo: '/uploads/societes/logo-1770223041989-859462628.jpg' }, questions: [{ label: "Avez-vous une expérience préalable dans la gestion d'une équipe dans le secteur commercial ?", type: 'yes_no', required: true, helpText: 'Indiquez si vous avez déjà supervisé une équipe.', options: [], _id: '69df62fffbe6b467b5295e6d' }, { label: 'Comment évalueriez-vous vos compétences en communication et relation client ?', type: 'rating', required: true, helpText: 'Sur une échelle de 1 à 5.', options: [], _id: '69df62fffbe6b467b5295e71' }, { label: 'Quel outil digital utilisez-vous le plus souvent ?', type: 'single_choice', required: false, helpText: '', options: [{ label: 'Trello' }, { label: 'Asana' }, { label: 'Slack' }, { label: 'Autre' }], _id: '69df62fffbe6b467b5295e76' }] },
  ];
}

const field = { width: '100%', padding: '13px 15px', borderRadius: 12, border: '1px solid rgba(20,24,31,0.14)', background: '#fff', fontSize: 14.5, color: '#14181f', fontFamily: "'Inter Tight', sans-serif" };
const lbl = { display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', color: 'rgba(20,24,31,0.6)', marginBottom: 7 };

export default function Recruitment() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '' });
  const [answers, setAnswers] = useState({});
  const [cvName, setCvName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const cvFile = useRef(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`${API}/api/job-offers?status=published&includeExpired=false&page=1&limit=20`, { headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error('http');
      const j = await r.json();
      setJobs((j && j.data) || []); setOffline(false); setLoading(false);
    } catch (e) {
      setJobs(sample()); setOffline(true); setLoading(false);
    }
  }

  const open = (id) => { setSelectedId(id); setSubmitted(false); setSubmitError(null); setForm({ nom: '', prenom: '', email: '', telephone: '' }); setAnswers({}); setCvName(''); cvFile.current = null; window.scrollTo(0, 0); };
  const back = () => { setSelectedId(null); window.scrollTo(0, 0); };
  const onCv = (e) => { const f = e.target.files && e.target.files[0]; cvFile.current = f || null; setCvName(f ? f.name : ''); };

  async function submit() {
    const job = jobs.find((j) => j._id === selectedId); if (!job) return;
    if (!form.prenom || !form.nom || !form.email || !form.telephone) { setSubmitError('Veuillez remplir vos nom, prénom, e-mail et téléphone.'); return; }
    if (!cvFile.current) { setSubmitError('Veuillez joindre votre CV au format PDF.'); return; }
    for (const q of job.questions || []) { if (q.required) { const v = answers[q._id]; if (v == null || v === '') { setSubmitError('Veuillez répondre à toutes les questions obligatoires.'); return; } } }
    setSubmitting(true); setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append('nom', form.nom); fd.append('prenom', form.prenom); fd.append('email', form.email); fd.append('telephone', form.telephone);
      fd.append('cv', cvFile.current);
      fd.append('answers', JSON.stringify((job.questions || []).map((q) => ({ questionId: q._id, questionLabel: q.label, questionType: q.type, value: answers[q._id] }))));
      const r = await fetch(`${API}/api/job-offers/${job._id}/apply`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      await r.json().catch(() => ({}));
      setSubmitting(false); setSubmitted(true);
    } catch (e) {
      setSubmitting(false); setSubmitError('Échec de l’envoi de la candidature (' + (e.message || 'erreur') + '). En production sur votre domaine, l’envoi fonctionnera normalement.');
    }
  }

  const selected = selectedId ? jobs.find((j) => j._id === selectedId) : null;
  const optionsFor = (q) => q.type === 'yes_no' ? [{ value: 'Oui', label: 'Oui' }, { value: 'Non', label: 'Non' }]
    : q.type === 'rating' ? [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n} / 5` }))
    : q.type === 'single_choice' ? (q.options || []).map((o) => ({ value: o.label, label: o.label })) : null;

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(120% 90% at 50% 0%,#fbfcfe 0%,#f1f4f9 55%,#e8edf4 100%)', fontFamily: "'Inter Tight', sans-serif", color: '#14181f' }}>
      <header className="rc-head" style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', background: 'rgba(244,246,250,0.82)', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)', borderBottom: '1px solid rgba(20,24,31,0.07)' }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img src={holdingLogo} alt="Leaders Holding" style={{ height: 38, width: 'auto', display: 'block' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#14181f', lineHeight: 1 }}>Leaders Holding</span>
            <span className="rc-head-sub" style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', lineHeight: 1 }}>Carrières · Recrutement</span>
          </div>
        </a>
        <a href="#home" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#14181f', textDecoration: 'none', padding: '11px 18px', borderRadius: 100, border: '1px solid rgba(20,24,31,0.14)', background: 'rgba(255,255,255,0.7)' }}>← Retour au site</a>
      </header>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '160px 40px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', border: '3px solid rgba(197,160,57,0.25)', borderTopColor: '#C5A039', animation: 'rc-spin 0.9s linear infinite' }} />
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)' }}>Chargement des offres…</div>
        </div>
      )}

      {!loading && !selected && (
        <>
          <section className="rc-hero" style={{ maxWidth: 1120, margin: '0 auto', padding: '78px 40px 26px' }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>Postes ouverts · {jobs.length}</div>
            <h1 style={{ fontSize: 'clamp(38px,6vw,76px)', lineHeight: 0.98, fontWeight: 600, letterSpacing: '-0.04em', color: '#14181f', maxWidth: '16ch' }}>Construisez votre carrière chez <span style={{ background: 'linear-gradient(115deg,#E9C879,#C5A039)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Leaders</span>.</h1>
            <p style={{ marginTop: 22, fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.55, color: 'rgba(20,24,31,0.6)', maxWidth: '56ch' }}>Rejoignez l'une de nos sociétés à travers le groupe — immobilier, construction, technologie, commerce et plus encore. Découvrez nos offres et postulez en quelques minutes.</p>
            {offline && <div style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 100, background: 'rgba(197,160,57,0.12)', border: '1px solid rgba(197,160,57,0.3)', fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9c7d2c' }}>Aperçu hors-ligne · données d'exemple</div>}
          </section>
          <section className="rc-list" style={{ maxWidth: 1120, margin: '0 auto', padding: '24px 40px 110px' }}>
            {jobs.length === 0 && (
              <div style={{ padding: '70px 40px', textAlign: 'center', borderRadius: 22, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.7)' }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#14181f' }}>Aucune offre publiée pour le moment.</div>
              </div>
            )}
            <div className="rc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 22 }}>
              {jobs.map((j) => {
                const soc = j.societe || {}, loc = j.location || {};
                const desc = (j.description || '').replace(/\s+/g, ' ').trim();
                return (
                  <div key={j._id} className="rc-card" onClick={() => open(j._id)} style={{ cursor: 'pointer', borderRadius: 22, padding: '26px 26px 24px', background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(14px) saturate(150%)', WebkitBackdropFilter: 'blur(14px) saturate(150%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 18px 44px -28px rgba(30,45,70,0.4)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                      <div style={{ flex: 'none', width: 50, height: 50, borderRadius: 12, background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(20,24,31,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {soc.logo ? <div style={{ width: '100%', height: '100%', backgroundImage: `url("${logoUrl(j)}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundOrigin: 'content-box', backgroundClip: 'content-box', padding: 7 }} /> : <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 500, color: '#C5A039' }}>{initials(soc.nom || j.title)}</span>}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(20,24,31,0.55)' }}>{soc.nom}</div>
                        <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.4)', marginTop: 3 }}>{[loc.city, loc.governorate].filter(Boolean).join(', ') || loc.country}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#14181f' }}>{j.title}</div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'rgba(20,24,31,0.58)' }}>{desc.length > 135 ? desc.slice(0, 135) + '…' : desc}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 2 }}>
                      <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9c7d2c', background: 'rgba(197,160,57,0.13)', padding: '5px 10px', borderRadius: 7 }}>{translateJobType(j.jobType)}</span>
                      <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.5)', background: 'rgba(20,24,31,0.05)', padding: '5px 10px', borderRadius: 7 }}>{translateExperience(j.experience)}</span>
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C5A039' }}>Voir &amp; postuler →</div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {selected && (
        <section className="rc-detail" style={{ maxWidth: 880, margin: '0 auto', padding: '46px 40px 110px' }}>
          <div onClick={back} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.55)', marginBottom: 30 }}>← Toutes les offres</div>
          {(() => {
            const j = selected, soc = j.societe || {}, loc = j.location || {};
            const chips = [];
            if (j.jobType) chips.push(j.jobType);
            const ls = [loc.city, loc.governorate].filter(Boolean).join(', ') || loc.country; if (ls) chips.push(ls);
            if (j.experience) chips.push('Exp. ' + translateExperience(j.experience)); if (j.educationLevel) chips.push(translateEducation(j.educationLevel));
            if (j.vacancies) chips.push(j.vacancies + ' poste' + (j.vacancies > 1 ? 's' : '')); if (j.salary) chips.push(j.salary + ' TND');
            const reqs = (j.requirements || '').split(/\r?\n/).map((x) => x.trim()).filter((x) => x && x !== ':' && x !== 'Conditions :');
            const descs = (j.description || '').split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
            return (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22 }}>
                  <div style={{ flex: 'none', width: 74, height: 74, borderRadius: 18, background: '#fff', boxShadow: '0 16px 38px -20px rgba(30,45,70,0.4), inset 0 0 0 1px rgba(20,24,31,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {soc.logo ? <div style={{ width: '100%', height: '100%', backgroundImage: `url("${logoUrl(j)}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundOrigin: 'content-box', backgroundClip: 'content-box', padding: 11 }} /> : <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 500, color: '#C5A039' }}>{initials(soc.nom || j.title)}</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(20,24,31,0.55)' }}>{soc.nom}</div>
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.42)', marginTop: 4 }}>{soc.adresse}</div>
                  </div>
                </div>
                <h1 style={{ fontSize: 'clamp(30px,4.5vw,52px)', lineHeight: 1.02, fontWeight: 600, letterSpacing: '-0.035em', color: '#14181f' }}>{j.title}</h1>
                <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {chips.map((c, i) => <span key={i} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.6)', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(20,24,31,0.08)', padding: '7px 13px', borderRadius: 100 }}>{c}</span>)}
                </div>
                {j.expirationDate && <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9c7d2c' }}>Candidatures jusqu'au {fmtDate(j.expirationDate)}</div>}
                <div style={{ marginTop: 40, height: 1, background: 'rgba(20,24,31,0.1)' }} />
                <div style={{ marginTop: 36 }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>Description du poste</div>
                  {descs.map((p, i) => <p key={i} style={{ fontSize: 16, lineHeight: 1.66, color: 'rgba(20,24,31,0.72)', marginBottom: 12 }}>{p}</p>)}
                </div>
                {reqs.length > 0 && (
                  <div style={{ marginTop: 34 }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 18 }}>Profil recherché</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                      {reqs.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <span style={{ flex: 'none', width: 6, height: 6, borderRadius: '50%', background: '#C5A039', display: 'block', marginTop: 9 }} />
                          <span style={{ fontSize: 15.5, lineHeight: 1.55, color: 'rgba(20,24,31,0.72)' }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 48, borderRadius: 24, padding: '36px 34px 38px', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px) saturate(150%)', WebkitBackdropFilter: 'blur(16px) saturate(150%)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 28px 64px -36px rgba(30,45,70,0.4)' }}>
                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                      <div style={{ width: 58, height: 58, borderRadius: '50%', margin: '0 auto 22px', background: 'linear-gradient(115deg,#E9C879,#C5A039)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff' }}>✓</div>
                      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: '#14181f' }}>Candidature soumise avec succès</div>
                      <div style={{ marginTop: 12, fontSize: 15, color: 'rgba(20,24,31,0.6)', maxWidth: '42ch', margin: '12px auto 0', lineHeight: 1.55 }}>Merci — notre équipe de recrutement examinera votre dossier et vous contactera si votre profil correspond.</div>
                      <div onClick={back} style={{ marginTop: 26, display: 'inline-flex', cursor: 'pointer', fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5A039', border: '1px solid rgba(197,160,57,0.4)', padding: '13px 24px', borderRadius: 100 }}>← Voir d'autres offres</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C5A039', marginBottom: 6 }}>Postuler à cette offre</div>
                      <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: '-0.02em', color: '#14181f', marginBottom: 24 }}>Votre candidature</div>
                      <div className="rc-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div><label style={lbl}>Prénom *</label><input type="text" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Votre prénom" style={field} /></div>
                        <div><label style={lbl}>Nom *</label><input type="text" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Votre nom" style={field} /></div>
                        <div><label style={lbl}>Email *</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@exemple.com" style={field} /></div>
                        <div><label style={lbl}>Téléphone *</label><input type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="+216 …" style={field} /></div>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <label style={lbl}>CV (PDF) *</label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '14px 16px', borderRadius: 12, border: '1px dashed rgba(20,24,31,0.22)', background: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                          <span style={{ flex: 'none', fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff', background: '#14181f', padding: '9px 14px', borderRadius: 8 }}>Choisir un fichier</span>
                          <span style={{ fontSize: 13.5, color: cvName ? '#14181f' : 'rgba(20,24,31,0.45)' }}>{cvName || 'Aucun fichier sélectionné'}</span>
                          <input type="file" accept="application/pdf" onChange={onCv} style={{ display: 'none' }} />
                        </label>
                      </div>
                      {(j.questions || []).length > 0 && (
                        <>
                          <div style={{ marginTop: 28, height: 1, background: 'rgba(20,24,31,0.08)' }} />
                          <div style={{ marginTop: 24, fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(20,24,31,0.45)', marginBottom: 18 }}>Questions de présélection</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {(j.questions || []).map((q) => {
                              const opts = optionsFor(q);
                              return (
                                <div key={q._id}>
                                  <label style={{ display: 'block', fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em', color: '#14181f', marginBottom: 4, lineHeight: 1.4 }}>{q.label}{q.required ? ' *' : ''}</label>
                                  {q.helpText && <div style={{ fontSize: 12.5, color: 'rgba(20,24,31,0.5)', marginBottom: 9, lineHeight: 1.45 }}>{q.helpText}</div>}
                                  {opts ? (
                                    <select value={answers[q._id] || ''} onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} style={{ ...field, cursor: 'pointer' }}>
                                      <option value="">Sélectionnez…</option>
                                      {opts.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
                                    </select>
                                  ) : (
                                    <input type="text" value={answers[q._id] || ''} onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })} placeholder="Votre réponse" style={field} />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                      {submitError && <div style={{ marginTop: 22, padding: '13px 16px', borderRadius: 12, background: 'rgba(210,59,59,0.08)', border: '1px solid rgba(210,59,59,0.3)', fontSize: 13.5, color: '#b03030', lineHeight: 1.45 }}>{submitError}</div>}
                      <div onClick={submit} style={{ marginTop: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, cursor: 'pointer', fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0b0b0d', padding: '17px 28px', borderRadius: 100, background: 'linear-gradient(115deg,#E9C879,#C5A039)', boxShadow: '0 16px 40px -14px rgba(197,160,57,0.6)' }}>
                        {submitting ? <><span style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid rgba(11,11,13,0.3)', borderTopColor: '#0b0b0d', animation: 'rc-spin 0.8s linear infinite', display: 'block' }} /> Envoi…</> : 'Envoyer ma candidature →'}
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          })()}
        </section>
      )}
    </div>
  );
}
