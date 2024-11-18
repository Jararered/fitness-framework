import React, { useState, useEffect } from 'react';

// Import Components
import SectionTitle from './shared/SectionTitle';

// Import Interfaces
import { Exercise } from './Exercise';

// Import Styles
import './WorkoutInProgress.css';

interface WorkoutInProgressProps {
    onCompleteWorkout: () => void; // Callback to change the view in App.tsx
}

interface LastWeight {
    exercise: string;
    weight: number;
}

interface WorkoutState {
    exercises: Exercise[] | null;
    currentExerciseIndex: number;
    currentSetIndex: number;
    startTime: string;
}

interface WeightTracking {
    currentWeights: number[];
    maxWeights: { [key: string]: number };
    lastWeights: { [key: string]: LastWeight };
}

const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ onCompleteWorkout }) => {
    const [workoutState, setWorkoutState] = useState<WorkoutState>({
        exercises: null,
        currentExerciseIndex: 0,
        currentSetIndex: 0,
        startTime: ''
    });

    const [weightTracking, setWeightTracking] = useState<WeightTracking>({
        currentWeights: [],
        maxWeights: {},
        lastWeights: {}
    });

    useEffect(() => {
        // Load the current workout and best efforts from local storage
        const workoutData = localStorage.getItem('currentWorkout');
        if (workoutData) {
            setWorkoutState(prev => ({
                ...prev,
                exercises: JSON.parse(workoutData),
                startTime: new Date().toISOString()
            }));
        }

        // Load the best efforts from local storage
        const maxWeights = localStorage.getItem('loggedMaxWeights');
        const lastWeights = localStorage.getItem('loggedLastWeights');
        
        setWeightTracking(prev => ({
            ...prev,
            maxWeights: maxWeights ? JSON.parse(maxWeights) : {},
            lastWeights: lastWeights ? JSON.parse(lastWeights) : {}
        }));
    }, []);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
        const newWeights = [...weightTracking.currentWeights];
        newWeights[setIndex] = Number(e.target.value);
        setWeightTracking(prev => ({
            ...prev,
            currentWeights: newWeights
        }));
    };

    const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>, setIndex: number) => {
        if (workoutState.exercises) {
            const newReps = Number(e.target.value);
            const updatedExercises = workoutState.exercises.map((exercise, exerciseIndex) => {
                if (exerciseIndex === workoutState.currentExerciseIndex) {
                    const updatedSets = exercise.sets.map((set, index) => {
                        if (index === setIndex) {
                            return { ...set, reps: newReps };
                        }
                        return set;
                    });
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
            setWorkoutState(prev => ({
                ...prev,
                exercises: updatedExercises
            }));
        }
    };

    const handleNextExercise = () => {
        if (workoutState.exercises) {
            const currentExercise = workoutState.exercises[workoutState.currentExerciseIndex];
            const currentSet = currentExercise.sets[workoutState.currentSetIndex];
            const loggedWeights = JSON.parse(localStorage.getItem('loggedWeights') || '[]');
            const loggedMaxWeights = JSON.parse(localStorage.getItem('loggedMaxWeights') || '{}');
            const loggedLastWeights = JSON.parse(localStorage.getItem('loggedLastWeights') || '{}');

            const weight = weightTracking.currentWeights[workoutState.currentSetIndex] || 
                         weightTracking.maxWeights[currentExercise.name] || 0;
            if (weight > 0) {
                // Save the weight to the log
                loggedWeights.push({
                    date: new Date().toISOString(),
                    exercise: currentExercise.name,
                    reps: currentSet.reps,
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
                    exercise: currentExercise.name,
                    weight: weight
                };
                localStorage.setItem('loggedLastWeights', JSON.stringify(loggedLastWeights));
                setWeightTracking(prev => ({
                    ...prev,
                    lastWeights: {
                        ...prev.lastWeights,
                        [currentExercise.name]: {
                            exercise: currentExercise.name,
                            weight: weight
                        }
                    }
                }));

                // Assign the weight to the current set
                currentSet.weight = weight;
            }

            // Move to the next set or exercise
            if (workoutState.currentSetIndex < currentExercise.sets.length - 1) {
                // Move to the next set
                setWorkoutState(prev => ({
                    ...prev,
                    currentSetIndex: prev.currentSetIndex + 1
                }));
            } else if (workoutState.currentExerciseIndex < workoutState.exercises!.length - 1) {
                // Move to the next exercise
                setWorkoutState(prev => ({
                    ...prev,
                    currentExerciseIndex: prev.currentExerciseIndex + 1,
                    currentSetIndex: 0
                }));
                setWeightTracking(prev => ({
                    ...prev,
                    currentWeights: []
                }));
            } else {
                // Finish the workout
                completeWorkout();
            }
        }
    };

    const handleSkipExercise = () => {
        if (workoutState.exercises) {
            const currentExercise = workoutState.exercises[workoutState.currentExerciseIndex];
            // Skip the current exercise
            if (workoutState.currentSetIndex < currentExercise.sets.length - 1) {
                // Move to the next set
                setWorkoutState(prev => ({
                    ...prev,
                    currentSetIndex: prev.currentSetIndex + 1
                }));
            } else if (workoutState.currentExerciseIndex < workoutState.exercises.length - 1) {
                // Move to the next exercise
                setWorkoutState(prev => ({
                    ...prev,
                    currentExerciseIndex: prev.currentExerciseIndex + 1,
                    currentSetIndex: 0
                }));
                setWeightTracking(prev => ({
                    ...prev,
                    currentWeights: []
                }));
            } else {
                // Finish the workout
                completeWorkout();
            }
        }
    };

    const completeWorkout = () => {
        if (workoutState.exercises) {
            // Save the workout to the log
            const loggedWorkouts = JSON.parse(localStorage.getItem('loggedWorkouts') || '[]');
            const workoutEntry = {
                startTime: workoutState.startTime,
                endTime: new Date().toISOString(),
                exercises: workoutState.exercises
            };
            loggedWorkouts.push(workoutEntry);
            localStorage.setItem('loggedWorkouts', JSON.stringify(loggedWorkouts));
        }

        onCompleteWorkout(); // Call the callback to change the view
    };

    if (!workoutState.exercises || workoutState.exercises.length === 0) {
        return <p>No workout found. Please create or load a workout.</p>;
    }

    const currentExercise = workoutState.exercises[workoutState.currentExerciseIndex];
    const currentSet = currentExercise.sets[workoutState.currentSetIndex];

    return (
        <div className='main-content'>

            <SectionTitle title="Workout in Progress" />

            <div className="card">
                <h2>{currentExercise.name}</h2>

                <p>Set {workoutState.currentSetIndex + 1} of {currentExercise.sets.length}</p>
                <p>Reps: <input
                    type="number"
                    value={currentSet.reps}
                    onChange={(e) => handleRepsChange(e, workoutState.currentSetIndex)}
                    className="input-field"
                /></p>

                <input
                    type="number"
                    inputMode="numeric"
                    placeholder={weightTracking.lastWeights[currentExercise.name]?.weight.toString() || "Enter weight"}
                    value={weightTracking.currentWeights[workoutState.currentSetIndex] || ""}
                    onChange={(e) => handleWeightChange(e, workoutState.currentSetIndex)}
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
