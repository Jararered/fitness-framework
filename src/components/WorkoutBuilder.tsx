import React, { useState, useEffect } from 'react';
import './CommonStyles.css';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

const WorkoutBuilder: React.FC = () => {
    const [routine, setRoutine] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: 0, reps: 0 });
    const [savedRoutines, setSavedRoutines] = useState<string[]>([]);
    const [selectedRoutine, setSelectedRoutine] = useState<string>("");

    useEffect(() => {
        const routines = Object.keys(localStorage).filter(key => key.startsWith('routine_'));
        setSavedRoutines(routines);

        const currentRoutine = localStorage.getItem('currentRoutine');
        if (currentRoutine) {
            setRoutine(JSON.parse(currentRoutine));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewExercise((prevExercise) => ({
            ...prevExercise,
            [name]: name === 'name' ? value : Number(value),
        }));
    };

    const addExerciseToRoutine = () => {
        setRoutine((prevRoutine) => {
            const updatedRoutine = [...prevRoutine, newExercise];
            localStorage.setItem('currentRoutine', JSON.stringify(updatedRoutine));
            return updatedRoutine;
        });
        setNewExercise({ name: '', sets: 0, reps: 0 });
    };

    const saveRoutine = () => {
        const routineName = prompt("Enter a name for this workout:");
        if (routineName) {
            const storageKey = `routine_${routineName}`;
            localStorage.setItem(storageKey, JSON.stringify(routine));
            alert(`Workout "${routineName}" saved!`);
            setSavedRoutines((prev) => [...prev, storageKey]);
        }
    };

    const loadRoutine = () => {
        const storageKey = `routine_${selectedRoutine}`;
        const savedRoutine = localStorage.getItem(storageKey);
        if (savedRoutine) {
            const routine = JSON.parse(savedRoutine);
            setRoutine(routine);
            localStorage.setItem('currentRoutine', JSON.stringify(routine));
        } else {
            alert("Please select a valid workout.");
        }
    };

    const clearRoutine = () => {
        setRoutine([]);
        localStorage.removeItem('currentRoutine');
    };

    return (
        <div className="page-container">
            <h1>Workout Builder</h1>
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
                    value={newExercise.sets || ""}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={newExercise.reps || ""}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <button onClick={addExerciseToRoutine} className="action-button">
                    Add Exercise
                </button>
                <button onClick={saveRoutine} className="action-button">
                    Save Workout
                </button>
                <button onClick={clearRoutine} className="action-button">
                    Clear Workout
                </button>
            </section>

            <h2>Load a Saved Workout</h2>
            <div>
                <select
                    onChange={(e) => setSelectedRoutine(e.target.value)}
                    value={selectedRoutine}
                    className="input-field"
                >
                    <option value="">Select a workout</option>
                    {savedRoutines.map((routineKey) => {
                        const routineName = routineKey.replace('routine_', '');
                        return (
                            <option key={routineKey} value={routineName}>
                                {routineName}
                            </option>
                        );
                    })}
                </select>
                <button onClick={loadRoutine} className="action-button">
                    Load Workout
                </button>
            </div>

            {/* Today's Workout Section */}
            <h2>Today's Workout</h2>
            <ul className="routine-list">
                {routine.length === 0 ? (
                    <p>No exercises added yet.</p>
                ) : (
                    routine.map((exercise, index) => (
                        <li key={index} className="routine-item">
                            <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default WorkoutBuilder;
