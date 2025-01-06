import React, { useState, useEffect } from 'react';

interface TimingPreferencesInterface {
    // Rest times in seconds
    shortRest: number;
    normalRest: number;
    longRest: number;
}

const DefaultTimingPreferences: TimingPreferencesInterface = {
    shortRest: 30,
    normalRest: 60,
    longRest: 90,
};

const TimingPreferences: React.FC = () => {
    // Load preferences from local storage or use default values
    const [preferencesState, setPreferencesState] = useState<TimingPreferencesInterface>({
        shortRest: 30,
        normalRest: 60,
        longRest: 90,
    });

    useEffect(() => {
        // Load preferences from local storage
        const preferences = localStorage.getItem('timing-preferences');
        if (preferences) {
            setPreferencesState(JSON.parse(preferences));
        }
        else
        {
            setPreferencesState(DefaultTimingPreferences);
            savePreferences(DefaultTimingPreferences);
        }
    }, []);

    // Save preferences to local storage
    const savePreferences = (preferences: TimingPreferencesInterface) => {
        localStorage.setItem('timing-preferences', JSON.stringify(preferences));
    };

    // Handle changes in the rest times
    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>, restType: string) => {
        const newRestValue = Number(e.target.value);
        setPreferencesState((prev) => ({ ...prev, [restType]: newRestValue }));
        const updatedPreferences = { ...preferencesState, [restType]: newRestValue };
        localStorage.setItem('timing-preferences', JSON.stringify(updatedPreferences));
    };

    return (
        <div className="timing-preferences">
            <h2>Timing Preferences</h2>
            <div>
                <label>Short Rest:</label>
                <input
                    type="number"
                    value={preferencesState.shortRest}
                    onChange={(e) => handleRestChange(e, 'shortRest')}
                />
            </div>

            <div>
                <label>Normal Rest:</label>
                <input
                    type="number"
                    value={preferencesState.normalRest}
                    onChange={(e) => handleRestChange(e, 'normalRest')}
                />
            </div>

            <div>
                <label>Long Rest:</label>
                <input
                    type="number"
                    value={preferencesState.longRest}
                    onChange={(e) => handleRestChange(e, 'longRest')}
                />
            </div>
        </div >
    );
};

export default TimingPreferences;
