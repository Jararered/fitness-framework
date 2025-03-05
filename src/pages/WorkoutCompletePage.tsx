import React, { useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const WorkoutCompletePage: React.FC = () => {
    const { workoutState, setWorkoutState, workoutLogs, setWorkoutLogs, settings } = useWorkout();
    const navigate = useNavigate();

    useEffect(() => {
        if (workoutState.currentPlan) {
            const exerciseLogs = workoutState.currentPlan.exercises.map((ex) => ({
                exercise: ex.exercise,
                reps: ex.reps,
                weight: ex.reps.map(() => 0), // Placeholder weights
                startTime: new Date(),
                endTime: new Date(),
            }));
            const totalReps = exerciseLogs.reduce((sum, log) => sum + log.reps.reduce((a, b) => a + b, 0), 0);
            const totalWeight = 0; // Update if weights are tracked
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
            setWorkoutState({ currentPlan: null, isStarted: false, currentExerciseIndex: 0, currentSetIndex: 0 });
        }
    }, [workoutState, setWorkoutState, workoutLogs, setWorkoutLogs]);

    return (
        <div>
            <div className="card">
                <h1>Congratulations!</h1>
                <p>You completed your workout!</p>
                {/* Placeholder stats */}
                <p>Total Reps: {workoutState.currentPlan?.exercises.reduce((sum, ex) => sum + ex.reps.reduce((a, b) => a + b, 0), 0) || 0}</p>
                <p>Total Weight: 0 {settings.unit}</p>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </div>
    );
};

export default WorkoutCompletePage;