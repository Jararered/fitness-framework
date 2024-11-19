import React, { useState, useEffect } from 'react';
import SectionTitle from './shared/SectionTitle';
import { Exercise } from './Exercise';
import WorkoutBreak from './WorkoutBreak';

interface WorkoutInProgressProps {
    onCompleteWorkout: () => void;
}

interface LastWeight {
    exercise: string;
    weight: number;
}

export interface WorkoutState {
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

    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        const loadFromLocalStorage = (key: string, defaultValue: any) => {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        };

        const workoutData = loadFromLocalStorage('currentWorkout', null);
        const savedWorkoutState = loadFromLocalStorage('workoutState', {});
        const maxWeights = loadFromLocalStorage('loggedMaxWeights', {});
        const lastWeights = loadFromLocalStorage('loggedLastWeights', {});

        if (workoutData) {
            setWorkoutState(prev => ({
                ...prev,
                exercises: workoutData,
                ...savedWorkoutState,
                startTime: new Date().toISOString()
            }));
        }

        setWeightTracking(prev => ({
            ...prev,
            maxWeights,
            lastWeights
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

    const logWeight = (currentExercise: Exercise, currentSet: any, weight: number) => {
        const loggedWeights = JSON.parse(localStorage.getItem('loggedWeights') || '[]');
        const loggedMaxWeights = JSON.parse(localStorage.getItem('loggedMaxWeights') || '{}');
        const loggedLastWeights = JSON.parse(localStorage.getItem('loggedLastWeights') || '{}');

        loggedWeights.push({
            date: new Date().toISOString(),
            exercise: currentExercise.name,
            reps: currentSet.reps,
            weight: weight,
        });
        localStorage.setItem('loggedWeights', JSON.stringify(loggedWeights));

        if (!loggedMaxWeights[currentExercise.name] || weight > loggedMaxWeights[currentExercise.name].weight) {
            loggedMaxWeights[currentExercise.name] = {
                weight: weight,
                date: new Date().toISOString(),
            };
            localStorage.setItem('loggedMaxWeights', JSON.stringify(loggedMaxWeights));
        }

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
    };

    const handleNextExercise = () => {
        if (workoutState.exercises) {
            const currentExercise = workoutState.exercises[workoutState.currentExerciseIndex];
            const currentSet = currentExercise.sets[workoutState.currentSetIndex];
            const weight = weightTracking.currentWeights[workoutState.currentSetIndex] ||
                weightTracking.lastWeights[currentExercise.name]?.weight || 0;

            if (weight > 0) {
                logWeight(currentExercise, currentSet, weight);
                currentSet.weight = weight;
            }

            let newWorkoutState = { ...workoutState };
            if (workoutState.currentSetIndex < currentExercise.sets.length - 1) {
                newWorkoutState.currentSetIndex += 1;
            } else if (workoutState.currentExerciseIndex < workoutState.exercises.length - 1) {
                newWorkoutState.currentExerciseIndex += 1;
                newWorkoutState.currentSetIndex = 0;
                setWeightTracking(prev => ({
                    ...prev,
                    currentWeights: []
                }));
            } else {
                completeWorkout();
                return;
            }
            setWorkoutState(newWorkoutState);
            localStorage.setItem('workoutState', JSON.stringify(newWorkoutState));
            setIsBreak(true);
        }
    };

    const handleSkipExercise = () => {
        if (workoutState.exercises) {
            let newWorkoutState = { ...workoutState };
            if (workoutState.currentSetIndex < workoutState.exercises[workoutState.currentExerciseIndex].sets.length - 1) {
                newWorkoutState.currentSetIndex += 1;
            } else if (workoutState.currentExerciseIndex < workoutState.exercises.length - 1) {
                newWorkoutState.currentExerciseIndex += 1;
                newWorkoutState.currentSetIndex = 0;
                setWeightTracking(prev => ({
                    ...prev,
                    currentWeights: []
                }));
            } else {
                completeWorkout();
                return;
            }
            setWorkoutState(newWorkoutState);
            localStorage.setItem('workoutState', JSON.stringify(newWorkoutState));
        }
    };

    const completeWorkout = () => {
        if (workoutState.exercises) {
            const loggedWorkouts = JSON.parse(localStorage.getItem('loggedWorkouts') || '[]');
            const workoutEntry = {
                startTime: workoutState.startTime,
                endTime: new Date().toISOString(),
                exercises: workoutState.exercises
            };
            loggedWorkouts.push(workoutEntry);
            localStorage.setItem('loggedWorkouts', JSON.stringify(loggedWorkouts));
        }

        localStorage.removeItem('workoutState');
        onCompleteWorkout();
    };

    if (!workoutState.exercises || workoutState.exercises.length === 0) {
        return <p>No workout found. Please create or load a workout.</p>;
    }

    const currentExercise = workoutState.exercises[workoutState.currentExerciseIndex];
    const currentSet = currentExercise.sets[workoutState.currentSetIndex];

    return (
        <div className='main-content'>
            <SectionTitle title="Workout in Progress" />
            {isBreak ? (
                <WorkoutBreak duration={60} onBreakEnd={() => setIsBreak(false)} onSkip={() => setIsBreak(false)} />
            ) : (
                <div className='vertical-section'>
                    <div className="card">
                        <h2>{currentExercise.name}</h2>
                        <p>Set {workoutState.currentSetIndex + 1} of {currentExercise.sets.length}</p>
                        <p>Reps: </p>
                        <input
                            type="number"
                            value={currentSet.reps}
                            onChange={(e) => handleRepsChange(e, workoutState.currentSetIndex)}
                            className="input-field"
                        />
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
            )}
        </div>
    );
};

export default WorkoutInProgress;
