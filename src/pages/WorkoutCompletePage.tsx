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
                reps: workoutState.repsCompleted[index] || ex.reps.map(() => 0), // Fallback to 0 if not completed
                weight: workoutState.weightsUsed[index] || ex.reps.map(() => 0), // Fallback to 0 if not completed
                startTime: new Date(), // Simplified; could track actual start time
                endTime: new Date(),
            }));
            const totalReps = exerciseLogs.reduce((sum, log) => sum + log.reps.reduce((a, b) => a + b, 0), 0);
            const totalWeight = exerciseLogs.reduce((sum, log) => sum + log.weight.reduce((a, b) => a + b, 0), 0);

            setWorkoutLogs([
                ...workoutLogs,
                {
                    workoutId: Date.now(),
                    exercises: exerciseLogs,
                    startTime: new Date(), // Simplified; could track actual start
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

    return (
        <div className="workout-complete-page">
            <div className="card">
                <h1>Congratulations!</h1>
                <p>You completed your workout!</p>
                <p>Total Reps: {workoutState.repsCompleted.flat().reduce((sum, val) => sum + val, 0) || 0}</p>
                <p>Total Weight: {workoutState.weightsUsed.flat().reduce((sum, val) => sum + val, 0) || 0} {settings.unit}</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </div>
    );
};

export default WorkoutCompletePage;