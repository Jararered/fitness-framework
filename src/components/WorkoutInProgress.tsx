import React, { useState, useEffect } from 'react';

import './WorkoutInProgress.css';
import SectionTitle from './buttons/SectionTitle';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface WorkoutInProgressProps {
    onCompleteWorkout: () => void; // Callback to change the view in App.tsx
}

const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ onCompleteWorkout }) => {
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [weights, setWeights] = useState<number[]>([]);
    const [bestEfforts, setBestEfforts] = useState<{ [key: string]: number }>({});
    const [totalLoad, setTotalLoad] = useState(0);

    useEffect(() => {
        const workoutData = localStorage.getItem('currentWorkout');
        if (workoutData) {
            setCurrentWorkout(JSON.parse(workoutData));
        }

        const bestEffortsData = localStorage.getItem('logged_weights_best');
        if (bestEffortsData) {
            setBestEfforts(JSON.parse(bestEffortsData));
        }
    }, []);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
        const newWeights = [...weights];
        newWeights[setIndex] = Number(e.target.value);
        setWeights(newWeights);
    };

    const handleCompleted = () => {
        if (currentWorkout) {
            const currentExercise = currentWorkout[currentExerciseIndex];
            const loggedWeights = JSON.parse(localStorage.getItem('logged_weights') || '[]');
            const loggedWeightsBest = JSON.parse(localStorage.getItem('logged_weights_best') || '{}');

            const weight = weights[currentSetIndex] || bestEfforts[currentExercise.name] || 0;
            if (weight > 0) {
                const load = currentExercise.reps * weight;
                setTotalLoad(totalLoad + load);

                loggedWeights.push({
                    exercise: currentExercise.name,
                    reps: currentExercise.reps,
                    weight: weight,
                });
                localStorage.setItem('logged_weights', JSON.stringify(loggedWeights));

                if (!loggedWeightsBest[currentExercise.name] || weight > loggedWeightsBest[currentExercise.name]) {
                    loggedWeightsBest[currentExercise.name] = weight;
                    localStorage.setItem('logged_weights_best', JSON.stringify(loggedWeightsBest));
                }
            }

            if (currentSetIndex < currentExercise.sets - 1) {
                setCurrentSetIndex(currentSetIndex + 1);
            } else if (currentExerciseIndex < currentWorkout.length - 1) {
                setCurrentExerciseIndex(currentExerciseIndex + 1);
                setCurrentSetIndex(0);
                setWeights([]);
            } else {
                completeWorkout();
            }
        }
    };

    const handleSkip = () => {
        if (currentWorkout) {
            if (currentSetIndex < currentWorkout[currentExerciseIndex].sets - 1) {
                setCurrentSetIndex(currentSetIndex + 1);
            } else if (currentExerciseIndex < currentWorkout.length - 1) {
                setCurrentExerciseIndex(currentExerciseIndex + 1);
                setCurrentSetIndex(0);
                setWeights([]);
            } else {
                completeWorkout();
            }
        }
    };

    const completeWorkout = () => {
        if (currentWorkout) {
            const workoutHistory = JSON.parse(localStorage.getItem('workout_history') || '[]');
            const workoutEntry = {
                date: new Date().toISOString(),
                exercises: currentWorkout,
            };
            workoutHistory.push(workoutEntry);
            localStorage.setItem('workout_history', JSON.stringify(workoutHistory));

            const totalLoadHistory = JSON.parse(localStorage.getItem('total_load_history') || '[]');
            const totalLoadEntry = {
                date: new Date().toISOString(),
                totalLoad: totalLoad,
            };
            totalLoadHistory.push(totalLoadEntry);
            localStorage.setItem('total_load_history', JSON.stringify(totalLoadHistory));
        }

        onCompleteWorkout(); // Call the callback to change the view
    };

    if (!currentWorkout || currentWorkout.length === 0) {
        return <p>No workout found. Please create or load a workout.</p>;
    }

    const currentExercise = currentWorkout[currentExerciseIndex];

    return (
        <div className='main-content'>

            <SectionTitle title="Workout in Progress" />

            <div className="card">
                <h2>{currentExercise.name}</h2>
                
                <p>Set {currentSetIndex + 1} of {currentExercise.sets}</p>
                <p>Reps: {currentExercise.reps}</p>
                <p>Total Load: {totalLoad} lbs</p>

                <input
                    type="number"
                    placeholder={bestEfforts[currentExercise.name] ? `${bestEfforts[currentExercise.name]}` : "Weight"}
                    value={weights[currentSetIndex] || ""}
                    onChange={(e) => handleWeightChange(e, currentSetIndex)}
                    className="input-field"
                />

                <div className="button-row">
                    <button className="bad-button" onClick={handleSkip}>
                        Skip
                    </button>

                    <button className="normal-button" onClick={handleCompleted}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutInProgress;
