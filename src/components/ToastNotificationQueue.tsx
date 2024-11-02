import React, { useCallback } from 'react';

import ToastNotification from './ToastNotification';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
}

interface ToastNotificationQueueProps {
    toasts: Toast[];
    setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

const ToastNotificationQueue: React.FC<ToastNotificationQueueProps> = ({ toasts, setToasts }) => {
    const addToast = useCallback((message: string, type: 'success' | 'info' | 'error') => {
        const id = Math.random().toString(36).substring(2, 11);
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    }, [setToasts]);

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, [setToasts]);

    return (
        <div className="main-content-overlay">
            {toasts.map((toast) => (
                <ToastNotification
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
};

export default ToastNotificationQueue;
