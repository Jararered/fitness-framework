import { useState, useEffect } from "react";

import { Keys } from "../../interfaces/Storage";

type Units = "lb" | "kg";

interface UserSettingsInterface {
    name: string;
    weight: number;
    units: Units;
}

const DefaultUserSettings: UserSettingsInterface = {
    name: "",
    weight: 0,
    units: "lb",
};

const UserSettings = () => {
    const settingsLocal = localStorage.getItem(Keys.UserSettings);
    const [settingsState, setSettingsState] = useState<UserSettingsInterface>(
        settingsLocal ? JSON.parse(settingsLocal) : DefaultUserSettings
    );

    useEffect(() => {
        localStorage.setItem(Keys.UserSettings, JSON.stringify(settingsState));
    }, [settingsState]);

    return (
        <div className="user-settings">
            <h2>User Settings</h2>
            <div>
                <label>User:</label>
                <input type="text" value={settingsState.name} onChange={(e) => setSettingsState({ ...settingsState, name: e.target.value })}
                />
            </div>

            <div>
                <label>Weight:</label>
                <input type="number" value={settingsState.weight} onChange={(e) => setSettingsState({ ...settingsState, weight: parseFloat(e.target.value) })} />
            </div>

            <div>
                <label>Units:</label>
                <select value={settingsState.units} onChange={(e) => setSettingsState({ ...settingsState, units: e.target.value as Units })}>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                </select>
            </div>
        </div>
    );
}

export default UserSettings;