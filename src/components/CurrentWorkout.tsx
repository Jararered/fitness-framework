import React from 'react';
import { Exercise } from '../interfaces/Workout';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';

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
    showControls = false
}) => {
    if (currentWorkout.length === 0) {
        return <p>No exercises added yet.</p>;
    }

    return (
        <div className="current-workout">
            <h2>Current Workout</h2>
            {currentWorkout.map((exercise, index) => (
                <div key={index} className="exercise-item">

                    <div className="exercise-content">
                        <h3>Exercise {index + 1}: {exercise.name}</h3>
                        <p>Sets: {exercise.sets.map(set => set.reps).join(', ')}</p>
                    </div>

                    {showControls && onMoveExercise && onRemoveExercise && (
                        <div className="exercise-controls">
                            <button
                                className="normal-button"
                                onClick={() => onMoveExercise(index, 'up')}
                                disabled={index === 0}
                            >
                                <FaArrowUp />
                            </button>
                            <button
                                className="normal-button"
                                onClick={() => onMoveExercise(index, 'down')}
                                disabled={index === currentWorkout.length - 1}
                            >
                                <FaArrowDown />
                            </button>
                            <button
                                className="bad-button"
                                onClick={() => onRemoveExercise(index)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CurrentWorkout;
