import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";

const SettingsPage: React.FC = () => {
    const { settings, setSettings } = useWorkout();

    const updateSetting = (key: keyof typeof settings, value: any) => {
        setSettings({ ...settings, [key]: value });
    };

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="card">
                <label>Name</label>
                <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => updateSetting("name", e.target.value)}
                />
                <label>Weight ({settings.unit})</label>
                <input
                    type="number"
                    step="0.5"
                    value={settings.weight}
                    onChange={(e) => updateSetting("weight", Number(e.target.value))}
                />
                <label>Height (cm)</label>
                <input
                    type="number"
                    value={settings.height}
                    onChange={(e) => updateSetting("height", Number(e.target.value))}
                />
                <label>Unit</label>
                <select
                    value={settings.unit}
                    onChange={(e) => updateSetting("unit", e.target.value as "lb" | "kg")}
                >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                </select>
                <label>Dark Mode</label>
                <button
                    className={`toggle-button ${settings.darkMode ? "active" : ""}`}
                    onClick={() => updateSetting("darkMode", !settings.darkMode)}
                >
                    {settings.darkMode ? "On" : "Off"}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;