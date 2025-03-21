import React, { useState } from "react";

import { useToast } from "../context/ToastContext.tsx";
import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

const ProfilePage: React.FC = () => {
    const { workoutLogs } = useWorkout();
    const { addToast } = useToast(); // Add toast hook
    const [expanded, setExpanded] = useState(false);
    const { settings } = useUser();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const lastWeekLogs = workoutLogs.filter((log) => log.startTime >= weekAgo);
    const lastMonthLogs = workoutLogs.filter((log) => log.startTime >= monthAgo);

    const totalWeightWeek = lastWeekLogs.reduce((sum, log) => sum + log.totalWeight, 0);
    const totalWeightMonth = lastMonthLogs.reduce((sum, log) => sum + log.totalWeight, 0);

    const logsToShow = expanded ? workoutLogs.slice(0, 20) : workoutLogs.slice(0, 5);

    const handleShowMore = () => {
        setExpanded(true);
        addToast("Showing more workout logs", "info"); // Trigger toast
    };

    return (
        <div className="profile-page page-container">
            <h1>Profile</h1>

            <div className="card">
                <div className="card-header">
                    <h2>Hi, {settings.name || "User"}</h2>
                    <p>Below is your profile information and info about your workout history.</p>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>Statistics</h2>
                    <p>Below are various statistics about your workout history.</p>
                </div>

                <div className="card-content">
                    <p>Workouts Last Week: {lastWeekLogs.length}</p>
                    <p>Workouts Last Month: {lastMonthLogs.length}</p>
                    <p>
                        Total Weekly Load: {totalWeightWeek} {settings.unit}
                    </p>
                    <p>
                        Total Monthly Load: {totalWeightMonth} {settings.unit}
                    </p>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>Recent Workouts</h2>
                    <p>Below is a list of your most recent workouts.</p>
                </div>
                <div className="card-content">
                    <div className="card-row">
                        {logsToShow.length > 0 ? (
                            logsToShow.map((log) => (
                                <div
                                    className="card-row"
                                    key={log.workoutId}
                                >
                                    <div className="card-row-item">
                                        {log.startTime instanceof Date && !isNaN(log.startTime.getTime())
                                            ? log.startTime.toLocaleDateString()
                                            : "Invalid Date"}
                                    </div>

                                    <div className="card-row-item">
                                        <div className="card-row-item-label">Workout ID:</div>
                                        <div className="card-row-item-value">{log.workoutId}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <strong>No workouts logged</strong>
                        )}
                    </div>
                    {workoutLogs.length > 5 && !expanded && <button onClick={handleShowMore}>Show More</button>}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
