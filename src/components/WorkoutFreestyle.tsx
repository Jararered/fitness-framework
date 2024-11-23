import React, { useEffect, useState } from 'react';

import WorkoutSummary from './WorkoutSummary';
import ExerciseSelector from './ExerciseSelector';

import { Exercise, WorkoutFreestyleProps } from '../interfaces/Workout';

const WorkoutFreestyle: React.FC<WorkoutFreestyleProps> = ({
    onCompleteWorkout,
    existingWorkoutState,
    isNewWorkout = false
}) => {
    const [workoutState, setWorkoutState] = useState(existingWorkoutState);
    const [currentWeight, setCurrentWeight] = useState<number>(0);
    const [currentReps, setCurrentReps] = useState<number>(0);
    const [isSelectingExercise, setIsSelectingExercise] = useState<boolean>(isNewWorkout || true);
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
    const [sets, setSets] = useState<Array<{ reps: number, weight: number }>>([]);
    const [isComplete, setIsComplete] = useState(false);

    const addToWorkoutState = (newSets: Array<{ reps: number, weight: number }>) => {
        if (!currentExercise) return;

        const updatedExercise = {
            ...currentExercise,
            sets: newSets
        };


        const updatedExercises = workoutState.exercises ? [...workoutState.exercises] : [];
        if (updatedExercises.length > 0 &&
            updatedExercises[updatedExercises.length - 1].name === currentExercise.name) {
            updatedExercises[updatedExercises.length - 1] = updatedExercise;
        } else {
            updatedExercises.push(updatedExercise);
        }

        const newWorkoutState = {
            ...workoutState,
            exercises: updatedExercises,
            currentExerciseIndex: updatedExercises.length - 1,
            currentSetIndex: newSets.length - 1
        };

        setWorkoutState(newWorkoutState);
        localStorage.setItem('workoutState', JSON.stringify(newWorkoutState));
    };

    const handleSelectExercise = (exerciseName: string) => {
        setCurrentExercise({
            name: exerciseName,
            sets: []
        });
        setIsSelectingExercise(false);
        setSets([]);
        setCurrentReps(0);
        setCurrentWeight(0);
    };

    const handleAddSet = () => {
        if (!currentExercise || currentReps <= 0) return;

        const newSets = [...sets, { reps: currentReps, weight: currentWeight }];
        setSets(newSets);
        addToWorkoutState(newSets);

        setCurrentReps(0);
        setCurrentWeight(0);
    };

    const addCurrentSetIfValid = () => {
        if (currentExercise && currentReps > 0) {
            const newSets = [...sets, { reps: currentReps, weight: currentWeight }];
            setSets(newSets);
            return newSets;
        }
        return sets;
    };

    const handleNextExercise = () => {
        const updatedSets = addCurrentSetIfValid();

        if (currentExercise && updatedSets.length > 0) {
            addToWorkoutState(updatedSets);

            setIsSelectingExercise(true);
            setCurrentExercise(null);
            setSets([]);
            setCurrentReps(0);
            setCurrentWeight(0);
        }
    };

    const handleFinishWorkout = () => {
        // Log the completed workout
        if (workoutState.exercises) {
            console.log(workoutState.exercises);
            const loggedWorkouts = JSON.parse(localStorage.getItem('loggedWorkouts') || '[]');
            const workoutEntry = {
                startTime: workoutState.startTime,
                endTime: new Date().toISOString(),
                exercises: workoutState.exercises
            };
            loggedWorkouts.push(workoutEntry);
            localStorage.setItem('loggedWorkouts', JSON.stringify(loggedWorkouts));
        }

        // Clean up localStorage
        localStorage.removeItem('workoutState');
        localStorage.removeItem('currentWorkout');

        // Set isComplete to true to show the workout summary
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