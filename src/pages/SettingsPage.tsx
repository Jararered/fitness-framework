import React from "react";

import { useUser } from "../context/UserContext.tsx";

import "../styles/pages/SettingsPage.css";
import "../styles/components/PillToggle.css";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

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

const SettingsPage: React.FC = () => {
    const { settings, setSettings } = useUser();
    const navigate = useNavigate();

    return (
        <div className="settings-page page-container">
            <h1>Settings</h1>
            <div className="card">
                <div className="card-header">
                    <h2>User Settings</h2>
                    <p>
                        Below are your user settings. <br />
                        All info is optional and stored locally.
                    </p>
                </div>

                <div className="card-content">
                    <span className="card-row">
                        <label>Name</label>
                        <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        />
                    </span>

                    <span className="card-row">
                        <label>Weight ({settings.unit === "imperial" ? "lb" : "kg"})</label>
                        <WeightInput />
                    </span>

                    <span className="card-row">
                        <label>Height</label>
                        {settings.unit === "imperial" ? <HeightInputImperial /> : <HeightInputMetric />}
                    </span>

                    <div className="card-header">
                        <h2>App Settings</h2>
                        <p>
                            Below are the app settings. <br />
                            These settings customize the look and feel of the app.
                        </p>
                    </div>

                    <span className="card-row">
                        <label>Units</label>
                        <select
                            value={settings.unit}
                            onChange={(e) =>
                                setSettings({ ...settings, unit: e.target.value as "imperial" | "metric" })
                            }
                        >
                            <option value="imperial">imperial</option>
                            <option value="metric">metric</option>
                        </select>
                    </span>

                    <span className="card-row">
                        <label>Dark Mode</label>
                        <button
                            className={`pill-toggle ${settings.darkMode ? "active" : ""}`}
                            onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                        >
                            <span className="pill-circle"></span>
                        </button>
                    </span>

                    <span className="card-row">
                        <label>Manage Data</label>
                        <button
                            className="caution"
                            onClick={() => navigate("/manage-data")}
                        >
                            Manage Data
                            <LuArrowRight size={24} />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
