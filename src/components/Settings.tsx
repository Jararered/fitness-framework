import React from 'react';
import './CommonStyles.css';

const Settings: React.FC = () => {
    const handleClearData = () => {
        const firstConfirmation = window.confirm("Are you sure you want to clear all saved data?");
        if (firstConfirmation) {
            const secondConfirmation = window.confirm("This action is irreversible. Do you really want to proceed?");
            if (secondConfirmation) {
                localStorage.clear();
                alert("All data has been cleared.");
                window.location.reload(); // Reload the page
            }
        }
    };

    return (
        <>
            <div className="page-title">
                <h1>Settings</h1>
            </div>
            <div className="page-container">
                <section>
                    <div className="center-container">
                        <button onClick={handleClearData} className="action-button warning">
                            Clear All Data
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Settings;
