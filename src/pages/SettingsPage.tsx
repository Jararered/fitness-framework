import React from "react";

import { useUser } from "../context/UserContext.tsx";

import "../styles/pages/SettingsPage.css";
import "../styles/components/PillToggle.css";

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
        <span>
            <input className="height-input" type="number" value={settings.height} onChange={(e) => setSettings({ ...settings, height: Number(e.target.value) })} />
            cm
        </span>
    );
};

const HeightInputImperial = () => {
    const { settings, setSettings } = useUser();
    const { feet, inches } = calculateHeightImperial(settings.height);

    return (
        <span>
            <input className="height-input"
                type="number"
                value={feet}
                onChange={(e) => {
                    const newFeet = Number(e.target.value);
                    const heightCm = calculateHeightCm(newFeet, inches);
                    setSettings({ ...settings, height: heightCm });
                }}
                placeholder="ft"
                min="0"
            />
            ft
            <input className="height-input"
                type="number"
                value={inches}
                onChange={(e) => {
                    const newInches = Number(e.target.value);
                    const heightCm = calculateHeightCm(feet, newInches);
                    setSettings({ ...settings, height: heightCm });
                }}
                placeholder="in"
                min="0"
                max="11"
            />
            in
        </span>
    );
};

// Weight conversion functions
const gramsToLbs = (grams: number) => {
    return Math.round(grams / 453.592 * 10) / 10;
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

    const displayWeight = isImperial
        ? gramsToLbs(settings.weight)
        : gramsToKg(settings.weight);

    return (
        <span>
            <input className="weight-input"
                type="number"
                step="0.1"
                value={displayWeight}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    const weightInGrams = isImperial
                        ? lbsToGrams(value)
                        : kgToGrams(value);
                    setSettings({ ...settings, weight: weightInGrams });
                }}
            />
            {isImperial ? "lb" : "kg"}
        </span>
    );
};

const SettingsPage: React.FC = () => {
    const { settings, setSettings } = useUser();

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="card">
                <label>Name</label>
                <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />

                <label>Weight ({settings.unit === "imperial" ? "lb" : "kg"})</label>
                <WeightInput />

                <label>Height</label>
                {settings.unit === "imperial" ? (
                    <HeightInputImperial />
                ) : (
                    <HeightInputMetric />
                )}

                <label>Units</label>
                <select
                    value={settings.unit}
                    onChange={(e) => setSettings({ ...settings, unit: e.target.value as "imperial" | "metric" })}
                >
                    <option value="imperial">imperial</option>
                    <option value="metric">metric</option>
                </select>

                <label>Dark Mode</label>
                <button
                    className={`pill-toggle ${settings.darkMode ? "active" : ""}`}
                    onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                >
                    <span className="pill-circle"></span>
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;