import React, { useState, useEffect } from 'react';
import './WorkoutInProgress.css';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface WorkoutInProgressProps {
    onCompleteWorkout: () => void; // Callback to change the view in App.tsx
}

const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ onCompleteWorkout }) => {
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[] | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    useEffect(() => {
        const WorkoutData = localStorage.getItem('currentWorkout');
        if (WorkoutData) {
            setCurrentWorkout(JSON.parse(WorkoutData));
        }
    }, []);

    const handleCompleted = () => {
        if (currentExerciseIndex < (currentWorkout?.length ?? 0) - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            completeWorkout();
        }
    };

    const handleSkip = () => {
        if (currentExerciseIndex < (currentWorkout?.length ?? 0) - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        } else {
            completeWorkout();
        }
    };

    const completeWorkout = () => {
        if (currentWorkout) {
            const workoutHistory = JSON.parse(localStorage.getItem('workout_history') || '[]');
            const workoutEntry = {
                date: new Date().toISOString(),
                exercises: currentWorkout,
            };
            workoutHistory.push(workoutEntry);
            localStorage.setItem('workout_history', JSON.stringify(workoutHistory));
        }
        
        onCompleteWorkout(); // Call the callback to change the view
    };

    if (!currentWorkout || currentWorkout.length === 0) {
        return <p>No workout Workout found. Please create or load a Workout.</p>;
    }

    const currentExercise = currentWorkout[currentExerciseIndex];

    return (
        <div className="page-container">
            <h1>Workout in Progress</h1>
            <div className="exercise-card">
                <h2>{currentExercise.name}</h2>
                <p>Sets: {currentExercise.sets}</p>
                <p>Reps: {currentExercise.reps}</p>
                <div className="button-row">
                    <button onClick={handleCompleted} className="completed-button">
                        Completed
                    </button>
                    <button onClick={handleSkip} className="skip-button">
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutInProgress;
