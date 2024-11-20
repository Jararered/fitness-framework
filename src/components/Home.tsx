import React, { useEffect, useState } from 'react';

// Import Components
import CurrentWorkout from './CurrentWorkout';

// Import Interfaces
import { Exercise } from './Exercise';
import { WorkoutState } from './WorkoutActive';

interface WorkoutOverviewProps {
    onOpenWorkout: () => void;
}

const Home: React.FC<WorkoutOverviewProps> = ({ onOpenWorkout }) => {
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [hasOngoingWorkout, setHasOngoingWorkout] = useState<boolean>(false);
    const [, setWorkoutState] = useState<WorkoutState | null>(null);

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

        const savedWorkoutState = localStorage.getItem('workoutState');
        if (savedWorkoutState) {
            setWorkoutState(JSON.parse(savedWorkoutState));
            setHasOngoingWorkout(true);
        }
    }, []);

    const endWorkout = () => {
        localStorage.removeItem('workoutState');
        setHasOngoingWorkout(false);
        setWorkoutState(null);
    };

    return (
        <div>
            <h1>{userName ? `Welcome, ${userName}` : 'Home'}</h1>

            <div className='column'>
                <div className="card">
                    {hasOngoingWorkout ? (
                        <div>
                            <h2>Workout in progress...</h2>
                            <div className='row'>
                                <button onClick={onOpenWorkout} className="normal-button">
                                    Resume Workout
                                </button>
                                <button onClick={endWorkout} className="bad-button">
                                    End Workout
                                </button>
                            </div>
                        </div>
                    ) : currentWorkout ? (
                        <div>
                            <CurrentWorkout currentWorkout={currentWorkout} />
                            <div className='row'>
                                <button onClick={onOpenWorkout} className="normal-button">
                                    Start Workout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>No workout selected. Please create or load a workout.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
