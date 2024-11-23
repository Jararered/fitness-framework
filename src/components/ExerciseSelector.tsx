
import React from 'react';
import { exerciseCategories } from '../interfaces/Equipment';

interface ExerciseSelectorProps {
    onSelectExercise: (exerciseName: string) => void;
    onComplete: () => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onSelectExercise, onComplete }) => {
    return (
        <div className="card">
            <h2>Select Exercise</h2>
            {Object.entries(exerciseCategories).map(([category, exercises]) => (
                <div key={category}>
                    <h3>{category}</h3>
                    {exercises.map((exercise) => (
                        <button
                            key={exercise}
                            className="normal-button"
                            onClick={() => onSelectExercise(exercise)}
                        >
                            {exercise}
                        </button>
                    ))}
                </div>
            ))}
            <button className="bad-button" onClick={onComplete}>
                End Workout
            </button>
        </div>
    );
};

export default ExerciseSelector;