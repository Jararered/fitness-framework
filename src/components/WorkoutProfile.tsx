import React, { useEffect, useState } from 'react';

import '../styles/MainContent.css';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface Workout {
    date: string;
    exercises: Exercise[];
}

const WorkoutProfile: React.FC = () => {
    const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
    const [bestEfforts, setBestEfforts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const workoutsData = localStorage.getItem('workout_history');
        if (workoutsData) {
            setRecentWorkouts(JSON.parse(workoutsData).slice(-5).reverse());
        }

        const bestEffortsData = localStorage.getItem('logged_weights_best');
        if (bestEffortsData) {
            setBestEfforts(JSON.parse(bestEffortsData));
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
                <h1>Workout Profile</h1>
            </div>

            <div className="page-container">

                <h2>Recent Workouts</h2>
                {recentWorkouts.length > 0 ? (
                    <ul>
                        {recentWorkouts.map((workout, index) => (
                            <li key={index}>
                                <strong>{formatDateTime(workout.date)}</strong>
                                <li>
                                    {workout.exercises.map((exercise, idx) => (
                                        <li key={idx}>
                                            <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                                        </li>
                                    ))}
                                </li>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent workouts found.</p>
                )}

            </div>
            <div className="page-container">

                <h2>Best Efforts</h2>
                {Object.keys(bestEfforts).length > 0 ? (
                    <ul>
                        {Object.entries(bestEfforts).map(([exercise, weight], index) => (
                            <ul key={index} className="best-effort-item">
                                <strong>{exercise}</strong>: {weight} lbs
                            </ul>
                        ))}
                    </ul>
                ) : (
                    <p>No best efforts recorded.</p>
                )}

            </div>
        </>
    );
};

export default WorkoutProfile;
