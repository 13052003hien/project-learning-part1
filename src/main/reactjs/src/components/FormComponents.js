import React from 'react';
import '../styles/Components.css';

export function Input({ label, type = 'text', name, value, onChange, placeholder, required, error }) {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label} {required && <span className="required">*</span>}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`form-input ${error ? 'input-error' : ''}`}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

export function Select({ label, name, value, onChange, options, required, error }) {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label} {required && <span className="required">*</span>}</label>}
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`form-select ${error ? 'input-error' : ''}`}
            >
                <option value="">-- Chọn --</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

export function Textarea({ label, name, value, onChange, placeholder, required, error, rows = 4 }) {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label} {required && <span className="required">*</span>}</label>}
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className={`form-textarea ${error ? 'input-error' : ''}`}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

export default { Input, Select, Textarea };
