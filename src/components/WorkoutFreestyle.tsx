import React, { useState } from 'react';

import WorkoutSummary from './WorkoutSummary';
import ExerciseSelector from './ExerciseSelector';

import { Exercise, WorkoutFreestyleProps, Workout } from '../interfaces/Workout';

const WorkoutFreestyle: React.FC<WorkoutFreestyleProps> = ({
    onCompleteWorkout,
    existingWorkoutState,
    isNewWorkout = false
}) => {
    const [workoutState, setWorkoutState] = useState<Workout>(existingWorkoutState || {});
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

    const [sets, setSets] = useState<Array<{ reps: number, weight: number }>>([]);

    const [currentWeight, setCurrentWeight] = useState<number>(0);
    const [currentReps, setCurrentReps] = useState<number>(0);

    const [isSelectingExercise, setIsSelectingExercise] = useState<boolean>(isNewWorkout || true);
    const [isComplete, setIsComplete] = useState(false);

    const addToWorkoutState = (newSets: Array<{ reps: number, weight: number }>) => {
        if (!currentExercise) return;

        const updatedExercise = { ...currentExercise, sets: newSets };

        setWorkoutState(prevState => {
            const updatedExercises = prevState.exercises ? [...prevState.exercises] : [];

            if (updatedExercises.length > 0 &&
                updatedExercises[updatedExercises.length - 1].name === currentExercise.name) {
                updatedExercises[updatedExercises.length - 1] = updatedExercise;
            } else {
                updatedExercises.push(updatedExercise);
            }

            const newState = {
                ...prevState,
                exercises: updatedExercises,
                currentExerciseIndex: updatedExercises.length - 1,
                currentSetIndex: newSets.length - 1
            };

            localStorage.setItem('workoutState', JSON.stringify(newState));
            return newState;
        });
    };

    const resetInputs = () => {
        setCurrentReps(0);
        setCurrentWeight(0);
    }

    const handleSelectExercise = (exerciseName: string) => {
        setCurrentExercise({
            name: exerciseName,
            sets: []
        });
        setIsSelectingExercise(false);
        setSets([]);
        resetInputs();
    };

    const handleAddSet = () => {
        if (!currentExercise || currentReps <= 0 || currentWeight <= 0) return;

        // Add the current set to the workout state 
        const newSet = { reps: currentReps, weight: currentWeight };
        const newSets = [...sets, newSet];
        setSets(newSets);
        addToWorkoutState(newSets);

        // Reset the state for the next set
        resetInputs();
    };

    const handleNextExercise = () => {
        handleAddSet();

        // Reset the state for the next exercise
        setCurrentExercise(null);
        setSets([]);
        setIsSelectingExercise(true);
    };

    const logWorkout = (workoutState: Workout) => {
        const loggedWorkouts = JSON.parse(localStorage.getItem('loggedWorkouts') || '[]');
        loggedWorkouts.push(workoutState);
        localStorage.setItem('loggedWorkouts', JSON.stringify(loggedWorkouts));
    };

    const handleFinishWorkout = async () => {
        let finalState: Workout;

        // Only try to add the set if we have valid inputs
        if (currentExercise && currentReps > 0 && currentWeight > 0) {
            const newSet = { reps: currentReps, weight: currentWeight };
            const newSets = [...sets, newSet];
            setSets(newSets);

            // Wait for state to update
            finalState = await new Promise<Workout>(resolve => {
                setWorkoutState(prevState => {
                    const updatedExercises = prevState.exercises ? [...prevState.exercises] : [];
                    const updatedExercise = { ...currentExercise, sets: newSets };

                    if (updatedExercises.length > 0 &&
                        updatedExercises[updatedExercises.length - 1].name === currentExercise.name) {
                        updatedExercises[updatedExercises.length - 1] = updatedExercise;
                    } else {
                        updatedExercises.push(updatedExercise);
                    }

                    const newState = {
                        ...prevState,
                        exercises: updatedExercises,
                        endTime: new Date().toISOString()
                    };

                    localStorage.setItem('workoutState', JSON.stringify(newState));
                    resolve(newState);
                    return newState;
                });
            });
        } else {
            finalState = {
                ...workoutState,
                endTime: new Date().toISOString()
            };
        }

        logWorkout(finalState);

        // Clean up localStorage
        localStorage.removeItem('workoutState');
        localStorage.removeItem('currentWorkout');

        setIsComplete(true);
    };

    if (isComplete) {
        return (
            <WorkoutSummary
                workoutState={workoutState}
                onFinish={onCompleteWorkout}
            />
        );
    }

    return (
        <div className='workout-freestyle'>
            <h1>Freestyle Workout</h1>
            {isSelectingExercise ? (
                <ExerciseSelector onSelectExercise={handleSelectExercise} onComplete={handleFinishWorkout} />
            ) : (
                <div className="card">
                    <h2>{currentExercise?.name}</h2>
                    {sets.length > 0 && (
                        <div>
                            <h3>Completed Sets:</h3>
                            {sets.map((set, index) => (
                                <p key={index}>{set.reps} x {set.weight}lbs</p>
                            ))}
                        </div>
                    )}
                    <div>
                        <label>Reps: </label>
                        <input
                            type="number"
                            value={currentReps || ''}
                            onChange={(e) => setCurrentReps(Number(e.target.value))}
                            className="input-field"
                            inputMode="numeric"
                        />
                    </div>
                    <div>
                        <label>Weight: </label>
                        <input
                            type="number"
                            value={currentWeight || ''}
                            onChange={(e) => setCurrentWeight(Number(e.target.value))}
                            className="input-field"
                            inputMode="decimal"
                        />
                    </div>
                    <div>
                        <button className="normal-button" onClick={handleAddSet}>Add Set</button>
                        <button className="normal-button" onClick={handleNextExercise}>Next Exercise</button>
                    </div>
                    <div>
                        <button className="bad-button" onClick={handleFinishWorkout}>End Workout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutFreestyle;