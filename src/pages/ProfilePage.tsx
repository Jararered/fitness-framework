import React, { useState } from "react";

import { useToast } from "../context/ToastContext.tsx";
import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import DetailedWorkoutStats from "../components/WorkoutStatisticsDetailed.tsx";

const ProfilePage: React.FC = () => {
    const { workoutLogs } = useWorkout();
    const { settings } = useUser();
    const { addToast } = useToast(); // Add toast hook
    const [expanded, setExpanded] = useState(false);

    const units = settings.unit === "metric" ? "kg" : "lbs";

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
        <div className="profile-page">
            <h1>Profile</h1>

            <div className="card">
                <h2>{settings.name || "User"}</h2>
            </div>

            <div className="card">
                <h2>Statistics</h2>
                <p>Workouts Last Week: {lastWeekLogs.length}</p>
                <p>Workouts Last Month: {lastMonthLogs.length}</p>
                <p>Total Weight Last Week: {totalWeightWeek} {units}</p>
                <p>Total Weight Last Month: {totalWeightMonth} {units}</p>
            </div>

            <div className="card">
                <h2>Recent Workouts</h2>
                <span className="workout-list">
                    {logsToShow.map((log) => (
                        <p key={log.workoutId}>
                            Workout ID: {log.workoutId} -{" "}
                            {log.startTime instanceof Date && !isNaN(log.startTime.getTime())
                                ? log.startTime.toLocaleDateString()
                                : "Invalid Date"}
                        </p>
                    ))}
                </span>
                {workoutLogs.length > 5 && !expanded && (
                    <button onClick={handleShowMore}>Show More</button>
                )}
            </div>
            <DetailedWorkoutStats />
        </div>
    );
};

export default ProfilePage;