import React, { useEffect, useState } from 'react';

import '../styles/Button.css'

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface WorkoutOverviewProps {
    gym: string | null;
    onOpenWorkout: () => void;
}

const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({ onOpenWorkout }) => {
    const [hasCurrentWorkout, setHasCurrentWorkout] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);

    useEffect(() => {
        const workoutData = localStorage.getItem('currentWorkout');
        if (workoutData) {
            setCurrentWorkout(JSON.parse(workoutData));
            setHasCurrentWorkout(true);
        }
    }, []);

    return (
        <>
            <div className="page-title">
                <h1>Workout Overview</h1>
            </div>

            <div className="page-container">
                {hasCurrentWorkout && currentWorkout ? (
                    <div>
                        <h2>Current Workout</h2>

                        <ul className="workout-list">
                            {currentWorkout.map((exercise, index) => (
                                <li key={index} className="workout-item">
                                    <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                                </li>
                            ))}
                        </ul>

                        <button onClick={onOpenWorkout} className="normal-button">
                            Start Workout
                        </button>
                    </div>
                ) : (
                    <p>No workout selected. Please create or load a workout.</p>
                )}
            </div>
        </>
    );
};

export default WorkoutOverview;
