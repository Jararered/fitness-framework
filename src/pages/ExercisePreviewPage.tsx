import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const navigate = useNavigate();

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];

    return (
        <div>
            <div className="card">
                <h1>Exercise Preview</h1>
                <p>{currentExercise.exercise}</p>
                <p>Reps: {currentExercise.reps.join(", ")}</p>
                <button onClick={() => navigate("/exercise")}>Next</button>
            </div>
        </div>
    );
};

export default ExercisePreviewPage;