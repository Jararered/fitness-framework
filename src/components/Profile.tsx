import React, { useEffect, useState } from 'react';

// Import Components
import SectionTitle from './shared/SectionTitle';

// Import Interfaces
import { Exercise } from './Exercise';

import './shared/Card.css'

const WorkoutProfile: React.FC = () => {
    const [bestWeights, setBestWeights] = useState<{ [key: string]: { weight: number, date: string } }>({});
    const [recentWorkouts, setRecentWorkouts] = useState<{ startTime: string, endTime: string, exercises: Exercise[] }[]>([]);
    const [units, setUnits] = useState<'lbs' | 'kg'>('lbs');

    useEffect(() => {
        // Load the best weights and recent workouts from local storage
        const bestWeightsData = localStorage.getItem('loggedMaxWeights');
        if (bestWeightsData) {
            setBestWeights(JSON.parse(bestWeightsData));
        }

        // Load preferences
        const preferences = localStorage.getItem('preferences');
        if (preferences) {
            // Parse the preferences and set the units locally
            const { units: savedUnits } = JSON.parse(preferences);
            setUnits(savedUnits);
        }

        // Load the recent workouts from local storage
        const loggedWorkouts = localStorage.getItem('loggedWorkouts');
        if (loggedWorkouts) {
            const workouts = JSON.parse(loggedWorkouts);
            // Show the last 5 workouts
            setRecentWorkouts(workouts.slice(-5).reverse());
        }
    }, []);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="profile">
            <SectionTitle title="Profile" />
            <div className='vertical-section'>
                <div className="card">
                    <h2>Recent Workouts</h2>
                    <ul>
                        {recentWorkouts.length === 0 ? (
                            <p>No recent workouts logged yet.</p>
                        ) : (
                            recentWorkouts.map((workout, index) => (
                                <li key={index}>
                                    <strong>Completed On: {formatDateTime(workout.endTime)}</strong>
                                    <ul>
                                        {workout.exercises.map((exercise, idx) => (
                                            <li key={idx}>
                                                <strong>{exercise.name}</strong>: {exercise.sets.map((set, setIndex) => (
                                                    <span key={setIndex}>{set.reps} x {set.weight || 0} lbs{setIndex < exercise.sets.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </li>
                                        ))}
                                    </ul>
                                    <br></br>
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
                                    <strong>{exercise}</strong>: {weight}{units} on {formatDateTime(date)}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WorkoutProfile;
