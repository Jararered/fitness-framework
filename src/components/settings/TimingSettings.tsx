import React, { useState, useEffect } from "react";

interface TimingSettingsInterface {
    // Rest times in seconds
    shortRest: number;
    normalRest: number;
    longRest: number;
}

const DefaultTimingSettings: TimingSettingsInterface = {
    shortRest: 30,
    normalRest: 60,
    longRest: 90,
};

const TimingSettings: React.FC = () => {
    // Load settings from local storage or use default values
    const [SettingsState, setSettingsState] = useState<TimingSettingsInterface>({
        shortRest: 30,
        normalRest: 60,
        longRest: 90,
    });

    useEffect(() => {
        // Load settings from local storage
        const preferences = localStorage.getItem("timing-settings");
        if (preferences) {
            setSettingsState(JSON.parse(preferences));
        }
        else
        {
            setSettingsState(DefaultTimingSettings);
            saveSettings(DefaultTimingSettings);
        }
    }, []);

    // Save settings to local storage
    const saveSettings = (settings: TimingSettingsInterface) => {
        localStorage.setItem("timing-settings", JSON.stringify(settings));
    };

    // Handle changes in the rest times
    const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>, restType: string) => {
        const newRestValue = Number(e.target.value);
        setSettingsState((prev) => ({ ...prev, [restType]: newRestValue }));
        const updatedSettings = { ...SettingsState, [restType]: newRestValue };
        localStorage.setItem("timing-settings", JSON.stringify(updatedSettings));
    };

    return (
        <div className="timing-settings">
            <h2>Timing Settings</h2>
            <div>
                <label>Short Rest:</label>
                <input
                    type="number"
                    value={SettingsState.shortRest}
                    onChange={(e) => handleRestChange(e, "shortRest")}
                />
            </div>

            <div>
                <label>Normal Rest:</label>
                <input
                    type="number"
                    value={SettingsState.normalRest}
                    onChange={(e) => handleRestChange(e, "normalRest")}
                />
            </div>

            <div>
                <label>Long Rest:</label>
                <input
                    type="number"
                    value={SettingsState.longRest}
                    onChange={(e) => handleRestChange(e, "longRest")}
                />
            </div>
        </div >
    );
};

export default TimingSettings;
