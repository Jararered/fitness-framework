import React, { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const ExercisePage: React.FC = () => {
    const { workoutState, setWorkoutState, settings } = useWorkout();
    const navigate = useNavigate();
    const [repsInput, setRepsInput] = useState<number>(0);
    const [weightInput, setWeightInput] = useState<number>(0);

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];
    const isLastSet = workoutState.currentSetIndex === currentExercise.reps.length - 1;
    const isLastExercise = workoutState.currentExerciseIndex === workoutState.currentPlan.exercises.length - 1;

    const next = () => {
        // Update repsCompleted and weightsUsed
        const updatedReps = [...workoutState.repsCompleted];
        const updatedWeights = [...workoutState.weightsUsed];

        if (!updatedReps[workoutState.currentExerciseIndex]) {
            updatedReps[workoutState.currentExerciseIndex] = [];
            updatedWeights[workoutState.currentExerciseIndex] = [];
        }
        updatedReps[workoutState.currentExerciseIndex][workoutState.currentSetIndex] = repsInput;
        updatedWeights[workoutState.currentExerciseIndex][workoutState.currentSetIndex] = weightInput;

        setWorkoutState({
            ...workoutState,
            repsCompleted: updatedReps,
            weightsUsed: updatedWeights,
        });

        // Navigate to next set or exercise
        if (isLastSet && isLastExercise) {
            navigate("/complete");
        } else if (isLastSet) {
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: 0,
                repsCompleted: updatedReps,
                weightsUsed: updatedWeights,
            });
            navigate("/preview");
        } else {
            setWorkoutState({
                ...workoutState,
                currentSetIndex: workoutState.currentSetIndex + 1,
                repsCompleted: updatedReps,
                weightsUsed: updatedWeights,
            });
        }

        // Reset inputs for next set
        setRepsInput(0);
        setWeightInput(0);
    };

    return (
        <div className="exercise-page">
            <div className="card">
                <h1>{currentExercise.exercise}</h1>
                <p>Set {workoutState.currentSetIndex + 1} of {currentExercise.reps.length}</p>
                <p>Planned Reps: {currentExercise.reps[workoutState.currentSetIndex]}</p>
                <label>Reps Completed</label>
                <input
                    type="number"
                    min="0"
                    value={repsInput}
                    onChange={(e) => setRepsInput(Math.max(0, Number(e.target.value)))}
                />
                <label>Weight Used ({settings.unit})</label>
                <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={weightInput}
                    onChange={(e) => setWeightInput(Math.max(0, Number(e.target.value)))}
                />
                <button onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default ExercisePage;