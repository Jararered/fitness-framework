import React, { useState, useEffect } from "react";

type Units = "lb" | "kg";

interface UserSettingsInterface {
    // User
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
    // Load settings from local storage or use default values
    const [settingsState, setSettingsState] = useState<UserSettingsInterface>({
        name: "",
        weight: 0,
        units: "lb",
    });

    useEffect(() => {
        // Load settings from local storage
        const userSettings = localStorage.getItem("user-settings");
        if (userSettings) {
            setSettingsState(JSON.parse(userSettings));
        }
        else {
            setSettingsState(DefaultUserSettings);
            localStorage.setItem("user-settings", JSON.stringify(DefaultUserSettings));
        }
    }, []);

    // Save settings to local storage
    const saveSettings = (settings: UserSettingsInterface) => {
        setSettingsState(settings);
        localStorage.setItem("user-settings", JSON.stringify(settings));
    }

    // Handles changes in the user name
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUser = e.target.value;
        saveSettings({ ...settingsState, name: newUser });
    };

    // Handle changes in the weight
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = Number(e.target.value);
        saveSettings({ ...settingsState, weight: newWeight });
    };

    // Handle changes in the weight unit
    const handleUnitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnits = e.target.value as Units;
        saveSettings({ ...settingsState, units: newUnits });
    };

    return (
        <div className="user-settings">
            <h2>User Settings</h2>
            <div>
                <label>User:</label>
                <input type="text" value={settingsState.name} onChange={handleUserChange} />
            </div>

            <div>
                <label>Weight:</label>
                <input type="number" value={settingsState.weight} onChange={handleWeightChange} />
            </div>

            <div>
                <label>Units:</label>
                <select value={settingsState.units} onChange={handleUnitsChange}>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                </select>
            </div>
        </div>
    );
}

export default UserSettings;