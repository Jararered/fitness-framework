import React, { useEffect } from 'react';
import './ToastNotification.css';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
    show: boolean;
}

const ToastNotification: React.FC<ToastProps> = ({
    message,
    type = 'success',
    duration = 3000,
    onClose,
    show
}) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    return (
        <div className={`toast-notification ${type} ${show ? 'show' : ''}`}>
            <div className="toast-content">
                {message}
            </div>
        </div>
    );
};

export default ToastNotification;
