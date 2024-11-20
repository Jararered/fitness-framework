import React from 'react';
import { Exercise } from './Exercise';
import { SavedWorkout } from './WorkoutCreator';
import { WorkoutState } from './WorkoutActive';

interface WorkoutSummaryProps {
    workoutState: WorkoutState;
    onFinish: () => void;
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workoutState, onFinish }) => {
    const calculateDuration = () => {
        const start = new Date(workoutState.startTime).getTime();
        const end = new Date().getTime();
        const durationInSeconds = Math.round((end - start) / 1000);
        
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        
        return hours > 0 
            ? `${hours} hours, ${minutes} minutes, ${seconds} seconds`
            : `${minutes} minutes, ${seconds} seconds`;
    };

    const totalSets = workoutState.exercises?.reduce((acc, exercise) => acc + exercise.sets.length, 0) || 0;
    const totalExercises = workoutState.exercises?.length || 0;
    const duration = calculateDuration();

    const saveWorkout = (exercises: Exercise[]) => {
        const workoutName = prompt("Enter a name for this workout:");

        if (workoutName) {
            const newWorkout: SavedWorkout = { name: workoutName, exercises };
            const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
            const updatedWorkouts = savedWorkouts
                .filter((w: SavedWorkout) => w.name !== workoutName)
                .concat(newWorkout);

            localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
            alert('Workout saved successfully!');
        }
    };

    return (
        <div className="workout-summary">
            <div className='vertical'>
                <div className='card'>
                    <h2>Workout Complete! 🎉</h2>
                    <div className="summary-stats">
                        <div className="stat-item">
                            <label>Duration: </label>
                            <span>{duration}</span>
                        </div>
                        <div className="stat-item">
                            <label>Exercises: </label>
                            <span>{totalExercises}</span>
                        </div>
                        <div className="stat-item">
                            <label>Total Sets: </label>
                            <span>{totalSets}</span>
                        </div>
                    </div>
                    <button className="normal-button" onClick={() => saveWorkout(workoutState.exercises || [])}>
                        Save Workout
                    </button>
                    <button className="normal-button" onClick={onFinish}>
                        Finish Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutSummary;