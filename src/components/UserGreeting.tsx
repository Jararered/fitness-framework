import LocalStorage, { Keys } from "../interfaces/Storage";
import UserSettings, { DefaultUserSettings } from "./UserSettings";

const UserGreeting = () => {
    const [userSettings] = LocalStorage<UserSettings>(Keys.UserSettings, DefaultUserSettings);

    return (
        <h1>{userSettings.name ? "Welcome, " + userSettings.name : "Home"}</h1>
    );
}

export default UserGreeting;