import React, { useState, useEffect } from 'react';

interface UserPreferencesInterface {
    // User
    name: string;
    weight: number;
    units: string;
}

const UserPreferences = () => {
    // Load preferences from local storage or use default values
    const [preferencesState, setPreferencesState] = useState<UserPreferencesInterface>({
        name: '',
        weight: 0,
        units: 'lb',
    });

    useEffect(() => {
        // Load preferences from local storage
        const userPreferences = localStorage.getItem('user-preferences');
        if (userPreferences) {
            setPreferencesState(JSON.parse(userPreferences));
        }
    }, []);

    // Save preferences to local storage
    const savePreference = <T,>(key: keyof UserPreferencesInterface, value: T) => {
        setPreferencesState((prev) => ({ ...prev, [key]: value }));
        const updatedPreferences = { ...preferencesState, [key]: value };
        localStorage.setItem('user-preferences', JSON.stringify(updatedPreferences));
    };

    // Handles changes in the user name
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUser = e.target.value;
        savePreference('name', newUser);
    };

    // Handle changes in the weight
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = Number(e.target.value);
        savePreference('weight', newWeight);
    };

    // Handle changes in the weight unit
    const handleUnitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnits = e.target.value;
        savePreference('units', newUnits);
    };

    return (
        <div className="user-preferences">
            <h2>User Preferences</h2>
            <div>
                <label>User:</label>
                <input type="text" value={preferencesState.name} onChange={handleUserChange} />
            </div>

            <div>
                <label>Weight:</label>
                <input type="number" value={preferencesState.weight} onChange={handleWeightChange} />
            </div>

            <div>
                <label>Units:</label>
                <select value={preferencesState.units} onChange={handleUnitsChange}>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                </select>
            </div>
        </div>
    );
}

export default UserPreferences;