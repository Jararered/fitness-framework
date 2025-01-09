import useLocalStorage, { Keys } from "../../interfaces/Storage";
import UserSettings, { DefaultUserSettings } from "../settings/UserSettings";

const UserGreeting = () => {
    const [userSettings] = useLocalStorage<UserSettings>(Keys.UserSettings, DefaultUserSettings);

    return (
        <h1>{userSettings.name ? "Welcome, " + userSettings.name : "Home"}</h1>
    );
}

export default UserGreeting;