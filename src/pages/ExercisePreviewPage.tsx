import React, { useState, useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const navigate = useNavigate();
    const [breakTime, setBreakTime] = useState<number>(60);

    useEffect(() => {
        setBreakTime(60);
        const timer = setInterval(() => {
            setBreakTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];

    return (
        <div className="exercise-preview-page">
            <div className="card">
                <h1>{currentExercise.exercise}</h1>
                {breakTime > 0 && <p>Break: {breakTime}s</p>}
                <p>Next up: {currentExercise.reps.length} sets</p>
                <button onClick={() => navigate("/exercise")}>Continue</button>
            </div>
        </div>
    );
};

export default ExercisePreviewPage;