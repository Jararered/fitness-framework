import React, { useEffect, useState } from 'react';

// Import Components
import SectionTitle from './shared/SectionTitle';

// Import Interfaces
import { Exercise } from './Exercise';

interface WorkoutOverviewProps {
    onOpenWorkout: () => void;
}

const Home: React.FC<WorkoutOverviewProps> = ({ onOpenWorkout }) => {
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const preferences = localStorage.getItem('preferences');
        if (preferences) {
            const { user } = JSON.parse(preferences);
            setUserName(user || '');
        }

        const workoutData = localStorage.getItem('currentWorkout');
        if (workoutData) {
            setCurrentWorkout(JSON.parse(workoutData));
        }
    }, []);

    return (
        <div className='main-content'>
            <SectionTitle title={userName ? `Welcome, ${userName}` : 'Home'} />
            <div className="card">
                {currentWorkout ? (
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
        </div>
    );
};

export default Home;
