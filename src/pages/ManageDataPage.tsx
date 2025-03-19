import React from "react";

import { LuTrash } from "react-icons/lu";

const handlePromptDeleteData = (handleDelete: () => void) => {
    const confirm = window.confirm("Are you sure you sure you want to delete this data? This action is irreversible.");
    if (confirm) {
        handleDelete();
    }
};

const handleDeleteAllData = () => {
    localStorage.clear();
    window.location.reload();
};

const handleDeleteGyms = () => {
    localStorage.removeItem("equipment-configs");
    localStorage.removeItem("equipment-last");
    window.location.reload();
};

const handleDeleteUserData = () => {
    localStorage.removeItem("user-context");
    localStorage.removeItem("workout-logs");
    window.location.reload();
};

const handleDeleteWorkouts = () => {
    localStorage.removeItem("workout-plans");
    localStorage.removeItem("workout-state");
    window.location.reload();
};

const ManageDataPage: React.FC = () => {
    return (
        <div className="settings-page">
            <h1>Manage Data</h1>

            <div className="card">
                <div className="card-header">
                    <h2>Delete All Gyms</h2>
                    <p>This will delete all saved gyms from the app. This action is irreversible.</p>
                </div>

                <div className="card-content">
                    <button
                        className="caution"
                        onClick={() => handlePromptDeleteData(handleDeleteGyms)}
                    >
                        Delete All Gyms
                        <LuTrash />
                    </button>
                </div>

                <hr />

                <div className="card-header">
                    <h2>Delete All Workouts</h2>
                    <p>This will delete all saved workouts from the app. This action is irreversible.</p>
                </div>

                <div className="card-content">
                    <button
                        className="caution"
                        onClick={() => handlePromptDeleteData(handleDeleteWorkouts)}
                    >
                        Delete All Workouts
                        <LuTrash />
                    </button>
                </div>

                <hr />

                <div className="card-header">
                    <h2>Delete All User Data</h2>
                    <p>
                        This will delete all user data from the app, including settings and workout logs. This action is
                        irreversible.
                    </p>
                </div>

                <div className="card-content">
                    <button
                        className="caution"
                        onClick={() => handlePromptDeleteData(handleDeleteUserData)}
                    >
                        Delete All User Data
                        <LuTrash />
                    </button>
                </div>

                <hr />

                <div className="card-header">
                    <h2>Delete All Data</h2>
                    <p>
                        This will delete all data from the app. This is a full reset of the app. This action is
                        irreversible.
                    </p>
                </div>

                <div className="card-content">
                    <button
                        className="caution"
                        onClick={() => handlePromptDeleteData(handleDeleteAllData)}
                    >
                        Delete All Data
                        <LuTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageDataPage;
