import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar    from '../../../components/Navbar/Navbar.js';
import PageTitle from '../../../components/pagetitle/PageTitle.js';
import Footer    from '../../../components/footer/Footer.js';
import Scrollbar from '../../../components/scrollbar/scrollbar.js';
import SEO       from '../../../components/SEO';
import {
    API, BRAND, formatDate, workModeLabel, Badge, Spinner,
} from '../../../components/TableCarriere/jobUtils';

const WORK_MODES_MAP = { onsite: 'Présentiel', remote: 'Télétravail', hybrid: 'Hybride' };

const OfferDetailPage = () => {
    const router         = useRouter();
    const { id }         = router.query;
    const [offer,   setOffer]   = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState('');

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError('');
        fetch(`${API}/job-offers/${id}`)
            .then(r => r.json())
            .then(data => {
                if (!data.success) throw new Error(data.message || 'Offre introuvable');
                setOffer(data.data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <Fragment>
            <SEO
                title={offer ? offer.title : 'Détail de l\'offre'}
                description={offer?.description?.slice(0, 160) || 'Détail de l\'offre d\'emploi chez Leaders Holding.'}
                keywords={offer?.categories?.join(', ')}
            />
            <Navbar />
            <PageTitle
                pageTitle={offer ? offer.title : 'Offre d\'emploi'}
                pagesub="Candidature"
            />

            <div className="container" style={{ paddingTop: 50, paddingBottom: 60, fontFamily: 'inherit' }}>

                {/* ── Back link ───────────────────────────────────────────── */}
                <Link href="/conditature">
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        color: BRAND, fontWeight: 600, fontSize: 14,
                        cursor: 'pointer', marginBottom: 32,
                    }}>
                        <i className="ti-arrow-left" style={{ fontSize: 12 }} />
                        Retour aux offres
                    </span>
                </Link>

                {/* ── Loading ─────────────────────────────────────────────── */}
                {loading && <Spinner />}

                {/* ── Error ───────────────────────────────────────────────── */}
                {error && (
                    <div style={{
                        background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10,
                        padding: '20px 24px', color: '#b91c1c', fontSize: 15, textAlign: 'center',
                    }}>
                        <i className="ti-alert" style={{ marginRight: 10, fontSize: 18 }} />
                        {error}
                    </div>
                )}

                {/* ── Offer content ────────────────────────────────────────── */}
                {!loading && offer && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>

                        {/* ── LEFT: description ─────────────────────────── */}
                        <div>

                            {/* Header card */}
                            <div style={{
                                background: '#fff', borderRadius: 14, padding: '32px 36px',
                                border: '1.5px solid #ece8e0',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                marginBottom: 24,
                                borderLeft: `5px solid ${BRAND}`,
                            }}>
                                {offer.societe?.nom && (
                                    <p style={{
                                        margin: '0 0 6px', fontSize: 12, fontWeight: 700,
                                        color: BRAND, textTransform: 'uppercase', letterSpacing: 1,
                                    }}>
                                        {offer.societe.nom}
                                    </p>
                                )}
                                <h1 style={{ margin: '0 0 18px', fontSize: 26, fontWeight: 800, color: '#111', lineHeight: 1.3 }}>
                                    {offer.title}
                                </h1>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {offer.jobType    && <Badge text={offer.jobType} />}
                                    {offer.workMode   && <Badge text={workModeLabel(offer.workMode)} color="#2563eb" />}
                                    {offer.experience && <Badge text={offer.experience} color="#7c3aed" />}
                                    {offer.educationLevel && <Badge text={offer.educationLevel} color="#059669" />}
                                    {offer.categories?.map(c => <Badge key={c} text={c} color="#374151" />)}
                                </div>
                            </div>

                            {/* Description */}
                            {offer.description && (
                                <div style={{
                                    background: '#fff', borderRadius: 14, padding: '28px 36px',
                                    border: '1.5px solid #ece8e0',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    marginBottom: 24,
                                }}>
                                    <h2 style={{
                                        fontSize: 17, fontWeight: 700, color: BRAND,
                                        marginTop: 0, marginBottom: 16,
                                        display: 'flex', alignItems: 'center', gap: 10,
                                    }}>
                                        <i className="ti-agenda" style={{ fontSize: 18 }} />
                                        Description du poste
                                    </h2>
                                    <p style={{
                                        fontSize: 15, color: '#444', lineHeight: 1.8,
                                        whiteSpace: 'pre-line', margin: 0,
                                    }}>
                                        {offer.description}
                                    </p>
                                </div>
                            )}

                            {/* Requirements */}
                            {offer.requirements && (
                                <div style={{
                                    background: '#fff', borderRadius: 14, padding: '28px 36px',
                                    border: '1.5px solid #ece8e0',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    marginBottom: 24,
                                }}>
                                    <h2 style={{
                                        fontSize: 17, fontWeight: 700, color: BRAND,
                                        marginTop: 0, marginBottom: 16,
                                        display: 'flex', alignItems: 'center', gap: 10,
                                    }}>
                                        <i className="ti-star" style={{ fontSize: 18 }} />
                                        Profil recherché
                                    </h2>
                                    <p style={{
                                        fontSize: 15, color: '#444', lineHeight: 1.8,
                                        whiteSpace: 'pre-line', margin: 0,
                                    }}>
                                        {offer.requirements}
                                    </p>
                                </div>
                            )}

                            {/* Questions count hint */}
                            {offer.questions?.length > 0 && (
                                <div style={{
                                    background: BRAND + '10', borderRadius: 12, padding: '16px 22px',
                                    border: `1px solid ${BRAND}33`, marginBottom: 24,
                                    display: 'flex', alignItems: 'center', gap: 12,
                                }}>
                                    <i className="ti-comment" style={{ fontSize: 20, color: BRAND }} />
                                    <p style={{ margin: 0, fontSize: 14, color: '#555' }}>
                                        Ce poste inclut <strong style={{ color: BRAND }}>{offer.questions.length} question{offer.questions.length > 1 ? 's' : ''}</strong> spécifique{offer.questions.length > 1 ? 's' : ''} dans le formulaire de candidature.
                                    </p>
                                </div>
                            )}

                            {/* Apply CTA */}
                            <Link href={`/conditature/${id}/apply`}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    padding: '16px 36px', background: BRAND, color: '#fff',
                                    borderRadius: 10, fontWeight: 700, fontSize: 16,
                                    cursor: 'pointer', boxShadow: `0 6px 20px ${BRAND}55`,
                                    transition: 'background 0.2s',
                                }}>
                                    <i className="ti-pencil-alt" />
                                    Postuler à cette offre
                                    <i className="ti-arrow-right" style={{ fontSize: 13 }} />
                                </span>
                            </Link>
                        </div>

                        {/* ── RIGHT: sidebar ────────────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                            {/* Quick info card */}
                            <div style={{
                                background: '#fff', borderRadius: 14, padding: '26px',
                                border: '1.5px solid #ece8e0',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            }}>
                                <h3 style={{
                                    margin: '0 0 20px', fontSize: 15, fontWeight: 700,
                                    color: '#111', borderBottom: `2px solid ${BRAND}22`, paddingBottom: 12,
                                }}>
                                    Informations clés
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {[
                                        offer.location?.governorate && {
                                            icon: 'fi flaticon-placeholder',
                                            label: 'Localisation',
                                            value: [offer.location.city, offer.location.governorate].filter(Boolean).join(', '),
                                        },
                                        offer.salary && {
                                            icon: 'ti-money',
                                            label: 'Salaire',
                                            value: offer.salary,
                                        },
                                        offer.jobType && {
                                            icon: 'ti-briefcase',
                                            label: 'Type de contrat',
                                            value: offer.jobType,
                                        },
                                        offer.workMode && {
                                            icon: 'ti-home',
                                            label: 'Mode de travail',
                                            value: WORK_MODES_MAP[offer.workMode] || offer.workMode,
                                        },
                                        offer.experience && {
                                            icon: 'ti-time',
                                            label: 'Expérience',
                                            value: offer.experience,
                                        },
                                        offer.educationLevel && {
                                            icon: 'ti-crown',
                                            label: 'Niveau d\'études',
                                            value: offer.educationLevel,
                                        },
                                        offer.vacancies && {
                                            icon: 'ti-id-badge',
                                            label: 'Postes ouverts',
                                            value: offer.vacancies,
                                        },
                                        offer.expirationDate && {
                                            icon: 'ti-calendar',
                                            label: 'Date limite',
                                            value: formatDate(offer.expirationDate),
                                        },
                                    ].filter(Boolean).map((item, i) => (
                                        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: 34, height: 34, borderRadius: 8,
                                                background: BRAND + '12', flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <i className={item.icon} style={{ fontSize: 14, color: BRAND }} />
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: 11, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                    {item.label}
                                                </p>
                                                <p style={{ margin: '2px 0 0', fontSize: 14, color: '#333', fontWeight: 600 }}>
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Apply sidebar button */}
                            <Link href={`/conditature/${id}/apply`}>
                                <span style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: 10, padding: '15px', background: BRAND, color: '#fff',
                                    borderRadius: 10, fontWeight: 700, fontSize: 15,
                                    cursor: 'pointer', boxShadow: `0 4px 16px ${BRAND}44`,
                                    width: '100%', boxSizing: 'border-box',
                                }}>
                                    <i className="ti-pencil-alt" />
                                    Postuler maintenant
                                </span>
                            </Link>

                            {/* Spontanée link */}
                            <Link href="/spontanee">
                                <span style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: 8, padding: '13px', background: '#fff', color: BRAND,
                                    border: `1.5px solid ${BRAND}`, borderRadius: 10,
                                    fontWeight: 600, fontSize: 14, cursor: 'pointer',
                                    width: '100%', boxSizing: 'border-box',
                                }}>
                                    <i className="ti-export" style={{ fontSize: 13 }} />
                                    Candidature Spontanée
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default OfferDetailPage;

