import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useUser } from "../context/UserContext.tsx";
import { Exercise } from "../types.ts";

import "../styles/components/WorkoutStatisticsDetailed.css";

interface MuscleStats {
    [muscle: string]: {
        totalReps: number;
        totalWeight: number;
        workoutCount: number;
    };
}

interface CategoryStats {
    [category: string]: {
        totalReps: number;
        totalWeight: number;
        workoutCount: number;
    };
}

const DetailedWorkoutStats: React.FC = () => {
    const { workoutLogs, exercises } = useWorkout();
    const { settings } = useUser();

    // Create a map of exercise names to their details for quick lookup
    const exerciseMap = new Map<string, Exercise>(
        exercises.map((ex) => [ex.exercise_name, ex])
    );

    // Calculate stats for the last 30 days
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentLogs = workoutLogs.filter((log) => log.startTime >= monthAgo);

    // Calculate muscle and category statistics
    const muscleStats: MuscleStats = {};
    const categoryStats: CategoryStats = {};
    let totalWorkouts = recentLogs.length;
    let totalMinutes = 0;

    recentLogs.forEach((log) => {
        const minutes = (log.endTime.getTime() - log.startTime.getTime()) / 60000;
        totalMinutes += minutes;

        log.exercises.forEach((exerciseLog) => {
            const exerciseDetails = exerciseMap.get(exerciseLog.exercise);
            if (!exerciseDetails) return;

            const exerciseReps = exerciseLog.reps.reduce((sum, reps) => sum + reps, 0);
            const exerciseWeight = exerciseLog.weight.reduce((sum, weight) => sum + weight, 0);

            exerciseDetails.muscles.forEach((muscle) => {
                if (!muscleStats[muscle]) {
                    muscleStats[muscle] = { totalReps: 0, totalWeight: 0, workoutCount: 0 };
                }
                muscleStats[muscle].totalReps += exerciseReps;
                muscleStats[muscle].totalWeight += exerciseWeight;
                muscleStats[muscle].workoutCount += 1;
            });

            exerciseDetails.muscle_group.forEach((category) => {
                if (!categoryStats[category]) {
                    categoryStats[category] = { totalReps: 0, totalWeight: 0, workoutCount: 0 };
                }
                categoryStats[category].totalReps += exerciseReps;
                categoryStats[category].totalWeight += exerciseWeight;
                categoryStats[category].workoutCount += 1;
            });
        });
    });

    const sortedMuscles = Object.entries(muscleStats).sort(
        ([, a], [, b]) => b.totalWeight - a.totalWeight
    );
    const sortedCategories = Object.entries(categoryStats).sort(
        ([, a], [, b]) => b.totalWeight - a.totalWeight
    );

    const averageDuration = totalWorkouts > 0 ? totalMinutes / totalWorkouts : 0;
    const unit = settings.unit === "metric" ? "kg" : "lbs";

    return (
        <div className="card">
            <h2>Detailed Statistics (Last 30 Days)</h2>

            <div className="stats-section">
                <h3>General Stats</h3>
                <p>Total Workouts: {totalWorkouts}</p>
                <p>Average Workout Duration: {averageDuration.toFixed(1)} minutes</p>
            </div>

            <div className="stats-section">
                <h3>Muscle Groups Targeted</h3>
                {sortedMuscles.length > 0 ? (
                    <span className="stats-list">
                        {sortedMuscles.map(([muscle, stats]) => (
                            <p key={muscle}>
                                {muscle}: {stats.totalWeight}{unit} total, {stats.totalReps} reps,
                                used in {stats.workoutCount} workout(s)
                            </p>
                        ))}
                    </span>
                ) : (
                    <p>No muscle data available</p>
                )}
            </div>

            <div className="stats-section">
                <h3>Body Categories Worked</h3>
                {sortedCategories.length > 0 ? (
                    <span className="stats-list">
                        {sortedCategories.map(([category, stats]) => (
                            <p key={category}>
                                {category}: {stats.totalWeight} {unit} lifted, {stats.totalReps} reps,
                                used in {stats.workoutCount} workouts
                            </p>
                        ))}
                    </span>
                ) : (
                    <p>No category data available</p>
                )}
            </div>
        </div>
    );
};

export default DetailedWorkoutStats;