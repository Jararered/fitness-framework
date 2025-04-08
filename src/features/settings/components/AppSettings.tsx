import { useNavigate } from "react-router-dom";
import { UnitSystem, useSettingStore } from "../hooks/useSettingStore";
import { LuRuler, LuMessageSquareQuote, LuMoon, LuShieldX, LuArrowRight } from "react-icons/lu";
import { QuoteMode } from "../../quotes/types/quotes.types";
import { PillToggle } from "../../layout/components/PillToggle";

export const AppSettings = () => {
    const navigate = useNavigate();
    const { unit, setUnit, quoteMode, setQuoteMode, darkMode, setDarkMode } = useSettingStore();

    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const unit = e.target.value as UnitSystem;
        setUnit(unit);
    };

    const handleQuoteModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuoteMode(e.target.value as QuoteMode);
    };

    return (
        <div className="card-container flex-column">
            <div className="card-header flex-column">
                <h2>App Settings</h2>
                <p>
                    Below are the app settings. <br />
                    These settings customize the look and feel of the app.
                </p>
            </div>

            <div className="card-content flex-column">
                <div className="flex-row flex-grow">
                    <div className="flex-row flex-grow">
                        <LuRuler />
                        <strong>Units</strong>
                    </div>
                    <select
                        value={unit}
                        onChange={handleUnitChange}
                    >
                        <option value="imperial">Imperial</option>
                        <option value="metric">Metric</option>
                    </select>
                </div>

                <div className="flex-row">
                    <div className="flex-row flex-grow">
                        <LuMessageSquareQuote />
                        <strong>Quote Style</strong>
                    </div>
                    <select
                        value={quoteMode}
                        onChange={handleQuoteModeChange}
                    >
                        <option value="gentle">Gentle</option>
                        <option value="moderate">Moderate</option>
                        <option value="hardcore">Hardcore</option>
                        <option value="xxx">XXX</option>
                    </select>
                </div>

                <div className="flex-row flex-grow">
                    <div className="flex-row flex-grow">
                        <LuMoon />
                        <strong>Dark Mode</strong>
                    </div>
                    <PillToggle
                        value={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                </div>

                <div className="flex-row">
                    <div className="flex-row flex-grow">
                        <LuShieldX />
                        <strong>App Data</strong>
                    </div>
                    <button
                        className="right caution"
                        onClick={() => navigate("/manage-data")}
                    >
                        Manage
                        <LuArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};
