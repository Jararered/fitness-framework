import useLocalStorage, { Keys } from "../../interfaces/Storage";

interface TimingSettingsInterface {
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
    const [settings, setSettings] = useLocalStorage<TimingSettingsInterface>(Keys.TimingSettings, DefaultTimingSettings);

    return (
        <div className="timing-settings">
            <h2>Timing Settings</h2>

            <div>
                <label>Short Rest:</label>
                <input
                    type="number"
                    value={settings.shortRest}
                    onChange={(e) => setSettings({ ...settings, shortRest: parseInt(e.target.value) })}
                />
            </div>

            <div>
                <label>Normal Rest:</label>
                <input
                    type="number"
                    value={settings.normalRest}
                    onChange={(e) => setSettings({ ...settings, normalRest: parseInt(e.target.value) })}
                />
            </div>

            <div>
                <label>Long Rest:</label>
                <input
                    type="number"
                    value={settings.longRest}
                    onChange={(e) => setSettings({ ...settings, longRest: parseInt(e.target.value) })}
                />
            </div>
        </div >
    );
};

export default TimingSettings;
