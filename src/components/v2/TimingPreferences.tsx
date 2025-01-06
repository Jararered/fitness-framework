import React, { useState, useEffect } from 'react';

interface TimingPreferencesInterface {
    // Rest times in seconds
    shortRest: number;
    normalRest: number;
    longRest: number;
}

const TimingPreferences: React.FC = () => {
    // Load preferences from local storage or use default values
    const [preferences, setPreferences] = useState<TimingPreferencesInterface>({
        shortRest: 30,
        normalRest: 60,
        longRest: 90,
    });

    useEffect(() => {
        // Load preferences from local storage
        const preferences = localStorage.getItem('timing-preferences');
        if (preferences) {
            setPreferences(JSON.parse(preferences));
        }
    }, []);

    // Handle changes in the rest times
    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>, restType: string) => {
        const newRestValue = Number(e.target.value);
        setPreferences((prev) => ({ ...prev, [restType]: newRestValue }));
        const updatedPreferences = { ...preferences, [restType]: newRestValue };
        localStorage.setItem('timing-preferences', JSON.stringify(updatedPreferences));
    };

    return (
        <div className="timing-preferences">
            <h2>Timing Preferences</h2>
            <div>
                <label>Short Rest:</label>
                <input
                    type="number"
                    value={preferences.shortRest}
                    onChange={(e) => handleRestChange(e, 'shortRest')}
                />
            </div>

            <div>
                <label>Normal Rest:</label>
                <input
                    type="number"
                    value={preferences.normalRest}
                    onChange={(e) => handleRestChange(e, 'normalRest')}
                />
            </div>

            <div>
                <label>Long Rest:</label>
                <input
                    type="number"
                    value={preferences.longRest}
                    onChange={(e) => handleRestChange(e, 'longRest')}
                />
            </div>
        </div >
    );
};

export default TimingPreferences;
