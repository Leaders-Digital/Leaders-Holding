import React from 'react';

export const API = process.env.NEXT_PUBLIC_API_URL || 'https://serveur.leaders-business.com/api';
export const BRAND = '#BF9043';

export const JOB_TYPES = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Temporary',
];

export const WORK_MODES = [
    { value: 'onsite',  label: 'Présentiel'  },
    { value: 'remote',  label: 'Télétravail' },
    { value: 'hybrid',  label: 'Hybride'     },
];

export const GOVERNORATES = [
    'Tunis','Ariana','Ben Arous','Manouba','Nabeul','Zaghouan','Bizerte',
    'Béja','Jendouba','Le Kef','Siliana','Sousse','Monastir','Mahdia',
    'Sfax','Kairouan','Kasserine','Sidi Bouzid','Gabès','Médenine',
    'Tataouine','Gafsa','Tozeur','Kébili',
];

export function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('fr-TN', {
        day: '2-digit', month: 'long', year: 'numeric',
    });
}

export function workModeLabel(wm) {
    const found = WORK_MODES.find(m => m.value === wm);
    return found ? found.label : wm;
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ text, color = BRAND }) {
    return (
        <span style={{
            display: 'inline-block', padding: '3px 11px', borderRadius: 20,
            background: color + '18', color, border: `1px solid ${color}44`,
            fontSize: 12, fontWeight: 600, marginRight: 4, marginBottom: 4,
            whiteSpace: 'nowrap',
        }}>
            {text}
        </span>
    );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner() {
    return (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
                width: 44, height: 44,
                border: `4px solid ${BRAND}33`,
                borderTop: `4px solid ${BRAND}`,
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block',
            }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    );
}

// ─── QuestionField ────────────────────────────────────────────────────────────
export function QuestionField({ question, value, onChange }) {
    const base = {
        width: '100%', padding: '10px 13px', borderRadius: 7,
        border: '1.5px solid #ddd', fontSize: 14, outline: 'none',
        boxSizing: 'border-box', transition: 'border-color 0.2s',
    };

    switch (question.type) {
        case 'short_text':
            return (
                <input
                    type="text"
                    style={base}
                    required={question.required}
                    value={value || ''}
                    placeholder={question.helpText || ''}
                    onChange={e => onChange(question._id, e.target.value)}
                />
            );

        case 'long_text':
            return (
                <textarea
                    style={{ ...base, minHeight: 110, resize: 'vertical' }}
                    required={question.required}
                    value={value || ''}
                    placeholder={question.helpText || ''}
                    onChange={e => onChange(question._id, e.target.value)}
                />
            );

        case 'yes_no':
            return (
                <div style={{ display: 'flex', gap: 28, marginTop: 6 }}>
                    {['Oui', 'Non'].map(opt => (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                            <input
                                type="radio"
                                name={`q_${question._id}`}
                                value={opt}
                                required={question.required}
                                checked={value === opt}
                                onChange={() => onChange(question._id, opt)}
                                style={{ accentColor: BRAND, width: 16, height: 16 }}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            );

        case 'single_choice':
            return (
                <select
                    style={{ ...base, background: '#fff', cursor: 'pointer' }}
                    required={question.required}
                    value={value || ''}
                    onChange={e => onChange(question._id, e.target.value)}
                >
                    <option value="">— Choisir —</option>
                    {question.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            );

        case 'multiple_choice':
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
                    {question.options.map(o => {
                        const selected = Array.isArray(value) && value.includes(o.value);
                        return (
                            <label key={o.value} style={{
                                display: 'flex', alignItems: 'center', gap: 7,
                                cursor: 'pointer', fontSize: 14, padding: '7px 14px',
                                borderRadius: 22, border: `1.5px solid ${selected ? BRAND : '#ddd'}`,
                                background: selected ? BRAND + '12' : '#fff',
                                transition: 'all 0.2s',
                            }}>
                                <input
                                    type="checkbox"
                                    value={o.value}
                                    checked={selected}
                                    style={{ accentColor: BRAND }}
                                    onChange={e => {
                                        const prev = Array.isArray(value) ? value : [];
                                        onChange(question._id, e.target.checked
                                            ? [...prev, o.value]
                                            : prev.filter(v => v !== o.value));
                                    }}
                                />
                                {o.label}
                            </label>
                        );
                    })}
                </div>
            );

        case 'number':
            return (
                <input
                    type="number"
                    style={base}
                    required={question.required}
                    value={value ?? ''}
                    placeholder={question.helpText || ''}
                    onChange={e => onChange(question._id, parseFloat(e.target.value))}
                />
            );

        case 'rating':
            return (
                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => onChange(question._id, n)}
                            style={{
                                width: 42, height: 42, borderRadius: '50%',
                                border: `2px solid ${value >= n ? BRAND : '#ddd'}`,
                                background: value >= n ? BRAND : '#fff',
                                color: value >= n ? '#fff' : '#666',
                                fontWeight: 700, fontSize: 15, cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            );

        default:
            return null;
    }
}

