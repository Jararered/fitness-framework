import React from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext.tsx";

// User Settings Icons
import { LuUser } from "react-icons/lu";
import { LuWeight } from "react-icons/lu";
import { LuRuler } from "react-icons/lu";

// App Settings Icons
import { LuMessageSquareQuote, LuMoon, LuShieldX } from "react-icons/lu";
import { LuArrowRight } from "react-icons/lu";

// About Icons
import { LuGithub } from "react-icons/lu";
import { LuMail } from "react-icons/lu";


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
            <div className="units-strong">{isImperial ? "lbs" : "kg"}</div>
        </span>
    );
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
            <div className="units-strong">cm</div>
        </span>
    );
};

const HeightInputImperial = () => {
    const { settings, setSettings } = useUser();
    const { feet, inches } = calculateHeightImperial(settings.height);

    return (
        <span className="imperial-height-input-container">
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
            <div className="units-strong">ft</div>
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
            <div className="units-strong">in</div>
        </span>
    );
};

const SettingsPage: React.FC = () => {
    const { settings, setSettings } = useUser();
    const navigate = useNavigate();

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const unit = e.target.value as "imperial" | "metric";

        if (unit === "imperial") {
            setSettings({ ...settings, unit, weightUnit: "lbs" });
        } else {
            setSettings({ ...settings, unit, weightUnit: "kg" });
        }
    };

    const handleQuoteModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSettings({ ...settings, quoteMode: e.target.value as "gentle" | "moderate" | "hardcore" | "xxx" });
    };

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
                        <span className="left">
                            <LuUser />
                            <strong>Name</strong>
                        </span>
                        <div className="right">
                            <input
                                type="text"
                                value={settings.name}
                                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                            />
                        </div>
                    </span>

                    <span className="card-row">
                        <span className="left">
                            <LuWeight />
                            <strong>Weight</strong>
                        </span>
                        <div className="right">
                            <WeightInput />
                        </div>
                    </span>

                    <span className="card-row">
                        <span className="left">
                            <LuRuler />
                            <strong>Height</strong>
                        </span>
                        <div className="right">
                            {settings.unit === "imperial" ? <HeightInputImperial /> : <HeightInputMetric />}
                        </div>
                    </span>

                    <hr />

                    <div className="card-header">
                        <h2>App Settings</h2>
                        <p>
                            Below are the app settings. <br />
                            These settings customize the look and feel of the app.
                        </p>
                    </div>

                    <span className="card-row">
                        <span className="left">
                            <LuRuler />
                            <strong>Units</strong>
                        </span>
                        <select
                            className="right"
                            value={settings.unit}
                            onChange={handleUnitChange}
                        >
                            <option value="imperial">Imperial</option>
                            <option value="metric">Metric</option>
                        </select>
                    </span>

                    <span className="card-row">
                        <span className="left">
                            <LuMessageSquareQuote />
                            <strong>Quote Mode</strong>
                        </span>
                        <select
                            className="right"
                            value={settings.quoteMode}
                            onChange={handleQuoteModeChange}
                        >
                            <option value="gentle">Gentle</option>
                            <option value="moderate">Moderate</option>
                            <option value="hardcore">Hardcore</option>
                            <option value="xxx">XXX</option>
                        </select>
                    </span>

                    <span className="card-row">
                        <span className="left">
                            <LuMoon />
                            <strong>Dark Mode</strong>
                        </span>
                        <button
                            className={`pill-toggle right ${settings.darkMode ? "active" : ""}`}
                            onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                        >
                            <span className="pill-circle"></span>
                        </button>
                    </span>

                    <span className="card-row">
                        <span className="left">
                            <LuShieldX />
                            <strong>Manage Data</strong>
                        </span>
                        <button
                            className="right caution"
                            onClick={() => navigate("/manage-data")}
                        >
                            Manage Data
                            <LuArrowRight size={24} />
                        </button>
                    </span>

                    <hr />

                    <div className="card-header">
                        <h2>About</h2>
                        <p>
                            This app is a work in progress. <br />
                            Please report any issues to the developer.
                        </p>
                    </div>
                    <span className="card-row">
                        <span className="left">
                            <strong>Version</strong>
                        </span>
                        <span className="right">0.0.1</span>
                    </span>
                    <span className="card-row">
                        <span className="left">
                            <strong>Developer</strong>
                        </span>
                        <a
                            href="mailto:jararered@icloud.com"
                            className="right"
                        >
                            Email <LuMail />
                        </a>
                    </span>
                    <span className="card-row">
                        <span className="left">
                            <strong>Github</strong>
                        </span>
                        <a
                            className="right"
                            href="https://github.com/Jararered"
                        >
                            Github <LuGithub />
                        </a>
                    </span>
                    <span className="card-row">
                        <span className="left">
                            <strong>Source Code</strong>
                        </span>
                        <a
                            className="right"
                            href="https://github.com/Jararered/fitness-framework"
                        >
                            Github <LuGithub />
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
