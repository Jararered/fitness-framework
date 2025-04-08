import React, { useState } from "react";

import { useWorkoutStore } from "../features/workouts/hooks/useWorkoutStore.ts";
import { useSettingStore } from "../features/settings/hooks/useSettingStore.ts";

import { Card } from "../features/layout/components/Card.tsx";

export const ProfileRecentWorkouts = () => {
    const { workoutLogs } = useWorkoutStore();
    const [expanded, setExpanded] = useState(false);

    const logsToShow = expanded ? workoutLogs.slice(0, 20) : workoutLogs.slice(0, 5);

    const handleShowMore = () => {
        setExpanded(true);
    };

    return (
        <div className="card-container">
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
    );
};

const ProfilePage: React.FC = () => {
    const { name } = useSettingStore();

    return (
        <div className="profile-page page-container">
            <h1>Profile</h1>

            <Card
                title={`Hi, ${name || "User"}`}
                description="Below is your profile information and info about your workout history."
            />

            <ProfileRecentWorkouts />
        </div>
    );
};

export default ProfilePage;
