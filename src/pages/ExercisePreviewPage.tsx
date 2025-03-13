import React, { useState, useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";
import WorkoutStatistics from "../components/WorkoutStatistics.tsx";
import { useUser } from "../context/UserContext.tsx";
const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [breakTime, setBreakTime] = useState<number>(60);

    useEffect(() => {
        setBreakTime(60);
        const timer = setInterval(() => {
            setBreakTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
                {breakTime > 0 && <p>Break: {breakTime}s</p>}
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