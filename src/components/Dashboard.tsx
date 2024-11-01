import React, { useState, useEffect } from 'react';
import './CommonStyles.css';

interface Workout {
    date: string;
    exercise: string;
    sets: number;
    reps: number;
    weight: number;
}

const Dashboard: React.FC = () => {
    const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const storedWorkouts = localStorage.getItem('recentWorkouts');
        if (storedWorkouts) {
            setRecentWorkouts(JSON.parse(storedWorkouts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('recentWorkouts', JSON.stringify(recentWorkouts));
    }, [recentWorkouts]);

    return (
        <div className="page-container">
            <h1>Dashboard</h1>
            <section>
                <h2>Recent Workouts</h2>
                <ul>
                    {recentWorkouts.map((workout, index) => (
                        <li key={index}>
                            <strong>{workout.date}</strong>: {workout.exercise} - {workout.sets} sets of {workout.reps} reps at {workout.weight} lbs
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
