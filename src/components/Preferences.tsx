import React, { useState, useEffect } from 'react';
import SectionTitle from './buttons/SectionTitle';
import '../styles/Input.css';
import './Preferences.css';
import './shared/HorizontalSection.css'


const Preferences: React.FC = () => {
    const [preferences, setPreferences] = useState({
        weightUnit: 'lb',
        shortRest: 30,
        normalRest: 60,
        longRest: 90,
    });

    useEffect(() => {
        const savedPreferences = localStorage.getItem('preferences');
        if (savedPreferences) {
            setPreferences(JSON.parse(savedPreferences));
        }
    }, []);

    const handleWeightUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newWeightUnit = e.target.value;
        setPreferences((prev) => ({ ...prev, weightUnit: newWeightUnit }));
        savePreferences({ weightUnit: newWeightUnit });
    };

    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>, restType: string) => {
        const newRestValue = Number(e.target.value);
        setPreferences((prev) => ({ ...prev, [`${restType}Rest`]: newRestValue }));
        savePreferences({ [`${restType}Rest`]: newRestValue });
    };

    const savePreferences = (newPreferences: Partial<{ weightUnit: string; shortRest: number; normalRest: number; longRest: number }>) => {
        const updatedPreferences = { ...preferences, ...newPreferences };
        localStorage.setItem('preferences', JSON.stringify(updatedPreferences));
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

    return (
        <div className="main-content">
            <SectionTitle title="Preferences" />

            <div className="vertical-section">
                <div className="card">
                    <h2>Workout Preferences</h2>
                    <div>
                        <label htmlFor="weight-unit">Preferred Weight Unit:</label>
                        <select
                            id="weight-unit"
                            value={preferences.weightUnit}
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
                        <label htmlFor="short-rest">Short Rest (seconds):</label>
                        <input
                            type="number"
                            id="short-rest"
                            value={preferences.shortRest}
                            onChange={(e) => handleRestChange(e, 'short')}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="normal-rest">Normal Rest (seconds):</label>
                        <input
                            type="number"
                            id="normal-rest"
                            value={preferences.normalRest}
                            onChange={(e) => handleRestChange(e, 'normal')}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="long-rest">Long Rest (seconds):</label>
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
