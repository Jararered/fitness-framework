import React, { useEffect, useState } from 'react';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface Workout {
    date: string;
    exercises: Exercise[];
}

interface WorkoutOverviewProps {
    gym: string | null;
    onOpenWorkout: () => void;
}

const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({ gym, onOpenWorkout }) => {
    const [hasCurrentWorkout, setHasCurrentWorkout] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
    const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const workoutData = localStorage.getItem('currentWorkout');
        if (workoutData) {
            setCurrentWorkout(JSON.parse(workoutData));
            setHasCurrentWorkout(true);
        }

        const workoutsData = localStorage.getItem('workout_history');
        if (workoutsData) {
            setRecentWorkouts(JSON.parse(workoutsData).slice(-5).reverse());
        }
    }, []);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <>
            <div className="page-title">
                <h1>Workout Overview</h1>
            </div>

            <div className="page-container">
                <p>Gym: {gym || 'No gym selected'}</p>

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
                        <button onClick={onOpenWorkout} className="action-button">
                            Start Workout
                        </button>
                    </div>
                ) : (
                    <p>No workout selected. Please create or load a workout.</p>
                )}
            </div>

            <div className="page-title">
                <h1>Recent Workouts</h1>
            </div>

            <div className="page-container">
                {recentWorkouts.length > 0 ? (
                    <ul className="recent-workouts-list">
                        {recentWorkouts.map((workout, index) => (
                            <li key={index} className="recent-workout-item">
                                <strong>{formatDateTime(workout.date)}</strong>
                                <ul>
                                    {workout.exercises.map((exercise, idx) => (
                                        <li key={idx}>
                                            {exercise.name}: {exercise.sets} sets of {exercise.reps} reps
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent workouts found.</p>
                )}
            </div>
        </>
    );
};

export default WorkoutOverview;
