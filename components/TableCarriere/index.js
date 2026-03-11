import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    API, BRAND, JOB_TYPES, GOVERNORATES,
    formatDate, workModeLabel, Badge, Spinner,
} from './jobUtils';

const TableCarriere = () => {
    const [search,      setSearch]      = useState('');
    const [jobType,     setJobType]     = useState('');
    const [governorate, setGovernorate] = useState('');
    const [jobs,        setJobs]        = useState([]);
    const [loading,     setLoading]     = useState(true);
    const [loadError,   setLoadError]   = useState('');
    const [total,       setTotal]       = useState(0);
    const [page,        setPage]        = useState(1);
    const [totalPages,  setTotalPages]  = useState(1);
    const LIMIT = 10;

    // ── Fetch list ─────────────────────────────────────────────────────────────
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setLoadError('');
        try {
            const params = new URLSearchParams({
                status: 'published',
                includeExpired: 'false',
                page,
                limit: LIMIT,
            });
            if (search)      params.set('search',      search);
            if (jobType)     params.set('jobType',     jobType);
            if (governorate) params.set('governorate', governorate);

            const res  = await fetch(`${API}/job-offers?${params}`);
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'Erreur serveur');
            setJobs(data.data || []);
            setTotal(data.total || 0);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setLoadError(err.message);
        } finally {
            setLoading(false);
        }
    }, [search, jobType, governorate, page]);

    useEffect(() => { fetchJobs(); }, [fetchJobs]);
    useEffect(() => { setPage(1);  }, [search, jobType, governorate]);

    // ── Shared input style ─────────────────────────────────────────────────────
    const inputStyle = {
        width: '100%', padding: '11px 14px', borderRadius: 8,
        border: '1.5px solid #ddd', fontSize: 14, background: '#fff',
        cursor: 'pointer', outline: 'none', boxSizing: 'border-box',
    };

    return (
        <div style={{ fontFamily: 'inherit' }}>

            {/* ── Filters bar ──────────────────────────────────────────────── */}
            <div style={{ background: '#f9f7f4', padding: '28px 0', borderBottom: '1px solid #ece8e0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>

                        {/* Search */}
                        <div style={{ position: 'relative' }}>
                            <i className="ti-search" style={{
                                position: 'absolute', left: 14, top: '50%',
                                transform: 'translateY(-50%)', color: '#aaa',
                                fontSize: 13, pointerEvents: 'none',
                            }} />
                            <input
                                type="text"
                                placeholder="Rechercher un poste..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ ...inputStyle, paddingLeft: 38 }}
                            />
                        </div>

                        {/* Job type */}
                        <select value={jobType} onChange={e => setJobType(e.target.value)} style={inputStyle}>
                            <option value="">Type de contrat</option>
                            {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>

                        {/* Governorate */}
                        <select value={governorate} onChange={e => setGovernorate(e.target.value)} style={inputStyle}>
                            <option value="">Gouvernorat</option>
                            {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>

                        {/* Reset */}
                        {(search || jobType || governorate) && (
                            <button
                                onClick={() => { setSearch(''); setJobType(''); setGovernorate(''); }}
                                style={{
                                    padding: '11px 18px', borderRadius: 8,
                                    border: `1.5px solid ${BRAND}`,
                                    background: '#fff', color: BRAND,
                                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                }}
                            >
                                <i className="ti-close" style={{ marginRight: 6, fontSize: 11 }} />
                                Réinitialiser
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="container" style={{ paddingTop: 36, paddingBottom: 20 }}>

                {/* Header row */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12,
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
                            {loading ? 'Chargement…' : `${total} offre${total !== 1 ? 's' : ''} disponible${total !== 1 ? 's' : ''}`}
                        </h2>
                        {(search || jobType || governorate) && !loading && (
                            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#888' }}>
                                Résultats filtrés
                            </p>
                        )}
                    </div>
                </div>

                {/* Error */}
                {loadError && (
                    <div style={{
                        background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8,
                        padding: '16px 20px', color: '#b91c1c', marginBottom: 24, fontSize: 14,
                    }}>
                        <i className="ti-alert" style={{ marginRight: 8 }} />
                        {loadError}
                        <button onClick={fetchJobs} style={{
                            marginLeft: 14, color: BRAND, background: 'none',
                            border: 'none', cursor: 'pointer', fontWeight: 600,
                        }}>
                            Réessayer
                        </button>
                    </div>
                )}

                {/* Spinner */}
                {loading && <Spinner />}

                {/* Empty state */}
                {!loading && !loadError && jobs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                        <i className="ti-search" style={{ fontSize: 52, color: '#ccc', display: 'block', marginBottom: 16 }} />
                        <h3 style={{ color: '#555', marginBottom: 8 }}>Aucune offre trouvée</h3>
                        <p style={{ fontSize: 14 }}>Essayez d'autres critères de recherche.</p>
                    </div>
                )}

                {/* ── Offer list ───────────────────────────────────────────── */}
                {!loading && jobs.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                        {jobs.map((job, idx) => (
                            <div
                                key={job._id}
                                style={{
                                    background: '#fff', borderRadius: 14, overflow: 'hidden',
                                    border: '1.5px solid #ece8e0',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                    transition: 'box-shadow 0.22s, border-color 0.22s, transform 0.18s',
                                    width: '100%',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.boxShadow    = '0 8px 32px rgba(191,144,67,0.14)';
                                    e.currentTarget.style.borderColor  = BRAND;
                                    e.currentTarget.style.transform    = 'translateY(-2px)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.boxShadow   = '0 2px 10px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = '#ece8e0';
                                    e.currentTarget.style.transform   = 'translateY(0)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'stretch' }}>

                                    {/* Left accent bar */}
                                    <div style={{
                                        width: 5, flexShrink: 0,
                                        background: `linear-gradient(180deg, ${BRAND}, #8a6520)`,
                                    }} />

                                    {/* Card body */}
                                    <div style={{
                                        flex: 1, padding: '22px 26px',
                                        display: 'flex', alignItems: 'center',
                                        gap: 22, flexWrap: 'wrap',
                                    }}>
                                        {/* Index */}
                                        <div style={{
                                            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                                            background: BRAND + '14', border: `2px solid ${BRAND}33`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 14, fontWeight: 800, color: BRAND,
                                        }}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>

                                        {/* Main info */}
                                        <div style={{ flex: 1, minWidth: 220 }}>
                                            {job.societe?.nom && (
                                                <p style={{
                                                    margin: '0 0 4px', fontSize: 11, fontWeight: 700,
                                                    color: BRAND, textTransform: 'uppercase', letterSpacing: 1,
                                                }}>
                                                    {job.societe.nom}
                                                </p>
                                            )}
                                            <h3 style={{
                                                margin: '0 0 10px', fontSize: 17, fontWeight: 700,
                                                color: '#111', lineHeight: 1.35,
                                            }}>
                                                {job.title}
                                            </h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
                                                {job.jobType    && <Badge text={job.jobType} />}
                                                {job.workMode   && <Badge text={workModeLabel(job.workMode)} color="#2563eb" />}
                                                {job.experience && <Badge text={job.experience} color="#7c3aed" />}
                                                {job.categories?.slice(0, 2).map(c => <Badge key={c} text={c} color="#374151" />)}
                                            </div>
                                        </div>

                                        {/* Meta column */}
                                        <div style={{
                                            display: 'flex', flexDirection: 'column', gap: 7,
                                            minWidth: 180, flexShrink: 0,
                                        }}>
                                            {job.location?.governorate && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#555' }}>
                                                    <i className="fi flaticon-placeholder" style={{ fontSize: 14, color: BRAND, flexShrink: 0 }} />
                                                    <span>{[job.location.city, job.location.governorate].filter(Boolean).join(', ')}</span>
                                                </div>
                                            )}
                                            {job.salary && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#555' }}>
                                                    <i className="ti-money" style={{ fontSize: 14, color: BRAND, flexShrink: 0 }} />
                                                    <span>{job.salary}</span>
                                                </div>
                                            )}
                                            {job.vacancies > 0 && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#555' }}>
                                                    <i className="ti-id-badge" style={{ fontSize: 14, color: BRAND, flexShrink: 0 }} />
                                                    <span>{job.vacancies} poste{job.vacancies > 1 ? 's' : ''}</span>
                                                </div>
                                            )}
                                            {job.expirationDate && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#aaa' }}>
                                                    <i className="ti-calendar" style={{ fontSize: 13, flexShrink: 0 }} />
                                                    <span>Expire le {formatDate(job.expirationDate)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA → navigates to detail page */}
                                        <Link href={`/conditature/${job._id}`}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '12px 28px', background: BRAND,
                                                color: '#fff', border: 'none', borderRadius: 10,
                                                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                                                whiteSpace: 'nowrap', flexShrink: 0,
                                                boxShadow: `0 4px 14px ${BRAND}44`,
                                                transition: 'background 0.2s',
                                            }}>
                                                Voir l'offre
                                                <i className="ti-arrow-right" style={{ marginLeft: 8, fontSize: 12 }} />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage(p => p - 1)}
                            style={{
                                padding: '8px 18px', borderRadius: 7,
                                border: `1.5px solid ${page <= 1 ? '#eee' : BRAND}`,
                                background: '#fff', color: page <= 1 ? '#ccc' : BRAND,
                                cursor: page <= 1 ? 'not-allowed' : 'pointer', fontWeight: 600,
                            }}
                        >
                            <i className="ti-arrow-left" style={{ marginRight: 6, fontSize: 11 }} />
                            Précédent
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                style={{
                                    padding: '8px 14px', borderRadius: 7, fontWeight: 600,
                                    border: `1.5px solid ${p === page ? BRAND : '#eee'}`,
                                    background: p === page ? BRAND : '#fff',
                                    color: p === page ? '#fff' : '#555',
                                    cursor: 'pointer',
                                }}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            style={{
                                padding: '8px 18px', borderRadius: 7,
                                border: `1.5px solid ${page >= totalPages ? '#eee' : BRAND}`,
                                background: '#fff', color: page >= totalPages ? '#ccc' : BRAND,
                                cursor: page >= totalPages ? 'not-allowed' : 'pointer', fontWeight: 600,
                            }}
                        >
                            Suivant
                            <i className="ti-arrow-right" style={{ marginLeft: 6, fontSize: 11 }} />
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default TableCarriere;
