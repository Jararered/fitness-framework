import React, { useEffect, useState } from 'react';
import SectionTitle from './buttons/SectionTitle';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface WorkoutOverviewProps {
    gym: string | null;
    onOpenWorkout: () => void;
}

const Home: React.FC<WorkoutOverviewProps> = ({ onOpenWorkout }) => {
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
        <div className='main-content'>
            <SectionTitle title="Home" />
            <div className="card">
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
        </div>
    );
};

export default Home;
