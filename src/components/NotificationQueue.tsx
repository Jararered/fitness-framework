import React, { useCallback } from 'react';

import Notification from './Notification';

export interface Notification {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
}

// Props for the NotificationQueue component
interface NotificationQueueProps {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationQueue: React.FC<NotificationQueueProps> = ({ notifications, setNotifications }) => {
    const addNotification = useCallback((message: string, type: 'success' | 'info' | 'error') => {
        // Generate a random ID for the notification
        const id = Math.random().toString(36).substring(2, 11);

        // Add the notification to the list
        setNotifications((previousNotifications) => [...previousNotifications, { id, message, type }]);
    }, [setNotifications]);

    const removeNotification = useCallback((id: string) => {
        // Remove the notification with the given ID
        setNotifications((previousNotifications) => previousNotifications.filter((notification) => notification.id !== id));
    }, [setNotifications]);

    return (
        <div className="main-content-overlay">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    id={notification.id}
                    message={notification.message}
                    type={notification.type}
                    onClose={removeNotification}
                />
            ))}
        </div>
    );
};

export default NotificationQueue;
