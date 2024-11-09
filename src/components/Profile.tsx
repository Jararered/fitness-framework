import React, { useEffect, useState } from 'react';
import SectionTitle from './buttons/SectionTitle';
import { Exercise } from './Workout';

const WorkoutProfile: React.FC = () => {
    const [bestWeights, setBestWeights] = useState<{ [key: string]: { weight: number, date: string } }>({});
    const [recentWorkouts, setRecentWorkouts] = useState<{ date: string, exercises: Exercise[] }[]>([]);

    useEffect(() => {
        const bestWeightsData = localStorage.getItem('loggedBestWeights');
        if (bestWeightsData) {
            setBestWeights(JSON.parse(bestWeightsData));
        }

        const loggedWorkoutsData = localStorage.getItem('loggedWorkouts');
        if (loggedWorkoutsData) {
            const workouts = JSON.parse(loggedWorkoutsData);
            setRecentWorkouts(workouts.slice(-5).reverse());
        }
    }, []);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="main-content">
            <SectionTitle title="Profile" />

            <div className="card">
                <h2>Recent Workouts</h2>
                <ul>
                    {recentWorkouts.length === 0 ? (
                        <p>No recent workouts logged yet.</p>
                    ) : (
                        recentWorkouts.map((workout, index) => (
                            <li key={index}>
                                <strong>{formatDateTime(workout.date)}</strong>
                                <ul>
                                    {workout.exercises.map((exercise, idx) => (
                                        <li key={idx}>{exercise.name}: {exercise.sets} sets of {exercise.reps} reps</li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            
            <div className="card">
                <h2>Best Weights</h2>
                <ul>
                    {Object.keys(bestWeights).length === 0 ? (
                        <p>No best weights logged yet.</p>
                    ) : (
                        Object.entries(bestWeights).map(([exercise, { weight, date }]) => (
                            <li key={exercise}>
                                <strong>{exercise}</strong>: {weight} lbs on {formatDateTime(date)}
                            </li>
                        ))
                    )}
                </ul>
            </div>

        </div>
    );
};

export default WorkoutProfile;
