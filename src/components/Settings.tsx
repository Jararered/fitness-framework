import React, { useState, useEffect, useCallback } from 'react';
import NotificationQueue, { Notification } from './NotificationQueue';

import '../styles/Input.css';
import './Settings.css';

const Settings: React.FC = () => {
    const [weightUnit, setWeightUnit] = useState<string>('lb');
    const [shortRest, setShortRest] = useState<number>(30);
    const [normalRest, setNormalRest] = useState<number>(60);
    const [longRest, setLongRest] = useState<number>(90);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const savedPreferences = localStorage.getItem('preferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            if (preferences.weightUnit) {
                setWeightUnit(preferences.weightUnit);
            }
            if (preferences.shortRest) {
                setShortRest(preferences.shortRest);
            }
            if (preferences.normalRest) {
                setNormalRest(preferences.normalRest);
            }
            if (preferences.longRest) {
                setLongRest(preferences.longRest);
            }
        }
    }, []);

    const handleWeightUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newWeightUnit = e.target.value;
        setWeightUnit(newWeightUnit);
        savePreferences({ weightUnit: newWeightUnit });
    };

    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>, restType: string) => {
        const newRestValue = Number(e.target.value);
        if (restType === 'short') {
            setShortRest(newRestValue);
            savePreferences({ shortRest: newRestValue });
        } else if (restType === 'normal') {
            setNormalRest(newRestValue);
            savePreferences({ normalRest: newRestValue });
        } else if (restType === 'long') {
            setLongRest(newRestValue);
            savePreferences({ longRest: newRestValue });
        }
    };

    const savePreferences = (newPreferences: Partial<{ weightUnit: string; shortRest: number; normalRest: number; longRest: number }>) => {
        const savedPreferences = localStorage.getItem('preferences');
        const preferences = savedPreferences ? JSON.parse(savedPreferences) : {};
        const updatedPreferences = { ...preferences, ...newPreferences };
        localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
        addNotification('Preferences saved successfully', 'success');
    };

    const handleClearData = () => {
        const firstConfirmation = window.confirm("Are you sure you want to clear all saved data?");
        if (firstConfirmation) {
            const secondConfirmation = window.confirm("This action is irreversible. Do you really want to proceed?");
            if (secondConfirmation) {
                localStorage.clear();
                window.location.reload();
            }
        }
    };

    const addNotification = useCallback((message: string, type: 'success' | 'info' | 'error') => {
        // Generate a random ID for the notification
        const id = Math.random().toString(36).substr(2, 9);
        // Add the notification to the list
        setNotifications((previousNotifications) => [...previousNotifications, { id, message, type }]);
    }, []);

    return (
        <div className="main-content">
            <NotificationQueue notifications={notifications} setNotifications={setNotifications} />

            <div className="page-title">
                <h1>Settings</h1>
            </div>

            <div className="card">
                <div className="settings-columns">
                    <div className="settings-inputs">
                        <section>
                            <div>
                                <label htmlFor="weight-unit">Preferred Weight Unit:</label>
                                <select
                                    id="weight-unit"
                                    value={weightUnit}
                                    onChange={handleWeightUnitChange}
                                    className="input-field"
                                >
                                    <option value="lb">lb</option>
                                    <option value="kg">kg</option>
                                </select>
                            </div>
                        </section>

                        <section>
                            <div>
                                <label htmlFor="short-rest">Short Rest (seconds):</label>
                                <input
                                    type="number"
                                    id="short-rest"
                                    value={shortRest}
                                    onChange={(e) => handleRestChange(e, 'short')}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="normal-rest">Normal Rest (seconds):</label>
                                <input
                                    type="number"
                                    id="normal-rest"
                                    value={normalRest}
                                    onChange={(e) => handleRestChange(e, 'normal')}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label htmlFor="long-rest">Long Rest (seconds):</label>
                                <input
                                    type="number"
                                    id="long-rest"
                                    value={longRest}
                                    onChange={(e) => handleRestChange(e, 'long')}
                                    className="input-field"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="page-title">
                <h1>Debug</h1>
            </div>

            <div className="card">

                <div className="container-section-title">
                    <h2>Manage Data</h2>
                </div>

                <div className="settings-buttons">
                    <button onClick={handleClearData} className="bad-button">
                        Clear All Data
                    </button>
                </div>

                <div className="settings-buttons">
                    <section>
                        <button onClick={() => addNotification('Success message', 'success')} className="normal-button">
                            Show Success Notification
                        </button>
                        <button onClick={() => addNotification('Info message', 'info')} className="normal-button">
                            Show Info Notification
                        </button>
                        <button onClick={() => addNotification('Error message', 'error')} className="normal-button">
                            Show Error Notification
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Settings;
