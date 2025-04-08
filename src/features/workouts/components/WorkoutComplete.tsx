import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSettingStore } from "../../../features/settings/hooks/useSettingStore.ts";

import { WorkoutStatistics } from "./WorkoutStatistics.tsx";

import { useWorkoutStore } from "../hooks/useWorkoutStore.ts";

const WorkoutCompletePage: React.FC = () => {
    const navigate = useNavigate();
    const { workoutState, setWorkoutState, workoutLogs, setWorkoutLogs } = useWorkoutStore();
    const { unit } = useSettingStore();

    const [stats, setStats] = useState<{
        repsCompleted: number[][];
        weightsUsed: number[][];
    } | null>(null);

    useEffect(() => {
        if (workoutState.currentPlan) {
            // Store the statistics data before resetting the state
            setStats({
                repsCompleted: [...workoutState.repsCompleted],
                weightsUsed: [...workoutState.weightsUsed],
            });

            const exerciseLogs = workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises.map(
                (ex, index) => ({
                    exercise: ex.exercise,
                    reps: workoutState.repsCompleted[index] || ex.reps.map(() => 0),
                    weight: workoutState.weightsUsed[index] || ex.reps.map(() => 0),
                    startTime: new Date(), // Placeholder; could track actual times
                    endTime: new Date(),
                })
            );
            const totalReps = workoutState.repsCompleted.flat().reduce((sum, val) => sum + (val || 0), 0);
            const totalWeight = workoutState.weightsUsed.flat().reduce((sum, val) => sum + (val || 0), 0);
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

            // Reset workout state after storing the statistics
            setWorkoutState({
                currentPlan: null,
                isStarted: false,
                currentCircuitIndex: 0,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
        }
    }, []); // Only run once on component mount

    return (
        <div className="workout-complete-page">
            <div className="card">
                <h1>Congratulations!</h1>
                <button onClick={() => navigate("/")}>Back to Home</button>
            </div>
            {stats && (
                <WorkoutStatistics
                    repsCompleted={stats.repsCompleted}
                    weightsUsed={stats.weightsUsed}
                    units={unit}
                />
            )}
        </div>
    );
};

export default WorkoutCompletePage;
