import { logo } from './logos';

export const SECTORS = [
  { key: 'realestate', name: 'Immobilier & Patrimoine', short: 'Immobilier', accent: '#2f6fb0',
    tag: 'Le patrimoine pensé comme un portefeuille.',
    about: 'Le plus grand pôle du groupe — développement, courtage, investissement et places de marché numériques pour le résidentiel comme le commercial.',
    svc: [['Développement', 'Projets résidentiels et mixtes, de A à Z.'], ['Courtage', 'Conseil et transactions pour acheteurs, vendeurs et investisseurs.'], ['Investissement', 'Portefeuilles conçus pour des rendements de long terme.'], ['Plateforme', 'Des outils numériques qui relient le bien à ses publics.']],
    societies: [
      ['Leaders Immobilier', 'Flagship development & sales.', 'immobilier.webp', '#2f6fb0', '#6b7178', '#eef3f9'],
      ['Le Portail Immobilier', 'Place de marché immobilière numérique.', 'port.webp', '#16294d', '#1a9fd4', '#edf1f8'],
      ['Le Coin Immobilier', 'Annonces à l’échelle du quartier.', 'lecoin.webp', '#1f2d5a', '#f0b21f', '#f1f3f9'],
      ['Négoce Immobilier', 'Transactions et négociation.', 'negoce.webp', '#1c2d54', '#c8202e', '#f3f3f7'],
      ['Inna Immobilier', 'Acquisitions boutique.', 'inna.webp', '#1a1a1a', '#e2231a', '#f5f3f3'],
      ['Global Leaders Trade', 'Investissement et commerce international.', 'global-trade.png', '#1f3566', '#d4a431', '#eff2f8'],
      ['Gratia Immobilier', 'Conseil résidentiel.', null, '#2f6fb0', '#8aa6c4', '#eef3f9'],
      ['Sté Promotion Ben Ismail', 'Promotion et développement immobilier.', null, '#1c2d54', '#9aa6b8', '#eef2f8'],
    ] },
  { key: 'construction', name: 'Construction & Matériaux', short: 'Construction', accent: '#c9a24a',
    tag: 'Nous bâtissons ce sur quoi la ville repose.',
    about: 'Entreprise générale et fabrication qui rendent les façades modernes possibles — structure, aluminium et systèmes de vitrage.',
    svc: [['Entreprise générale', 'Construction de grande ampleur, résidentielle et tertiaire.'], ['Aluminium & vitrage', 'Murs-rideaux et façades de précision.'], ['Ouvrages structurels', 'Fondations et ossatures conçues pour durer.'], ['Finitions', 'Les détails qui transforment la structure en architecture.']],
    societies: [
      ['Leaders Building', 'General contracting at scale.', 'building.webp', '#1f2228', '#c9a24a', '#f4f3ee'],
      ['Leaders Diamant Aluminium', 'Aluminium & curtain-wall fabrication.', 'diamant.webp', '#1c1f24', '#2f8fd4', '#eef2f6'],
    ] },
  { key: 'energy', name: 'Énergie & Électricité', short: 'Énergie', accent: '#2f4fd0',
    tag: 'Le courant qui relie tout.',
    about: 'Installation électrique et infrastructures pour chaque projet Leaders, de bout en bout — puissance, distribution et systèmes intelligents.',
    svc: [['Installation', 'Équipements électriques pour le résidentiel et le tertiaire.'], ['Infrastructure', 'Distribution, postes et raccordement au réseau.'], ['Systèmes intelligents', 'Automatisation et gestion énergétique.'], ['Maintenance', 'Inspection et entretien à l’échelle du groupe.']],
    societies: [['Leaders Extra Electric', 'Electrical installation & infrastructure.', 'extra.webp', '#2f4fd0', '#5bc23a', '#eef1fb']] },
  { key: 'technology', name: 'Technologie & Digital', short: 'Technologie', accent: '#6a3fb5',
    tag: 'Les systèmes derrière les bâtiments.',
    about: 'Logiciels, infrastructures numériques et colonne vertébrale technique qui gardent chaque société connectée et opérationnelle.',
    svc: [['Logiciel', 'Plateformes sur mesure et systèmes internes.'], ['Infrastructure', 'Cloud, réseaux et socle numérique.'], ['Produit', 'Expériences numériques orientées client.'], ['Données', 'Analyses qui éclairent chaque décision.']],
    societies: [['Leaders Digital', 'Software & digital infrastructure.', 'digital.webp', '#6a3fb5', '#4db4e8', '#f3f0fa']] },
  { key: 'commerce', name: 'Import / Export & Commerce', short: 'Commerce', accent: '#1f7ab0',
    tag: 'Des marchandises qui avancent avec intention.',
    about: 'Commerce général, import et export — sourcing, logistique et trade reliant les produits du groupe aux marchés locaux et internationaux.',
    svc: [['Import', 'Approvisionnement auprès de partenaires internationaux de confiance.'], ['Export', 'Ouverture des produits du groupe vers de nouveaux marchés.'], ['Logistique', 'Fret, douane et coordination du dernier kilomètre.'], ['Distribution', 'Réseaux de gros et de détail.']],
    societies: [['Leaders Import Export', 'Import, export & logistics.', 'import-export.webp', '#173042', '#1f9ad6', '#eef2f5']] },
  { key: 'seafood', name: 'Pêche & Produits de la mer', short: 'Mer', accent: '#1d8aa0',
    tag: 'De la mer, de manière responsable.',
    about: 'Une activité de pêche et de produits de la mer fondée sur un sourcing responsable — fraîcheur, chaîne du froid et partenariats côtiers.',
    svc: [['Pêche', 'Capture et approvisionnement responsables.'], ['Chaîne du froid', 'Intégrité du bateau jusqu’au client.'], ['Transformation', 'Nettoyage, tri et conditionnement.'], ['Distribution', 'Approvisionnement frais pour le marché.']],
    societies: [['Leaders Fish', 'Responsible fishing & seafood supply.', 'fish.webp', '#1d7a8c', '#28b6c8', '#ecf5f7']] },
  { key: 'agriculture', name: 'Agriculture & Agroalimentaire', short: 'Agriculture', accent: '#8a8f4d',
    tag: 'La croissance commence à la racine.',
    about: 'Agriculture durable et gestion de terres d’exception — foncier productif, pratiques responsables et chaînes d’approvisionnement de long terme.',
    svc: [['Foncier', 'Acquisition et gestion de terres d’exception.'], ['Production', 'Résultats durables et à haut rendement.'], ['Agritech', 'Des pratiques guidées par la donnée pour de meilleurs rendements.'], ['Approvisionnement', 'Distribution du champ au marché.']],
    societies: [['Leaders Agro Elite', 'Sustainable farmland & agribusiness.', 'agro.webp', '#4a5a3a', '#8a8f4d', '#f1f2ec']] },
  { key: 'cosmetics', name: 'Cosmétique & Beauté', short: 'Beauté', accent: '#c9a24a',
    tag: 'La beauté, formulée.',
    about: 'Une ligne cosmétique et beauté — formulation, marque et distribution pour une clientèle moderne et exigeante.',
    svc: [['Formulation', 'Développement produit propre et réfléchi.'], ['Marque', 'Identité et récit de marque.'], ['Distribution', 'Présence boutique et numérique.'], ['Soin', 'Après-vente et communauté.']],
    societies: [['Leaders Makeup', 'Cosmetics & beauty line.', 'makeup.webp', '#1a1a1a', '#c9a24a', '#f6f4ef']] },
  { key: 'consulting', name: 'Conseil, Études & Services', short: 'Conseil', accent: '#2f5fa8',
    tag: 'Chaque projet commence par une étude.',
    about: 'Études d’ingénierie, faisabilité, stratégie, travaux climatiques et services opérationnels — la couche professionnelle qui réduit le risque et façonne tout ce que le groupe construit.',
    svc: [['Études', 'Ingénierie, faisabilité et conception technique.'], ['Stratégie', 'Conseil corporate et projet.'], ['Multi-technique', 'CVC, climatisation et lots intégrés.'], ['Services', 'Support opérationnel pour l’ensemble du groupe.']],
    societies: [
      ['Nexting Etude', 'Engineering & feasibility studies.', 'nexting.webp', '#1f3a66', '#5b6770', '#eef1f6'],
      ['Gratia Service', 'Operational support services.', 'gratia.webp', '#2f5fa8', '#d23b3b', '#f1f3f8'],
      ['Leaders Business', 'Corporate strategy & advisory.', 'business.webp', '#5b626b', '#9aa0a8', '#f2f3f5'],
      ['Leaders Multiworks', 'HVAC, climate & multi-trade works.', 'multi.webp', '#1a4f8b', '#e23b2e', '#eef2f7'],
    ] },
  { key: 'automotive', name: 'Automobile & Transport de luxe', short: 'Automobile', accent: '#b25b49',
    tag: 'Une mobilité choisie avec soin.',
    about: 'Véhicules de luxe et transport sur mesure — une flotte sélectionnée et un service d’acquisition pour une clientèle qui attend l’exception.',
    svc: [['Vente luxe', 'Sélection de véhicules d’exception.'], ['Acquisition', 'Recherche de modèles rares et sur mesure dans le monde entier.'], ['Conciergerie', 'Livraison et accompagnement haut de gamme.'], ['Flotte', 'Flottes gérées pour partenaires et projets.']],
    societies: [['Leaders Luxury Cars', 'Luxury vehicles & acquisition.', null, '#1f2228', '#b25b49', '#f6f1ef']] },
  { key: 'timber', name: 'Bois & Menuiserie', short: 'Bois', accent: '#8a5a2b',
    tag: 'Travailler avec le fil du bois.',
    about: 'Approvisionnement en bois et menuiserie fine — de la matière brute à la finition pour les développements du groupe et au-delà.',
    svc: [['Approvisionnement', 'Stock de bois issu de sources responsables.'], ['Débit', 'Découpe et traitement selon les spécifications.'], ['Menuiserie', 'Mobilier sur mesure et aménagement.'], ['Fourniture', 'Matériaux pour les projets du groupe.']],
    societies: [['Leaders Wood', 'Timber sourcing & fine woodworking.', null, '#8a5a2b', '#4a7c3a', '#f4f1eb']] },
  { key: 'travel', name: 'Voyage & Tourisme', short: 'Voyage', accent: '#2f9ad0',
    tag: 'Le monde, bien organisé.',
    about: 'Services de voyage et de tourisme — séjours, déplacements et expériences organisés selon les standards du groupe.',
    svc: [['Voyage', 'Circuits et formules sélectionnés.'], ['Séjours', 'Hébergements choisis avec soin.'], ['Corporate', 'Gestion des déplacements professionnels.'], ['Expériences', 'Itinéraires sur mesure.']],
    societies: [['Leaders Travel', 'Travel & tourism services.', null, '#2f9ad0', '#f0a51f', '#eef4f9']] },
  { key: 'holdings', name: 'Holding & Luxe', short: 'Holding', accent: '#C5A039',
    tag: 'L’adresse derrière les adresses.',
    about: 'Le noyau corporate — la société holding et sa marque lifestyle luxe qui fixent le standard de tout l’écosystème.',
    svc: [['Gouvernance', 'Direction et supervision du groupe.'], ['Capital', 'Allocation à travers le portefeuille.'], ['Luxe', 'Art de vivre et résidences haut de gamme.'], ['Marque', 'Le standard Leaders, à l’échelle du groupe.']],
    societies: [
      ['Leaders Holding', 'Le noyau corporate du groupe.', 'leaders-logo.webp', '#b8901f', '#14181f', '#fbf8ef'],
      ['Leaders Luxury', 'Art de vivre et résidences haut de gamme.', 'luxury.webp', '#b9923a', '#1f2228', '#f8f5ee'],
    ] },
];

const hexA = (hex, a) => {
  const h = hex.replace('#', '');
  return `rgba(${parseInt(h.substr(0, 2), 16)},${parseInt(h.substr(2, 2), 16)},${parseInt(h.substr(4, 2), 16)},${a})`;
};

const initials = (name) => {
  const w = name.split(' ').filter(Boolean);
  return ((w[0] ? w[0][0] : '') + (w[1] ? w[1][0] : '')).toUpperCase();
};

export const GEO = (() => {
  const n = SECTORS.length;
  const R = 39;
  return SECTORS.map((s, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const societies = s.societies.map(([name, blurb, lf, P, A, B]) => ({
      name, blurb, P, A, B, logoUrl: logo(lf), hasLogo: !!lf, initials: initials(name),
      softA: hexA(P, 0.4), glowA: hexA(P, 0.45),
    }));
    return {
      ...s,
      x: +(50 + R * Math.cos(a)).toFixed(2),
      y: +(50 + R * Math.sin(a)).toFixed(2),
      count: s.societies.length,
      countPad: String(s.societies.length).padStart(2, '0'),
      societies,
    };
  });
})();

export const ALL_SOC = (() => {
  const out = [];
  let idx = 0;
  for (const s of SECTORS) {
    for (const [name, , lf, P] of s.societies) {
      out.push({
        idx: idx++, name, P, logoUrl: logo(lf), hasLogo: !!lf, initials: initials(name),
        softA: hexA(P, 0.5), glowA: hexA(P, 0.5),
        shortName: name.replace(/^Leaders\s+/, '').replace(/^Sté\s+/, ''),
      });
    }
  }
  return out;
})();

export const FLAT_NAMES = ALL_SOC.map((s) => s.name);

export function buildWorld(name) {
  let sec = null;
  let soc = null;
  for (const s of SECTORS) {
    for (const arr of s.societies) {
      if (arr[0] === name) { sec = s; soc = arr; }
    }
  }
  if (!sec) return null;
  const [sname, blurb, lf, P, A, B] = soc;
  const isLux = name === 'Leaders Luxury';
  const baseLayout = [
    { gc: 'span 7', gr: 'span 2', minh: 300, size: 30 },
    { gc: 'span 5', gr: 'span 1', minh: 200, size: 23 },
    { gc: 'span 5', gr: 'span 1', minh: 200, size: 23 },
    { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 },
  ];
  const luxLayout = [...baseLayout,
    { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 },
    { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 }];
  const svcSrc = isLux ? [
    ['Signature Residences', 'Limited-edition towers and private villas designed in-house and built by the group, from masterplan to handover.'],
    ['Private Advisory', 'Discreet acquisition and portfolio counsel for principals and family offices.'],
    ['Interiors Atelier', 'A bespoke studio finishing every residence to a single, exacting standard.'],
    ['Asset Management', 'Long-horizon stewardship of residences and rental portfolios.'],
    ['Concierge', 'A standing service desk for owners, on call.'],
    ['Acquisitions', 'Sourcing land and landmark addresses worldwide.'],
  ] : sec.svc;
  const services = svcSrc.map((p, i) => ({
    no: String(i + 1).padStart(2, '0'), name: p[0], desc: p[1],
    ...((isLux ? luxLayout : baseLayout)[i] || { gc: 'span 4', gr: 'span 1', minh: 190, size: 21 }),
  }));
  const founded = { 'Leaders Immobilier': '2020', 'Negoce Immobilier': '2021', 'Le Portail Immobilier': '2021', 'Leaders Digital': '2021', 'Leaders Fish': '2021', 'Le Coin Immobilier': '2022', 'Leaders Building': '2022', 'Inna Immobilier': '2023', 'Sté Promotion Ben Ismail': '2023', 'Leaders Business': '2023', 'Leaders Makeup': '2024', 'Gratia Immobilier': '2024', 'Leaders Import Export': '2024', 'Gratia Service': '2024', 'Leaders Travel': '2024', 'Leaders Holding': '2020' }[name] || '—';
  const statLabels = isLux ? ['Founded', 'Residences', 'Cities', 'Sqm Delivered'] : ['Founded', 'Projects', 'Reach', 'Team'];
  const stats = statLabels.map((k, i) => ({ k, v: i === 0 ? founded : '—', color: i === 0 ? P : '#14181f' }));
  const bars = [38, 52, 44, 63, 57, 74, 68, 82, 76, 90, 85, 98].map((v) => ({ h: Math.round((v / 98) * 100) }));
  const ix = FLAT_NAMES.indexOf(name);
  const nextName = FLAT_NAMES[(ix + 1) % FLAT_NAMES.length];
  let nx = null;
  for (const s of SECTORS) {
    for (const a of s.societies) {
      if (a[0] === nextName) nx = { name: a[0], sector: s.name, P: a[3], logoUrl: logo(a[2]), hasLogo: !!a[2], initials: initials(a[0]) };
    }
  }
  return {
    name: sname, sector: sec.name, eyebrow: `${sec.short} Sector`,
    nextName, next: nx,
    logoUrl: logo(lf), hasLogo: !!lf, initials: initials(sname),
    P, A, softA: hexA(P, 0.4), glowA: hexA(P, 0.5),
    bg: `linear-gradient(180deg,#ffffff 0%,${B} 100%)`,
    navFade: hexA(B, 0.92),
    title: isLux ? 'Where craftsmanship meets address.' : sec.tag,
    about: isLux ? 'Leaders Luxury is the lifestyle and residential flagship of the group — limited-edition towers, private villas, and the services that surround a life lived well.' : `${blurb} ${sec.about}`,
    services, stats, bars,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    projects: [{ tag: 'Project · 2024', name: 'In development' }, { tag: 'Project · 2023', name: 'Delivered' }, { tag: 'Project · 2025', name: 'Upcoming' }],
  };
}
