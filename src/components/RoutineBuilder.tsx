import React, { useState } from 'react';
import './CommonStyles.css';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

const RoutineBuilder: React.FC = () => {
    const [routine, setRoutine] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: 0, reps: 0 });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewExercise((prevExercise) => ({
            ...prevExercise,
            [name]: value,
        }));
    };

    const addExerciseToRoutine = () => {
        setRoutine((prevRoutine) => [...prevRoutine, newExercise]);
        setNewExercise({ name: '', sets: 0, reps: 0 });
    };

    return (
        <div className="page-container">
            <h1>Routine Builder</h1>
            <section>
                <input
                    type="text"
                    name="name"
                    placeholder="Exercise Name"
                    value={newExercise.name}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={newExercise.sets}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={newExercise.reps}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <button onClick={addExerciseToRoutine} className="action-button">
                    Add Exercise
                </button>
            </section>
            <h2>Current Routine</h2>
            <ul>
                {routine.map((exercise, index) => (
                    <li key={index}>
                        <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoutineBuilder;
