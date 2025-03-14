import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import WorkoutStatistics from "../components/WorkoutStatistics.tsx";
import { TimerCircular } from "../components/TimerCircular.tsx";

const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [breakTime] = useState<number>(60);

    const handleWeightUnit = () => {
        let weightUnit: string = "";
        if (settings.unit === "metric") {
            weightUnit = "kg";
        } else if (settings.unit === "imperial") {
            weightUnit = "lbs";
        }
        return weightUnit;
    };

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];

    return (
        <div className="exercise-preview-page">
            <div className="card">
                <h1>Up Next</h1>
                <TimerCircular duration={breakTime} />
                <p>Next up: {currentExercise.exercise}</p>
                <p>{currentExercise.reps.length} sets ({currentExercise.reps.join(', ')} reps)</p>
                <button onClick={() => navigate("/exercise")}>Continue</button>
            </div>
            <WorkoutStatistics
                repsCompleted={workoutState.repsCompleted}
                weightsUsed={workoutState.weightsUsed}
                units={handleWeightUnit()}
            />
        </div>

    );
};

export default ExercisePreviewPage;