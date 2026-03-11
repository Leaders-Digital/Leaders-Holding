import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar    from '../../../components/Navbar/Navbar.js';
import PageTitle from '../../../components/pagetitle/PageTitle.js';
import Footer    from '../../../components/footer/Footer.js';
import Scrollbar from '../../../components/scrollbar/scrollbar.js';
import SEO       from '../../../components/SEO';
import {
    API, BRAND, Spinner, QuestionField,
} from '../../../components/TableCarriere/jobUtils';

const label = {
    display: 'block', fontWeight: 600, fontSize: 13,
    color: '#333', marginBottom: 6, marginTop: 20,
};

const inputBase = {
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: '1.5px solid #ddd', fontSize: 14,
    boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.2s',
};

const ApplyPage = () => {
    const router        = useRouter();
    const { id }        = router.query;

    // offer (for title + questions)
    const [offer,   setOffer]   = useState(null);
    const [fetching, setFetching] = useState(true);
    const [fetchErr, setFetchErr] = useState('');

    // form state
    const [nom,       setNom]       = useState('');
    const [prenom,    setPrenom]    = useState('');
    const [email,     setEmail]     = useState('');
    const [telephone, setTel]       = useState('');
    const [cvFile,    setCvFile]    = useState(null);
    const [answers,   setAnswers]   = useState({});

    // submission state
    const [submitting, setSubmitting] = useState(false);
    const [submitErr,  setSubmitErr]  = useState('');
    const [success,    setSuccess]    = useState(false);

    // ── Fetch offer ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!id) return;
        setFetching(true);
        setFetchErr('');
        fetch(`${API}/job-offers/${id}`)
            .then(r => r.json())
            .then(data => {
                if (!data.success) throw new Error(data.message || 'Offre introuvable');
                setOffer(data.data);
            })
            .catch(err => setFetchErr(err.message))
            .finally(() => setFetching(false));
    }, [id]);

    const setAnswer = (qId, val) =>
        setAnswers(prev => ({ ...prev, [qId]: val }));

    // ── Submit ─────────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitErr('');
        setSubmitting(true);

        const formData = new FormData();
        formData.append('nom',       nom.trim());
        formData.append('prenom',    prenom.trim());
        formData.append('email',     email.trim());
        formData.append('telephone', telephone.trim());
        if (cvFile) formData.append('cv', cvFile);

        const answersArray = Object.entries(answers)
            .filter(([, v]) => v !== null && v !== '' && v !== undefined
                && !(Array.isArray(v) && v.length === 0))
            .map(([questionId, value]) => ({ questionId, value }));
        formData.append('answers', JSON.stringify(answersArray));

        try {
            const res  = await fetch(`${API}/job-offers/${id}/apply`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'Erreur lors de la soumission');
            setSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setSubmitErr(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Fragment>
            <SEO
                title={offer ? `Postuler — ${offer.title}` : 'Formulaire de candidature'}
                description="Soumettez votre candidature pour rejoindre Leaders Holding."
            />
            <Navbar />
            <PageTitle pageTitle="Formulaire de candidature" pagesub="Candidature" />

            <div className="container" style={{ paddingTop: 50, paddingBottom: 70, fontFamily: 'inherit' }}>

                {/* Back link */}
                <Link href={id ? `/conditature/${id}` : '/conditature'}>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        color: BRAND, fontWeight: 600, fontSize: 14,
                        cursor: 'pointer', marginBottom: 32,
                    }}>
                        <i className="ti-arrow-left" style={{ fontSize: 12 }} />
                        Retour à l'offre
                    </span>
                </Link>

                {/* Loading */}
                {fetching && <Spinner />}

                {/* Fetch error */}
                {fetchErr && (
                    <div style={{
                        background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10,
                        padding: '20px 24px', color: '#b91c1c', textAlign: 'center',
                    }}>
                        <i className="ti-alert" style={{ marginRight: 10, fontSize: 18 }} />
                        {fetchErr}
                    </div>
                )}

                {/* ── Success state ──────────────────────────────────────────── */}
                {success && (
                    <div style={{
                        maxWidth: 560, margin: '0 auto', textAlign: 'center',
                        background: '#fff', borderRadius: 16, padding: '50px 40px',
                        border: '1.5px solid #d1fae5',
                        boxShadow: '0 4px 24px rgba(5,150,105,0.10)',
                    }}>
                        <div style={{
                            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 24px',
                            background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <i className="ti-check-box" style={{ fontSize: 36, color: '#059669' }} />
                        </div>
                        <h2 style={{ color: '#059669', marginBottom: 12, fontSize: 22 }}>
                            Candidature envoyée !
                        </h2>
                        <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                            Merci pour votre candidature. Notre équipe l'examinera et vous contactera prochainement.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/conditature">
                                <span style={{
                                    padding: '12px 28px', background: BRAND, color: '#fff',
                                    borderRadius: 9, fontWeight: 700, fontSize: 14, cursor: 'pointer',
                                }}>
                                    Voir d'autres offres
                                </span>
                            </Link>
                            <Link href="/">
                                <span style={{
                                    padding: '12px 28px', background: '#f3f4f6', color: '#555',
                                    borderRadius: 9, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                                }}>
                                    Accueil
                                </span>
                            </Link>
                        </div>
                    </div>
                )}

                {/* ── Form ──────────────────────────────────────────────────── */}
                {!fetching && !fetchErr && offer && !success && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 300px',
                        gap: 32,
                        alignItems: 'start',
                    }}>

                        {/* ── FORM (left) ───────────────────────────────────── */}
                        <div>
                            {/* Offer title reminder */}
                            <div style={{
                                background: BRAND + '0e', borderRadius: 12, padding: '18px 22px',
                                border: `1px solid ${BRAND}33`, marginBottom: 28,
                                display: 'flex', alignItems: 'center', gap: 14,
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                                    background: BRAND + '20', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <i className="ti-briefcase" style={{ fontSize: 18, color: BRAND }} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: 12, color: '#888', fontWeight: 600 }}>
                                        Vous postulez pour
                                    </p>
                                    <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 700, color: '#111' }}>
                                        {offer.title}
                                        {offer.societe?.nom && (
                                            <span style={{ color: BRAND, fontWeight: 600 }}> — {offer.societe.nom}</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Submit error */}
                            {submitErr && (
                                <div style={{
                                    background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8,
                                    padding: '14px 18px', color: '#b91c1c', marginBottom: 22, fontSize: 14,
                                }}>
                                    <i className="ti-alert" style={{ marginRight: 8 }} />
                                    {submitErr}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* ── Section: Personal info ─────────────── */}
                                <div style={{
                                    background: '#fff', borderRadius: 14, padding: '28px 32px',
                                    border: '1.5px solid #ece8e0',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 24,
                                }}>
                                    <h3 style={{
                                        margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#111',
                                        display: 'flex', alignItems: 'center', gap: 10,
                                    }}>
                                        <i className="ti-user" style={{ color: BRAND, fontSize: 18 }} />
                                        Informations personnelles
                                    </h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <div>
                                            <label style={label}>
                                                Prénom <span style={{ color: '#e53e3e' }}>*</span>
                                            </label>
                                            <input
                                                required
                                                value={prenom}
                                                onChange={e => setPrenom(e.target.value)}
                                                placeholder="Votre prénom"
                                                style={inputBase}
                                            />
                                        </div>
                                        <div>
                                            <label style={label}>
                                                Nom <span style={{ color: '#e53e3e' }}>*</span>
                                            </label>
                                            <input
                                                required
                                                value={nom}
                                                onChange={e => setNom(e.target.value)}
                                                placeholder="Votre nom"
                                                style={inputBase}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
                                        <div>
                                            <label style={label}>Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="email@exemple.com"
                                                style={inputBase}
                                            />
                                        </div>
                                        <div>
                                            <label style={label}>Téléphone</label>
                                            <input
                                                type="tel"
                                                value={telephone}
                                                onChange={e => setTel(e.target.value)}
                                                placeholder="+216 XX XXX XXX"
                                                style={inputBase}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Section: CV ────────────────────────── */}
                                <div style={{
                                    background: '#fff', borderRadius: 14, padding: '28px 32px',
                                    border: '1.5px solid #ece8e0',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 24,
                                }}>
                                    <h3 style={{
                                        margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#111',
                                        display: 'flex', alignItems: 'center', gap: 10,
                                    }}>
                                        <i className="ti-file" style={{ color: BRAND, fontSize: 18 }} />
                                        Curriculum Vitae
                                    </h3>
                                    <p style={{ margin: '0 0 16px', fontSize: 13, color: '#888' }}>
                                        Formats acceptés : PDF, DOC, DOCX — max 10 Mo
                                    </p>

                                    <label style={{
                                        display: 'flex', alignItems: 'center', gap: 14,
                                        padding: '16px 20px', borderRadius: 10,
                                        border: `2px dashed ${cvFile ? BRAND : '#ddd'}`,
                                        background: cvFile ? BRAND + '08' : '#fafafa',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}>
                                        <i className={cvFile ? 'ti-check' : 'ti-export'}
                                            style={{ fontSize: 22, color: cvFile ? BRAND : '#aaa' }} />
                                        <div>
                                            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: cvFile ? BRAND : '#555' }}>
                                                {cvFile ? cvFile.name : 'Cliquez pour sélectionner votre CV'}
                                            </p>
                                            {!cvFile && (
                                                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#aaa' }}>
                                                    ou glissez-déposez le fichier ici
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            style={{ display: 'none' }}
                                            onChange={e => setCvFile(e.target.files?.[0] || null)}
                                        />
                                    </label>
                                    {cvFile && (
                                        <button
                                            type="button"
                                            onClick={() => setCvFile(null)}
                                            style={{
                                                marginTop: 8, background: 'none', border: 'none',
                                                color: '#999', fontSize: 13, cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: 4,
                                            }}
                                        >
                                            <i className="ti-close" style={{ fontSize: 11 }} />
                                            Supprimer le fichier
                                        </button>
                                    )}
                                </div>

                                {/* ── Section: Dynamic questions ─────────── */}
                                {offer.questions?.length > 0 && (
                                    <div style={{
                                        background: '#fff', borderRadius: 14, padding: '28px 32px',
                                        border: '1.5px solid #ece8e0',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 24,
                                    }}>
                                        <h3 style={{
                                            margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#111',
                                            display: 'flex', alignItems: 'center', gap: 10,
                                        }}>
                                            <i className="ti-comment" style={{ color: BRAND, fontSize: 18 }} />
                                            Questions spécifiques au poste
                                        </h3>
                                        <p style={{ margin: '0 0 22px', fontSize: 13, color: '#888' }}>
                                            Veuillez répondre à toutes les questions obligatoires (<span style={{ color: '#e53e3e' }}>*</span>).
                                        </p>

                                        {offer.questions
                                            .slice()
                                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                                            .map((q, qi) => (
                                                <div key={q._id} style={{
                                                    marginBottom: 24,
                                                    paddingBottom: 24,
                                                    borderBottom: qi < offer.questions.length - 1
                                                        ? '1px solid #f0f0f0' : 'none',
                                                }}>
                                                    <label style={{
                                                        display: 'flex', alignItems: 'flex-start',
                                                        gap: 8, fontWeight: 600, fontSize: 14,
                                                        color: '#222', marginBottom: q.helpText ? 4 : 10,
                                                    }}>
                                                        <span style={{
                                                            display: 'inline-flex', alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: 22, height: 22, borderRadius: '50%',
                                                            background: BRAND + '18', color: BRAND,
                                                            fontSize: 11, fontWeight: 800, flexShrink: 0,
                                                            marginTop: 1,
                                                        }}>
                                                            {qi + 1}
                                                        </span>
                                                        {q.label}
                                                        {q.required && <span style={{ color: '#e53e3e', marginLeft: 2 }}>*</span>}
                                                    </label>
                                                    {q.helpText && (
                                                        <p style={{ margin: '0 0 10px 30px', fontSize: 12, color: '#888' }}>
                                                            {q.helpText}
                                                        </p>
                                                    )}
                                                    <div style={{ marginLeft: 30 }}>
                                                        <QuestionField
                                                            question={q}
                                                            value={answers[q._id]}
                                                            onChange={setAnswer}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {/* ── Submit row ─────────────────────────── */}
                                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        style={{
                                            flex: 1, padding: '15px 24px',
                                            background: submitting ? '#ccc' : BRAND,
                                            color: '#fff', border: 'none', borderRadius: 10,
                                            fontSize: 15, fontWeight: 700,
                                            cursor: submitting ? 'not-allowed' : 'pointer',
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', gap: 10,
                                            boxShadow: submitting ? 'none' : `0 4px 16px ${BRAND}44`,
                                            transition: 'background 0.2s',
                                        }}
                                    >
                                        {submitting ? (
                                            <>
                                                <span style={{
                                                    width: 18, height: 18, border: '3px solid #fff5',
                                                    borderTop: '3px solid #fff', borderRadius: '50%',
                                                    animation: 'spin 0.8s linear infinite', display: 'inline-block',
                                                }} />
                                                Envoi en cours…
                                            </>
                                        ) : (
                                            <>
                                                <i className="ti-check" />
                                                Soumettre ma candidature
                                            </>
                                        )}
                                    </button>
                                    <Link href={id ? `/conditature/${id}` : '/conditature'}>
                                        <span style={{
                                            padding: '15px 24px', background: '#f3f4f6',
                                            color: '#555', borderRadius: 10, fontWeight: 600,
                                            fontSize: 15, cursor: 'pointer', display: 'inline-block',
                                        }}>
                                            Annuler
                                        </span>
                                    </Link>
                                </div>
                                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                            </form>
                        </div>

                        {/* ── RIGHT sidebar ─────────────────────────────────── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                            {/* Tips card */}
                            <div style={{
                                background: '#fff', borderRadius: 14, padding: '24px',
                                border: '1.5px solid #ece8e0',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            }}>
                                <h4 style={{
                                    margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: BRAND,
                                    display: 'flex', alignItems: 'center', gap: 8,
                                }}>
                                    <i className="ti-star" />
                                    Conseils
                                </h4>
                                {[
                                    { icon: 'ti-file',    text: 'Joignez un CV à jour au format PDF' },
                                    { icon: 'ti-check',   text: 'Répondez à toutes les questions obligatoires' },
                                    { icon: 'ti-email',   text: 'Vérifiez votre adresse email avant d\'envoyer' },
                                    { icon: 'ti-mobile',  text: 'Assurez-vous que votre téléphone est joignable' },
                                ].map((tip, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: 10, alignItems: 'flex-start',
                                        marginBottom: i < 3 ? 12 : 0,
                                    }}>
                                        <i className={tip.icon} style={{
                                            fontSize: 13, color: BRAND, marginTop: 2, flexShrink: 0,
                                        }} />
                                        <p style={{ margin: 0, fontSize: 13, color: '#555', lineHeight: 1.5 }}>
                                            {tip.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress indicator */}
                            <div style={{
                                background: BRAND + '0e', borderRadius: 12, padding: '18px',
                                border: `1px solid ${BRAND}22`,
                            }}>
                                <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#555' }}>
                                    Champs complétés
                                </p>
                                {[
                                    { label: 'Prénom',    done: prenom.trim().length > 0 },
                                    { label: 'Nom',       done: nom.trim().length > 0 },
                                    { label: 'Email',     done: email.trim().length > 0 },
                                    { label: 'Téléphone', done: telephone.trim().length > 0 },
                                    { label: 'CV',        done: !!cvFile },
                                ].map((f, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        marginBottom: 6, fontSize: 13,
                                        color: f.done ? '#059669' : '#aaa',
                                    }}>
                                        <i className={f.done ? 'ti-check-box' : 'ti-minus'}
                                            style={{ fontSize: 13 }} />
                                        {f.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default ApplyPage;

