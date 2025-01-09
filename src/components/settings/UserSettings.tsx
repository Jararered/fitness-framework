import LocalStorage, { Keys } from "../../interfaces/Storage";

type Units = "lb" | "kg";

interface UserSettings {
    name: string;
    weight: number;
    units: Units;
}

export const DefaultUserSettings: UserSettings = {
    name: "",
    weight: 0,
    units: "lb",
};

const UserSettings = () => {
    const [settings, setSettings] = LocalStorage<UserSettings>(Keys.UserSettings, DefaultUserSettings);

    return (
        <div className="user-settings">

            <h2>User Settings</h2>

            <div>
                <label>User:</label>
                <input type="text" value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                />
            </div>

            <div>
                <label>Weight:</label>
                <input type="number" value={settings.weight} onChange={(e) => setSettings({ ...settings, weight: parseFloat(e.target.value) })} />
            </div>

            <div>
                <label>Units:</label>
                <select value={settings.units} onChange={(e) => setSettings({ ...settings, units: e.target.value as Units })}>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                </select>
            </div>
        </div>
    );
}

export default UserSettings;