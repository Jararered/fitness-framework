import useLocalStorage, { Keys } from "../../interfaces/Storage";

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
    const [settingsState, setSettingsState] = useLocalStorage<UserSettings>(Keys.UserSettings, DefaultUserSettings);

    return (
        <div className="user-settings">
            <h2>User Settings</h2>
            <div>
                <label>User:</label>
                <input type="text" value={settingsState.name} onChange={(e) => setSettingsState({ ...settingsState, name: e.target.value })}
                />
            </div>

            <div>
                <label>Weight:</label>
                <input type="number" value={settingsState.weight} onChange={(e) => setSettingsState({ ...settingsState, weight: parseFloat(e.target.value) })} />
            </div>

            <div>
                <label>Units:</label>
                <select value={settingsState.units} onChange={(e) => setSettingsState({ ...settingsState, units: e.target.value as Units })}>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                </select>
            </div>
        </div>
    );
}

export default UserSettings;