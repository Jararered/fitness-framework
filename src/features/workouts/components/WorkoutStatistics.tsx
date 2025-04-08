import React from "react";

interface WorkoutStatisticsProps {
    repsCompleted: number[][];
    weightsUsed: number[][];
    units: string;
}

const WorkoutStatistics: React.FC<WorkoutStatisticsProps> = ({ repsCompleted, weightsUsed, units }) => {
    // Calculate cumulative stats
    const totalRepsCompleted = repsCompleted.flat().reduce((sum, val) => sum + (val || 0), 0);
    const totalWeightLifted = weightsUsed.flat().reduce((sum, val) => sum + (val || 0), 0);

    return (
        <div className="card">
            <h2>Workout Statistics</h2>
            <p>Total Reps Completed: {totalRepsCompleted}</p>
            <p>
                Total Weight Lifted: {totalWeightLifted} {units}
            </p>
        </div>
    );
};

export { WorkoutStatistics };
