import React, { useState, useEffect } from "react";

import { Keys } from "../../interfaces/Storage";

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
    const settingsLocal = localStorage.getItem(Keys.TimingSettings);
    const [settingsState, setSettingsState] = useState<TimingSettingsInterface>(
        settingsLocal ? JSON.parse(settingsLocal) : DefaultTimingSettings
    );

    useEffect(() => {
        localStorage.setItem(Keys.TimingSettings, JSON.stringify(settingsState));
    }, [settingsLocal]);

    return (
        <div className="timing-settings">
            <h2>Timing Settings</h2>

            <div>
                <label>Short Rest:</label>
                <input
                    type="number"
                    value={settingsState.shortRest}
                    onChange={(e) => setSettingsState({ ...settingsState, shortRest: parseInt(e.target.value) })}
                />
            </div>

            <div>
                <label>Normal Rest:</label>
                <input
                    type="number"
                    value={settingsState.normalRest}
                    onChange={(e) => setSettingsState({ ...settingsState, normalRest: parseInt(e.target.value) })}
                />
            </div>

            <div>
                <label>Long Rest:</label>
                <input
                    type="number"
                    value={settingsState.longRest}
                    onChange={(e) => setSettingsState({ ...settingsState, longRest: parseInt(e.target.value) })}
                />
            </div>
        </div >
    );
};

export default TimingSettings;
