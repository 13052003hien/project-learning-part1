import React from 'react';
import '../styles/Components.css';

export function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content modal-${size}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Xác nhận', cancelText = 'Hủy' }) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
            <p>{message}</p>
            <div className="modal-actions">
                <button className="btn btn-secondary" onClick={onClose}>{cancelText}</button>
                <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
            </div>
        </Modal>
    );
}

export default { Modal, ConfirmDialog };
