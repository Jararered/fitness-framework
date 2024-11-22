import React, { useState, useEffect } from 'react';

import WorkoutSummary from './WorkoutSummary';
import WorkoutFreestyle from './WorkoutFreestyle';
import WorkoutBreak from './WorkoutBreak';

import { Exercise, WorkoutInProgressProps, Workout, WeightTracking, WorkoutIndexer } from '../interfaces/Workout';

const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ onCompleteWorkout }) => {
    const [workoutState, setWorkoutState] = useState<Workout>({
        exercises: null,
        startTime: '',
        endTime: '',
    });

    const [weightTracking, setWeightTracking] = useState<WeightTracking>({
        currentWeights: [],
        maxWeights: {},
        lastWeights: {}
    });

    const [workoutIndexer, setWorkoutIndexer] = useState<WorkoutIndexer>({
        currentExerciseIndex: 0,
        currentSetIndex: 0,
    });

    const [isBreak, setIsBreak] = useState(() => {
        const savedIsBreak = localStorage.getItem('isBreak');
        return savedIsBreak ? JSON.parse(savedIsBreak) : false;
    });

    const [isComplete, setIsComplete] = useState(false);
    const [isFreestyle, setIsFreestyle] = useState(false);

    useEffect(() => {
        const loadFromLocalStorage = (key: string, defaultValue: any) => {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        };

        const workoutData = loadFromLocalStorage('currentWorkout', null);
        const savedWorkoutState = loadFromLocalStorage('workoutState', {});
        const maxWeights = loadFromLocalStorage('loggedMaxWeights', {});
        const lastWeights = loadFromLocalStorage('loggedLastWeights', {});
        const savedIsBreak = localStorage.getItem('isBreak');

        if (savedIsBreak) {
            setIsBreak(JSON.parse(savedIsBreak));

            const breakStartTime = Number(localStorage.getItem('breakStartTime'));
            const preferences = loadFromLocalStorage('preferences', {});
            const normalRest = preferences.normalRest || 60;
            const elapsed = (Date.now() - breakStartTime) / 1000;

            if (elapsed >= normalRest) {
                handleBreakEnd();
            }
        }

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

    useEffect(() => {
        localStorage.setItem('isBreak', JSON.stringify(isBreak));
    }, [isBreak]);

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
                if (exerciseIndex === workoutIndexer.currentExerciseIndex) {
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
            const currentExercise = workoutState.exercises[workoutIndexer.currentExerciseIndex];
            const currentSet = currentExercise.sets[workoutIndexer.currentSetIndex];
            const weight = weightTracking.currentWeights[workoutIndexer.currentSetIndex] ||
                weightTracking.lastWeights[currentExercise.name]?.weight || 0;

            if (weight > 0) {
                logWeight(currentExercise, currentSet, weight);
                currentSet.weight = weight;
            }

            let newWorkoutIndexer = { ...workoutIndexer };
            if (workoutIndexer.currentSetIndex < currentExercise.sets.length - 1) {
                newWorkoutIndexer.currentSetIndex += 1;
            } else if (workoutIndexer.currentExerciseIndex < workoutState.exercises.length - 1) {
                newWorkoutIndexer.currentExerciseIndex += 1;
                newWorkoutIndexer.currentSetIndex = 0;
                setWeightTracking(prev => ({
                    ...prev,
                    currentWeights: []
                }));
            } else {
                setIsComplete(true);
                return;
            }
            setWorkoutIndexer(newWorkoutIndexer);
            localStorage.setItem('workoutIndexer', JSON.stringify(newWorkoutIndexer));
            setIsBreak(true);
            localStorage.setItem('isBreak', JSON.stringify(true));
        }
    };

    const handleSkipExercise = () => {
        if (workoutState.exercises) {
            let newWorkoutIndexer = { ...workoutIndexer };
            if (workoutIndexer.currentSetIndex < workoutState.exercises[workoutIndexer.currentExerciseIndex].sets.length - 1) {
                newWorkoutIndexer.currentSetIndex += 1;
            } else if (workoutIndexer.currentExerciseIndex < workoutState.exercises.length - 1) {
                newWorkoutIndexer.currentExerciseIndex += 1;
                newWorkoutIndexer.currentSetIndex = 0;
                setWeightTracking(prev => ({
                    ...prev,
                    currentWeights: []
                }));
            } else {
                completeWorkout();
                return;
            }
            setWorkoutIndexer(newWorkoutIndexer);
            localStorage.setItem('workoutIndexer', JSON.stringify(newWorkoutIndexer));
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
        localStorage.removeItem('currentWorkout');
        onCompleteWorkout();
    };

    const handleBreakEnd = () => {
        setIsBreak(false);
        localStorage.removeItem('isBreak');
        localStorage.removeItem('breakStartTime');
    };

    const handleStartFreestyle = () => {
        if (workoutState.exercises) {
            const completedExercises = workoutState.exercises.slice(0, workoutIndexer.currentExerciseIndex + 1);
            setWorkoutState(prev => ({
                ...prev,
                exercises: completedExercises,
            }));
            localStorage.setItem('workoutState', JSON.stringify({
                ...workoutState,
                exercises: completedExercises,
            }));
        }
        setIsFreestyle(true);
    };

    if (isFreestyle || workoutState.isFreestyle) {
        return (
            <WorkoutFreestyle
                onCompleteWorkout={completeWorkout}
                existingWorkoutState={workoutState}
                isNewWorkout={workoutState.exercises?.length === 0}
            />
        );
    }

    if (!workoutState.exercises || workoutState.exercises.length === 0) {
        return <p>No workout found. Please create or load a workout.</p>;
    }

    const currentExercise = workoutState.exercises[workoutIndexer.currentExerciseIndex];
    const currentSet = currentExercise.sets[workoutIndexer.currentSetIndex];

    return (
        <div className='workout-active'>
            <h1>Workout Active</h1>
            <div>
                {isComplete ? (
                    <WorkoutSummary
                        workoutState={workoutState}
                        onFinish={completeWorkout}
                    />
                ) : isBreak ? (
                    <WorkoutBreak
                        onBreakEnd={handleBreakEnd}
                        onSkip={handleBreakEnd}
                    />
                ) : (
                    <div className='column'>
                        <div className="card">
                            <h2>{currentExercise.name}</h2>
                            <p>Set {workoutIndexer.currentSetIndex + 1} of {currentExercise.sets.length}</p>
                            <p>Reps: </p>
                            <input className="input-field"
                                type="number"
                                value={currentSet.reps}
                                onChange={(e) => handleRepsChange(e, workoutIndexer.currentSetIndex)}
                                inputMode="numeric"
                            />
                            <input className="input-field"
                                type="number"
                                placeholder={weightTracking.lastWeights[currentExercise.name]?.weight.toString() || "Enter weight"}
                                value={weightTracking.currentWeights[workoutIndexer.currentSetIndex] || ""}
                                onChange={(e) => handleWeightChange(e, workoutIndexer.currentSetIndex)}
                                inputMode="decimal"
                            />
                            <div>
                                <button className="bad-button"
                                    onClick={handleSkipExercise}>
                                    Skip
                                </button>
                                <button className="normal-button"
                                    onClick={handleNextExercise}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {!isComplete && !isBreak && (
                    <button className="normal-button" onClick={handleStartFreestyle}>
                        Start Freestyle Workout
                    </button>
                )}
            </div>
        </div >
    );
};

export default WorkoutInProgress;
