import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";

const SettingsPage: React.FC = () => {
    const { settings, setSettings } = useWorkout();

    const handleUpdateSetting = (key: keyof typeof settings, value: any) => {
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
                    onChange={(e) => handleUpdateSetting("name", e.target.value)}
                />
                <label>Weight ({settings.unit === "imperial" ? "lb" : "kg"})</label>
                <input
                    type="number"
                    step="0.5"
                    value={settings.weight}
                    onChange={(e) => handleUpdateSetting("weight", Number(e.target.value))}
                />
                <label>Height</label>
                {settings.unit === "imperial" ? (
                    <span>
                        <input
                            type="number"
                            value={Math.floor(settings.height / 12)}
                            onChange={(e) => {
                                const feet = Number(e.target.value);
                                const inches = settings.height % 12;
                                handleUpdateSetting("height", feet * 12 + inches);
                            }}
                            placeholder="ft"
                            min="0"
                        />
                        ft
                        <input
                            type="number"
                            value={settings.height % 12}
                            onChange={(e) => {
                                const inches = Number(e.target.value);
                                const feet = Math.floor(settings.height / 12);
                                handleUpdateSetting("height", feet * 12 + inches);
                            }}
                            placeholder="in"
                            min="0"
                            max="11"
                        />
                        in
                    </span>
                ) : (
                    <span>
                        <input
                            type="number"
                            value={settings.height}
                            onChange={(e) => handleUpdateSetting("height", Number(e.target.value))}
                        />
                        cm
                    </span>
                )}
                <label>Units</label>
                <select
                    value={settings.unit}
                    onChange={(e) => handleUpdateSetting("unit", e.target.value as "imperial" | "metric")}
                >
                    <option value="imperial">imperial</option>
                    <option value="metric">metric</option>
                </select>
                <label>Dark Mode</label>
                <button
                    className={`toggle-button ${settings.darkMode ? "active" : ""}`}
                    onClick={() => handleUpdateSetting("darkMode", !settings.darkMode)}
                >
                    {settings.darkMode ? "On" : "Off"}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;