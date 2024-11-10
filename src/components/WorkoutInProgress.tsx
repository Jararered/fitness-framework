import React, { useState, useEffect } from 'react';

// Import Components
import SectionTitle from './buttons/SectionTitle';

// Import Interfaces
import { Exercise } from './Exercise';

// Import Styles
import './WorkoutInProgress.css';

interface WorkoutInProgressProps {
    onCompleteWorkout: () => void; // Callback to change the view in App.tsx
}

const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ onCompleteWorkout }) => {
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [weights, setWeights] = useState<number[]>([]);
    const [maxWeights, setMaxWeights] = useState<{ [key: string]: number }>({});
    const [lastWeights, setLastWeights] = useState<{ [key: string]: number }>({});
    const [startTime, setStartTime] = useState<string>('');

    useEffect(() => {
        // Load the current workout and best efforts from local storage
        const workoutData = localStorage.getItem('currentWorkout');
        if (workoutData) {
            setCurrentWorkout(JSON.parse(workoutData));
            // Set the start time when workout is loaded
            setStartTime(new Date().toISOString());
        }

        // Load the best efforts from local storage
        const maxWeights = localStorage.getItem('loggedMaxWeights');
        if (maxWeights) {
            setMaxWeights(JSON.parse(maxWeights));
        }

        // Load the last weights from local storage
        const lastWeights = localStorage.getItem('loggedLastWeights');
        if (lastWeights) {
            setLastWeights(JSON.parse(lastWeights));
        }
    }, []);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
        const newWeights = [...weights];
        newWeights[setIndex] = Number(e.target.value);
        setWeights(newWeights);
    };

    const handleNextExercise = () => {
        if (currentWorkout) {
            const currentExercise = currentWorkout[currentExerciseIndex];
            const loggedWeights = JSON.parse(localStorage.getItem('loggedWeights') || '[]');
            const loggedMaxWeights = JSON.parse(localStorage.getItem('loggedMaxWeights') || '{}');
            const loggedLastWeights = JSON.parse(localStorage.getItem('loggedLastWeights') || '{}');

            const weight = weights[currentSetIndex] || maxWeights[currentExercise.name] || 0;
            if (weight > 0) {
                // Save the weight to the log
                loggedWeights.push({
                    date: new Date().toISOString(),
                    exercise: currentExercise.name,
                    reps: currentExercise.reps,
                    weight: weight,
                });
                localStorage.setItem('loggedWeights', JSON.stringify(loggedWeights));

                // Update the best effort if this is a new best
                if (!loggedMaxWeights[currentExercise.name] || weight > loggedMaxWeights[currentExercise.name].weight) {
                    loggedMaxWeights[currentExercise.name] = {
                        weight: weight,
                        date: new Date().toISOString(),
                    };
                    localStorage.setItem('loggedMaxWeights', JSON.stringify(loggedMaxWeights));
                }

                // Update the last weight
                loggedLastWeights[currentExercise.name] = {
                    weight: weight,
                    date: new Date().toISOString(),
                };
                localStorage.setItem('loggedLastWeights', JSON.stringify(loggedLastWeights));
                setLastWeights(prevState => ({
                    ...prevState,
                    [currentExercise.name]: weight
                }));
            }

            // Move to the next set or exercise
            if (currentSetIndex < currentExercise.sets - 1) {
                // Move to the next set
                setCurrentSetIndex(currentSetIndex + 1);
            } else if (currentExerciseIndex < currentWorkout.length - 1) {
                // Move to the next exercise
                setCurrentExerciseIndex(currentExerciseIndex + 1);
                // Reset the set index and weights
                setCurrentSetIndex(0);
                setWeights([]);
            } else {
                // Finish the workout
                completeWorkout();
            }
        }
    };

    const handleSkipExercise = () => {
        if (currentWorkout) {
            // Skip the current exercise
            if (currentSetIndex < currentWorkout[currentExerciseIndex].sets - 1) {
                // Move to the next set
                setCurrentSetIndex(currentSetIndex + 1);
            } else if (currentExerciseIndex < currentWorkout.length - 1) {
                // Move to the next exercise
                setCurrentExerciseIndex(currentExerciseIndex + 1);
                // Reset the set index and weights
                setCurrentSetIndex(0);
                setWeights([]);
            } else {
                // Finish the workout
                completeWorkout();
            }
        }
    };

    const completeWorkout = () => {
        if (currentWorkout) {
            // Save the workout to the log
            const loggedWorkouts = JSON.parse(localStorage.getItem('loggedWorkouts') || '[]');
            const workoutEntry = {
                startTime: startTime,
                endTime: new Date().toISOString(),
                exercises: currentWorkout
            };
            loggedWorkouts.push(workoutEntry);
            localStorage.setItem('loggedWorkouts', JSON.stringify(loggedWorkouts));
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

                <input
                    type="number"
                    placeholder={maxWeights[currentExercise.name] ? `${maxWeights[currentExercise.name]}` : "Weight"}
                    value={weights[currentSetIndex] || ""}
                    onChange={(e) => handleWeightChange(e, currentSetIndex)}
                    className="input-field"
                />

                <div className="button-row">
                    <button className="bad-button" onClick={handleSkipExercise}>
                        Skip
                    </button>

                    <button className="normal-button" onClick={handleNextExercise}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutInProgress;
