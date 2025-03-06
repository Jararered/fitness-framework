import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { Exercise } from "../types";

import "../styles/components/DetailedWorkoutStats.css";

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
    const { workoutLogs, exercises, settings } = useWorkout();

    // Create a map of exercise names to their details for quick lookup
    const exerciseMap = new Map<string, Exercise>(
        exercises.map((ex) => [ex.exercise, ex])
    );

    // Calculate stats for the last 30 days
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentLogs = workoutLogs.filter((log) => log.startTime >= monthAgo);

    // Calculate muscle and category statistics
    const muscleStats: MuscleStats = {};
    const categoryStats: CategoryStats = {};
    let totalWorkouts = recentLogs.length;
    let totalDuration = 0;

    recentLogs.forEach((log) => {
        const duration = (log.endTime.getTime() - log.startTime.getTime()) / 60000; // minutes
        totalDuration += duration;

        log.exercises.forEach((exerciseLog) => {
            const exerciseDetails = exerciseMap.get(exerciseLog.exercise);
            if (!exerciseDetails) return;

            const exerciseReps = exerciseLog.reps.reduce((sum, reps) => sum + reps, 0);
            const exerciseWeight = exerciseLog.weight.reduce(
                (sum, weight) => sum + weight * exerciseLog.reps[0], // Assuming same reps for simplicity
                0
            );

            exerciseDetails.muscles.forEach((muscle) => {
                if (!muscleStats[muscle]) {
                    muscleStats[muscle] = { totalReps: 0, totalWeight: 0, workoutCount: 0 };
                }
                muscleStats[muscle].totalReps += exerciseReps;
                muscleStats[muscle].totalWeight += exerciseWeight;
                muscleStats[muscle].workoutCount += 1;
            });

            exerciseDetails.category.forEach((category) => {
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

    const averageDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;
    const unit = settings.unit === "metric" ? "kg" : "lbs";

    return (
        <div className="card">
            <h2>Detailed Statistics (Last 30 Days)</h2>

            <div className="stats-section">
                <h3>General Stats</h3>
                <span>
                    <p>Total Workouts: {totalWorkouts}</p>
                    <p>Average Workout Duration: {averageDuration.toFixed(1)} minutes</p>
                </span>
            </div>

            <div className="stats-section">
                <h3>Muscle Groups Targeted</h3>
                {sortedMuscles.length > 0 ? (
                    <span className="stats-list">
                        {sortedMuscles.map(([muscle, stats]) => (
                            <p key={muscle}>
                                {muscle}: {stats.totalWeight} {unit} lifted, {stats.totalReps} reps,
                                used in {stats.workoutCount} workouts
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

            <div className="graph-placeholder">
                <p>Graph visualization coming soon...</p>
            </div>
        </div>
    );
};

export default DetailedWorkoutStats;