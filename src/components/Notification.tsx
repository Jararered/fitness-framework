import React, { useEffect } from 'react';

import './Notification.css';

interface NotificationProps {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
    onClose: (id: string) => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({ id, message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 3000);

        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <div className="main-content-overlay">
            <div className={`notification ${type}`}>
                {message}
            </div>
        </div>
    );
};

export default NotificationComponent;
