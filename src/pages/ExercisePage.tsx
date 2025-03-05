import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const ExercisePage: React.FC = () => {
    const { workoutState, setWorkoutState } = useWorkout();
    const navigate = useNavigate();

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];
    const isLastSet = workoutState.currentSetIndex === currentExercise.reps.length - 1;
    const isLastExercise = workoutState.currentExerciseIndex === workoutState.currentPlan.exercises.length - 1;

    const next = () => {
        if (isLastSet && isLastExercise) {
            navigate("/complete");
        } else if (isLastSet) {
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: 0,
            });
            navigate("/preview");
        } else {
            setWorkoutState({
                ...workoutState,
                currentSetIndex: workoutState.currentSetIndex + 1,
            });
        }
    };

    return (
        <div>
            <div className="card">
                <h1>{currentExercise.exercise}</h1>
                <p>Set {workoutState.currentSetIndex + 1} of {currentExercise.reps.length}</p>
                <p>Reps: {currentExercise.reps[workoutState.currentSetIndex]}</p>
                <button onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default ExercisePage;