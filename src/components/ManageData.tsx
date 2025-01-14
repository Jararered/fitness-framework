import { Keys } from "../interfaces/Storage";

const ManageData = () => {

    const handleClearUserSettings = () => {
        localStorage.removeItem(Keys.UserSettings);
        window.location.reload();
    }

    const handleClearTimingSettings = () => {
        localStorage.removeItem(Keys.TimingSettings);
        window.location.reload();
    }

    const handleClearAllData = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="manage-data">
            <h2>Manage Data</h2>

            <div className="flex">
                <button className="bad" onClick={handleClearUserSettings}>
                    Reset User Settings
                </button>

                <button className="bad" onClick={handleClearTimingSettings}>
                    Reset Timing Settings
                </button>

                <button className="bad" onClick={handleClearAllData}>
                    Clear All Data
                </button>
            </div>
        </div>
    );
}

export default ManageData;