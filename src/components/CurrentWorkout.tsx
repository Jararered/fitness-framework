import React from 'react';
import { Exercise } from '../interfaces/Workout';

interface CurrentWorkoutProps {
    currentWorkout: Exercise[];
    onMoveExercise?: (index: number, direction: 'up' | 'down') => void;
    onRemoveExercise?: (index: number) => void;
    showControls?: boolean;
}

const CurrentWorkout: React.FC<CurrentWorkoutProps> = ({
    currentWorkout,
    onMoveExercise,
    onRemoveExercise,
    showControls = true
}) => {
    if (currentWorkout.length === 0) {
        return <p>No exercises added yet.</p>;
    }

    return (
        <div className="current-workout">
            <h3>Current Workout</h3>
            {currentWorkout.map((exercise, index) => (
                <div key={index} className="exercise-item">

                    <div className="exercise-content">
                        <strong>{exercise.name}</strong>
                        <p>Sets: {exercise.sets.map(set => set.reps).join(', ')}</p>
                    </div>

                    {showControls && onMoveExercise && onRemoveExercise && (
                        <div className="exercise-controls">
                            <button
                                className="normal-button"
                                onClick={() => onMoveExercise(index, 'up')}
                                disabled={index === 0}
                            >
                                ↑
                            </button>
                            <button
                                className="normal-button"
                                onClick={() => onMoveExercise(index, 'down')}
                                disabled={index === currentWorkout.length - 1}
                            >
                                ↓
                            </button>
                            <button
                                className="bad-button"
                                onClick={() => onRemoveExercise(index)}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CurrentWorkout;
