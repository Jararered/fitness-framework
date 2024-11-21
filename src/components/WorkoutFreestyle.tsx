import React, { useState } from 'react';
import { Exercise } from './Exercise';
import { exerciseCategories } from './Equipment';
import WorkoutSummary from './WorkoutSummary';

interface WorkoutFreestyleProps {
    onCompleteWorkout: () => void;
    existingWorkoutState: any;
    isNewWorkout?: boolean;
}

const WorkoutFreestyle: React.FC<WorkoutFreestyleProps> = ({
    onCompleteWorkout,
    existingWorkoutState,
    isNewWorkout = false
}) => {
    const [workoutState, setWorkoutState] = useState(existingWorkoutState);
    const [currentWeight, setCurrentWeight] = useState<number>(0);
    const [currentReps, setCurrentReps] = useState<number>(0);
    const [isSelectingExercise, setIsSelectingExercise] = useState(isNewWorkout || true);
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
    const [sets, setSets] = useState<Array<{ reps: number, weight: number }>>([]);
    const [isComplete, setIsComplete] = useState(false);

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

        // Update the current exercise with new sets
        const updatedExercise = {
            ...currentExercise,
            sets: newSets
        };

        // Update workout state
        const updatedExercises = workoutState.exercises ? [...workoutState.exercises] : [];
        if (updatedExercises.length > 0 &&
            updatedExercises[updatedExercises.length - 1].name === currentExercise.name) {
            updatedExercises[updatedExercises.length - 1] = updatedExercise;
        } else {
            updatedExercises.push(updatedExercise);
        }

        // Update both local state and localStorage
        const newWorkoutState = {
            ...workoutState,
            exercises: updatedExercises,
            currentExerciseIndex: updatedExercises.length - 1,
            currentSetIndex: newSets.length - 1
        };

        setWorkoutState(newWorkoutState);
        localStorage.setItem('workoutState', JSON.stringify(newWorkoutState));
        localStorage.setItem('currentWorkout', JSON.stringify(updatedExercises));

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
            const completedExercise = {
                ...currentExercise,
                sets: updatedSets
            };

            // Get the current exercises array or initialize it
            const currentExercises = workoutState.exercises ? [...workoutState.exercises] : [];
            if (currentExercises.length > 0 &&
                currentExercises[currentExercises.length - 1].name === currentExercise.name) {
                currentExercises[currentExercises.length - 1] = completedExercise;
            } else {
                currentExercises.push(completedExercise);
            }

            // Update both localStorage and parent state
            const updatedWorkoutState = {
                ...workoutState,
                exercises: currentExercises,
                currentExerciseIndex: currentExercises.length - 1,
                currentSetIndex: updatedSets.length - 1
            };

            setWorkoutState(updatedWorkoutState);
            localStorage.setItem('workoutState', JSON.stringify(updatedWorkoutState));
            localStorage.setItem('currentWorkout', JSON.stringify(currentExercises));

            // Reset states for next exercise
            setIsSelectingExercise(true);
            setCurrentExercise(null);
            setSets([]);
            setCurrentReps(0);
            setCurrentWeight(0);
        }
    };

    const handleComplete = () => {
        if (currentExercise && sets.length > 0) {
            handleNextExercise(); // Save the current exercise before completing
        }

        // Log the completed workout
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

        // Clean up localStorage
        localStorage.removeItem('workoutState');
        localStorage.removeItem('currentWorkout');
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
                <div className="card">
                    <h2>Select Exercise</h2>
                    {Object.entries(exerciseCategories).map(([category, exercises]) => (
                        <div key={category}>
                            <h3>{category}</h3>
                            {exercises.map((exercise) => (
                                <button
                                    key={exercise}
                                    className="normal-button"
                                    onClick={() => handleSelectExercise(exercise)}
                                >
                                    {exercise}
                                </button>
                            ))}
                        </div>
                    ))}
                    <button className="bad-button" onClick={handleComplete}>
                        End Workout
                    </button>
                </div>
            ) : (
                <div className="card">
                    <h2>{currentExercise?.name}</h2>
                    {sets.length > 0 && (
                        <div>
                            <h3>Sets:</h3>
                            {sets.map((set, index) => (
                                <p key={index}>Set {index + 1}: {set.reps} reps @ {set.weight}lbs</p>
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
                        <button className="bad-button" onClick={handleComplete}>End Workout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutFreestyle;