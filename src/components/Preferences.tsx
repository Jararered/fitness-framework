import React, { useState, useEffect } from 'react';

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

const REST_TYPES = [
    { key: 'short', label: 'Short Rest' },
    { key: 'normal', label: 'Normal Rest' },
    { key: 'long', label: 'Long Rest' }
] as const;

const Preferences: React.FC = () => {
    // Load preferences from local storage or use default values
    const [preferences, setPreferences] = useState<PreferencesInterface>({
        user: '',
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

    // Handle changes in the weight
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow zero and positive numbers only
        if (value !== '' && Number(value) <= 0) {
            return;
        }

        savePreference('weight', value === '' ? 0 : Number(value));
    };

    const handleClearWorkoutData = () => {
        const confirmation = window.confirm("Are you sure you want to clear all workout data?");
        if (confirmation) {
            localStorage.removeItem('currentWorkout');
            localStorage.removeItem('loggedWorkouts');
            localStorage.removeItem('loggedMaxWeights');
            localStorage.removeItem('loggedLastWeights');
            localStorage.removeItem('loggedWeights');

            window.location.reload();
        }
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
        <div className="preferences">

            <h1>Preferences</h1>

            <div className="column">
                <div className="card">

                    <h2>User Preferences</h2>

                    <div>
                        <label htmlFor="user-name">User Name:</label>
                        <input className="input-field"
                            type="text"
                            id="user-name"
                            value={preferences.user}
                            onChange={(e) => savePreference('user', e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="user-weight">User Weight:</label>
                        <input className="input-field"
                            type="number"
                            id="user-weight"
                            value={preferences.weight === 0 ? '' : preferences.weight}
                            onChange={handleWeightChange}
                            inputMode="decimal"
                        />
                    </div>
                    <div>
                        <label htmlFor="weight-unit">Preferred Units:</label>
                        <select className="input-field"
                            id="weight-unit"
                            value={preferences.units}
                            onChange={handleWeightUnitChange}
                        >
                            <option value="lb">lb</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                </div>

                <div className="card">
                    <h2>Timing Preferences</h2>
                    {REST_TYPES.map(({ key, label }) => (
                        <div key={key}>
                            <label htmlFor={`${key}-rest`}>{label} (sec):</label>
                            <input
                                type="number"
                                id={`${key}-rest`}
                                value={preferences[`${key}Rest` as keyof typeof preferences]}
                                onChange={(e) => handleRestChange(e, key)}
                                className="input-field"
                                inputMode="numeric"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <h1>Debug</h1>

            <div className="column">
                <div className="card">
                    <div className="container-section-title">
                        <h2>Manage Data</h2>
                    </div>

                    <div className="preferences-buttons">
                        <button
                            onClick={() => {
                                savePreference('user', 'User');
                                savePreference('weight', '0');
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
                        <button onClick={handleClearWorkoutData} className="bad-button">
                            Clear Workout Data
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
