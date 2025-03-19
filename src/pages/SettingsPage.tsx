import React from "react";

import { useUser } from "../context/UserContext.tsx";

import "../styles/pages/SettingsPage.css";
import "../styles/components/PillToggle.css";
import { LuTrash } from "react-icons/lu";

// This function calculates the height in cm from the height in feet and inches
const calculateHeightCm = (feet: number, inches: number) => {
    return (feet * 12 + inches) * 2.54;
};

// This function calculates the height in feet and inches from the height in cm
const calculateHeightImperial = (cm: number) => {
    const feet = Math.floor(cm / 30.48);
    const inches = Math.round((cm % 30.48) / 2.54);
    return { feet, inches };
};

const HeightInputMetric = () => {
    const { settings, setSettings } = useUser();

    return (
        <span className="height-input-container">
            <input
                className="number-input"
                type="number"
                value={settings.height}
                inputMode="decimal"
                onChange={(e) => setSettings({ ...settings, height: Number(e.target.value) })}
            />
            cm
        </span>
    );
};

const HeightInputImperial = () => {
    const { settings, setSettings } = useUser();
    const { feet, inches } = calculateHeightImperial(settings.height);

    return (
        <div className="imperial-height-input-container">
            <input
                className="number-input"
                type="number"
                value={feet}
                inputMode="numeric"
                onChange={(e) => {
                    const newFeet = Number(e.target.value);
                    const heightCm = calculateHeightCm(newFeet, inches);
                    setSettings({ ...settings, height: heightCm });
                }}
                placeholder="ft"
                min="0"
            />
            <div className="height-input-divider">ft</div>
            <input
                className="number-input"
                type="number"
                value={inches}
                inputMode="numeric"
                onChange={(e) => {
                    const newInches = Number(e.target.value);
                    const heightCm = calculateHeightCm(feet, newInches);
                    setSettings({ ...settings, height: heightCm });
                }}
                placeholder="in"
                min="0"
                max="11"
            />
            <div className="height-input-divider">in</div>
        </div>
    );
};

// Weight conversion functions
const gramsToLbs = (grams: number) => {
    return Math.round((grams / 453.592) * 10) / 10;
};

const lbsToGrams = (lbs: number) => {
    return Math.round(lbs * 453.592);
};

const gramsToKg = (grams: number) => {
    return Math.round(grams / 100) / 10;
};

const kgToGrams = (kg: number) => {
    return Math.round(kg * 1000);
};

const WeightInput = () => {
    const { settings, setSettings } = useUser();
    const isImperial = settings.unit === "imperial";

    const displayWeight = isImperial ? gramsToLbs(settings.weight) : gramsToKg(settings.weight);

    return (
        <span className="weight-input-container">
            <input
                className="number-input"
                type="number"
                step="1"
                inputMode="decimal"
                value={displayWeight}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    const weightInGrams = isImperial ? lbsToGrams(value) : kgToGrams(value);
                    setSettings({ ...settings, weight: weightInGrams });
                }}
            />
            <div className="weight-input-divider">{isImperial ? "lb" : "kg"}</div>
        </span>
    );
};

const handlePromptDeleteData = (handleDelete: () => void) => {
    const confirm = window.confirm("Are you sure you sure you want to delete this data? This action is irreversible.");
    if (confirm) {
        handleDelete();
    }
};

const handleDeleteAllData = () => {
    localStorage.clear();
    window.location.reload();
};

const handleDeleteGyms = () => {
    localStorage.removeItem("equipment-configs");
    localStorage.removeItem("equipment-last");
    window.location.reload();
};

const handleDeleteUserData = () => {
    localStorage.removeItem("user-context");
    localStorage.removeItem("workout-logs");
    window.location.reload();
};

const handleDeleteWorkouts = () => {
    localStorage.removeItem("workout-plans");
    localStorage.removeItem("workout-state");
    window.location.reload();
};

const SettingsPage: React.FC = () => {
    const { settings, setSettings } = useUser();

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="card">
                <div className="card-content">
                    <div className="card-row">
                        <label>Name</label>
                        <input type="text" value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })} />
                    </div>

                    <div className="card-row">
                        <label>Weight ({settings.unit === "imperial" ? "lb" : "kg"})</label>
                        <WeightInput />
                    </div>

                    <div className="card-row">
                        <label>Height</label>
                        {settings.unit === "imperial" ? <HeightInputImperial /> : <HeightInputMetric />}
                    </div>

                    <div className="card-row">
                        <label>Units</label>
                        <select value={settings.unit} onChange={(e) => setSettings({ ...settings, unit: e.target.value as "imperial" | "metric" })}>
                            <option value="imperial">imperial</option>
                            <option value="metric">metric</option>
                        </select>
                    </div>

                    <div className="card-row">
                        <label>Dark Mode</label>
                        <button className={`pill-toggle ${settings.darkMode ? "active" : ""}`} onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}>
                            <span className="pill-circle"></span>
                        </button>
                    </div>
                </div>
            </div>

            <h1>Manage Data</h1>
            <div className="card">
                <h2>Delete All Gyms</h2>
                <p>This will delete all saved gyms from the app. This action is irreversible.</p>
                <button className="delete-data-button" onClick={() => handlePromptDeleteData(handleDeleteGyms)}>
                    <LuTrash />
                    Delete All Gyms
                </button>

                <h2>Delete All Workouts</h2>
                <p>This will delete all saved workouts from the app. This action is irreversible.</p>
                <button className="delete-data-button" onClick={() => handlePromptDeleteData(handleDeleteWorkouts)}>
                    <LuTrash />
                    Delete All Workouts
                </button>

                <h2>Delete All User Data</h2>
                <p>This will delete all user data from the app, including settings and workout logs. This action is irreversible.</p>
                <button className="delete-data-button" onClick={() => handlePromptDeleteData(handleDeleteUserData)}>
                    <LuTrash />
                    Delete All User Data
                </button>

                <h2>Delete All Data</h2>
                <p>This will delete all data from the app. This is a full reset of the app. This action is irreversible.</p>
                <button className="delete-data-button" onClick={() => handlePromptDeleteData(handleDeleteAllData)}>
                    <LuTrash />
                    Delete All Data
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
