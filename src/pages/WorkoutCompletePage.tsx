import React, { useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const WorkoutCompletePage: React.FC = () => {
    const { workoutState, setWorkoutState, workoutLogs, setWorkoutLogs, settings } = useWorkout();
    const navigate = useNavigate();

    useEffect(() => {
        if (workoutState.currentPlan) {
            const exerciseLogs = workoutState.currentPlan.exercises.map((ex, index) => ({
                exercise: ex.exercise,
                reps: workoutState.repsCompleted[index] || ex.reps.map(() => 0),
                weight: workoutState.weightsUsed[index] || ex.reps.map(() => 0),
                startTime: new Date(), // Placeholder; could track actual times
                endTime: new Date(),
            }));
            const totalReps = workoutState.repsCompleted
                .flat()
                .reduce((sum, val) => sum + (val || 0), 0);
            const totalWeight = workoutState.weightsUsed
                .flat()
                .reduce((sum, val) => sum + (val || 0), 0);

            setWorkoutLogs([
                ...workoutLogs,
                {
                    workoutId: Date.now(),
                    exercises: exerciseLogs,
                    startTime: new Date(),
                    endTime: new Date(),
                    totalWeight,
                    totalReps,
                },
            ]);
            setWorkoutState({
                currentPlan: null,
                isStarted: false,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
        }
    }, [workoutState, setWorkoutState, workoutLogs, setWorkoutLogs]);

    const totalReps = workoutState.repsCompleted
        .flat()
        .reduce((sum, val) => sum + (val || 0), 0);
    const totalWeight = workoutState.weightsUsed
        .flat()
        .reduce((sum, val) => sum + (val || 0), 0);

    return (
        <div className="workout-complete-page">
            <div className="card">
                <h1>Congratulations!</h1>
                <p>You completed your workout!</p>
                <p>Total Reps: {totalReps}</p>
                <p>Total Weight: {totalWeight} {settings.unit}</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </div>
    );
};

export default WorkoutCompletePage;