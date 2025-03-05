import React, { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";

const ProfilePage: React.FC = () => {
    const { settings, workoutLogs } = useWorkout();
    const [expanded, setExpanded] = useState(false);

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const lastWeekLogs = workoutLogs.filter((log) => log.startTime >= weekAgo);
    const lastMonthLogs = workoutLogs.filter((log) => log.startTime >= monthAgo);

    const totalWeightWeek = lastWeekLogs.reduce((sum, log) => sum + log.totalWeight, 0);
    const totalWeightMonth = lastMonthLogs.reduce((sum, log) => sum + log.totalWeight, 0);

    const logsToShow = expanded ? workoutLogs.slice(0, 20) : workoutLogs.slice(0, 5);

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="card">
                <h2>{settings.name || "User"}</h2>
            </div>
            <div className="card">
                <h2>Statistics</h2>
                <p>Workouts Last Week: {lastWeekLogs.length}</p>
                <p>Workouts Last Month: {lastMonthLogs.length}</p>
                <p>Total Weight Last Week: {totalWeightWeek} {settings.unit}</p>
                <p>Total Weight Last Month: {totalWeightMonth} {settings.unit}</p>
            </div>
            <div className="card">
                <h2>Recent Workouts</h2>
                <ul>
                    {logsToShow.map((log) => (
                        <li key={log.workoutId}>
                            Workout ID: {log.workoutId} -{" "}
                            {log.startTime instanceof Date && !isNaN(log.startTime.getTime())
                                ? log.startTime.toLocaleDateString()
                                : "Invalid Date"}
                        </li>
                    ))}
                </ul>
                {workoutLogs.length > 5 && !expanded && (
                    <button onClick={() => setExpanded(true)}>Show More</button>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;