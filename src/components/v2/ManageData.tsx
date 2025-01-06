const ManageData = () => {

    const handleClearUserPreferences = () => {
        localStorage.removeItem('user-preferences');
        window.location.reload();
    }

    const handleClearTimingPreferences = () => {
        localStorage.removeItem('timing-preferences');
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
                <button className="bad-button" onClick={handleClearUserPreferences}>
                    Reset User Preferences
                </button>
            </div>

            <div>
                <button className="bad-button" onClick={handleClearTimingPreferences}>
                    Reset Timing Preferences
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