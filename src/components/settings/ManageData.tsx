import { Keys } from "../../interfaces/Storage";

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

            <div>
                <button className="bad-button" onClick={handleClearUserSettings}>
                    Reset User Settings
                </button>
            </div>

            <div>
                <button className="bad-button" onClick={handleClearTimingSettings}>
                    Reset Timing Settings
                </button>
            </div>

            <div>
                <button className="bad-button" onClick={handleClearAllData}>
                    Clear All Data
                </button>
            </div>
        </div>
    );
}

export default ManageData;