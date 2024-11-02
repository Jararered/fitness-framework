import React, { useEffect } from 'react';

import './ToastNotification.css';

interface ToastNotificationProps {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
    onClose: (id: string) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ id, message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 3000);

        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <div className="main-content-overlay">
            <div className={`toast-notification ${type}`}>
                {message}
            </div>
        </div>
    );
};

export default ToastNotification;
