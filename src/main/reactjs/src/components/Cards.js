import React from 'react';
import '../styles/Components.css';

export function Card({ children, className = '', onClick }) {
    return (
        <div className={`card ${className}`} onClick={onClick}>
            {children}
        </div>
    );
}

export function StatsCard({ icon, title, value, subtitle, color = 'primary', trend }) {
    return (
        <Card className={`stats-card stats-card-${color}`}>
            <div className="stats-icon">{icon}</div>
            <div className="stats-content">
                <p className="stats-title">{title}</p>
                <h3 className="stats-value">{value}</h3>
                {subtitle && <p className="stats-subtitle">{subtitle}</p>}
                {trend && (
                    <div className={`stats-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </div>
                )}
            </div>
        </Card>
    );
}

export function Button({ children, variant = 'primary', size = 'medium', onClick, disabled, type = 'button', className = '' }) {
    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export function IconButton({ icon, onClick, variant = 'default', title }) {
    return (
        <button
            className={`icon-btn icon-btn-${variant}`}
            onClick={onClick}
            title={title}
        >
            {icon}
        </button>
    );
}

export default { Card, StatsCard, Button, IconButton };
