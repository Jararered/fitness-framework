import React, { useState, useEffect } from 'react';
import SectionTitle from './buttons/SectionTitle';
import '../styles/Input.css';
import './Preferences.css';
import './shared/HorizontalSection.css'

interface PreferencesInterface {
    // User
    user: string;
    weight: number;

    // Weight unit can be either 'lb' or 'kg'
    units: string;

    // Rest times in seconds
    shortRest: number;
    normalRest: number;
    longRest: number;
}

const Preferences: React.FC = () => {
    // Load preferences from local storage or use default values
    const [preferences, setPreferences] = useState<PreferencesInterface>({
        user: 'User',
        weight: 0,
        units: 'lb',
        shortRest: 30,
        normalRest: 60,
        longRest: 90,
    });

    useEffect(() => {
        // Load preferences from local storage
        const preferences = localStorage.getItem('preferences');
        if (preferences) {
            setPreferences(JSON.parse(preferences));
        }
    }, []);

    // Save preferences to local storage
    const savePreference = <T,>(key: keyof PreferencesInterface, value: T) => {
        setPreferences((prev) => ({ ...prev, [key]: value }));
        const updatedPreferences = { ...preferences, [key]: value };
        localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
    };

    // Handle changes in the weight unit
    const handleWeightUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newWeightUnit = e.target.value;
        savePreference('units', newWeightUnit);
    };

    // Handle changes in the rest times
    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>, restType: string) => {
        const newRestValue = Number(e.target.value);
        savePreference(`${restType}Rest` as keyof typeof preferences, newRestValue);
    };

    // Handle clearing all data
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

    return (
        <div className="main-content">
            <SectionTitle title="Preferences" />

            <div className="vertical-section">
                <div className="card">

                    <h2>User Preferences</h2>

                    <div>
                        <label htmlFor="user-name">User Name:</label>
                        <input
                            type="text"
                            id="user-name"
                            value={preferences.user}
                            onChange={(e) => savePreference('user', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="user-weight">User Weight:</label>
                        <input
                            type="number"
                            id="user-weight"
                            value={preferences.weight}
                            onChange={(e) => savePreference('weight', Number(e.target.value))}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="weight-unit">Preferred Units:</label>
                        <select
                            id="weight-unit"
                            value={preferences.units}
                            onChange={handleWeightUnitChange}
                            className="input-field"
                        >
                            <option value="lb">lb</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                </div>

                <div className="card">
                    <h2>Timing Preferences</h2>

                    <div>
                        <label htmlFor="short-rest">Short Rest (sec):</label>
                        <input
                            type="number"
                            id="short-rest"
                            value={preferences.shortRest}
                            onChange={(e) => handleRestChange(e, 'short')}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="normal-rest">Normal Rest (sec):</label>
                        <input
                            type="number"
                            id="normal-rest"
                            value={preferences.normalRest}
                            onChange={(e) => handleRestChange(e, 'normal')}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="long-rest">Long Rest (sec):</label>
                        <input
                            type="number"
                            id="long-rest"
                            value={preferences.longRest}
                            onChange={(e) => handleRestChange(e, 'long')}
                            className="input-field"
                        />
                    </div>
                </div>
            </div>

            <SectionTitle title="Debug" />
            <div className="horizontal-section">
                <div className="card">
                    <div className="container-section-title">
                        <h2>Manage Data</h2>
                    </div>

                    <div className="preferences-buttons">
                        <button
                            onClick={() => {
                                savePreference('user', 'User');
                                savePreference('weight', 0);
                                savePreference('units', 'lb');
                            }}
                            className="bad-button">
                            Reset User Preferences
                        </button>
                    </div>

                    <div className="preferences-buttons">
                        <button
                            onClick={() => {
                                savePreference('shortRest', 30);
                                savePreference('normalRest', 60);
                                savePreference('longRest', 90);
                            }}
                            className="bad-button">
                            Reset Timing Preferences
                        </button>
                    </div>

                    <div className="preferences-buttons">
                        <button onClick={handleClearData} className="bad-button">
                            Clear All Data
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Preferences;
