import React, { useState, useEffect } from 'react';
import './CommonStyles.css';
import '../styles/Input.css';
import { exercisesByEquipment } from './WorkoutExercises'; // Import exercises by equipment

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

const WorkoutBuilder: React.FC = () => {
    const [workout, setWorkout] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: 0, reps: 0 });
    const [savedWorkouts, setSavedWorkouts] = useState<string[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<string>("");
    const [availableExercises, setAvailableExercises] = useState<string[]>([]);

    useEffect(() => {
        // Load available exercises based on selected equipment
        const lastLoadedGym = localStorage.getItem('lastLoadedGym');
        if (lastLoadedGym) {
            const selectedEquipment = JSON.parse(localStorage.getItem(lastLoadedGym) || '[]');
            const exercises = selectedEquipment
                .flatMap((equipment: string) => exercisesByEquipment[equipment] || [])
            // .filter((exercise, index, self) => self.indexOf(exercise) === index); // Remove duplicates
            setAvailableExercises(exercises);
        }

        // Load saved workouts
        const workouts = Object.keys(localStorage).filter(key => key.startsWith('workout_'));
        setSavedWorkouts(workouts);

        const currentWorkout = localStorage.getItem('currentWorkout');
        if (currentWorkout) {
            setWorkout(JSON.parse(currentWorkout));
        }
    }, []);

    const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewExercise((prevExercise) => ({
            ...prevExercise,
            name: value,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewExercise((prevExercise) => ({
            ...prevExercise,
            [name]: Number(value),
        }));
    };

    const addExerciseToWorkout = () => {
        setWorkout((prevWorkout) => {
            const updatedWorkout = [...prevWorkout, newExercise];
            console.log('Updated Workout:', updatedWorkout); // Debugging log
            localStorage.setItem('currentWorkout', JSON.stringify(updatedWorkout));
            return updatedWorkout;
        });
        setNewExercise({ name: '', sets: 0, reps: 0 });
    };

    const saveWorkout = () => {
        const workoutName = prompt("Enter a name for this workout:");
        if (workoutName) {
            const storageKey = `workout_${workoutName}`;
            localStorage.setItem(storageKey, JSON.stringify(workout));
            alert(`Workout "${workoutName}" saved!`);
            setSavedWorkouts((prev) => [...prev, storageKey]);
        }
    };

    const loadWorkout = () => {
        const storageKey = `workout_${selectedWorkout}`;
        const savedWorkout = localStorage.getItem(storageKey);
        if (savedWorkout) {
            const workout = JSON.parse(savedWorkout);
            setWorkout(workout);
            localStorage.setItem('currentWorkout', JSON.stringify(workout));
        } else {
            alert("Please select a valid workout.");
        }
    };

    const clearWorkout = () => {
        if (window.confirm("Are you sure you want to clear this workout?")) {
            setWorkout([]);
            localStorage.removeItem('currentWorkout');
        }
    };

    const generateRandomWorkout = () => {
        if (availableExercises.length === 0) {
            alert("Please select some gym equipment to load exercises.");
            return;
        }

        const randomExercises: Exercise[] = []; // Explicitly type the array
        const numberOfExercises = Math.min(5, availableExercises.length); // Generate up to 5 exercises

        for (let i = 0; i < numberOfExercises; i++) {
            const randomExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
            const randomSets = Math.floor(Math.random() * 3) + 3; // 3 to 5 sets
            const randomReps = (Math.floor(Math.random() * 4) + 1) * 5; // 5, 10, 15, or 20 reps

            randomExercises.push({
                name: randomExercise,
                sets: randomSets,
                reps: randomReps,
            });
        }

        setWorkout((prevWorkout) => {
            const updatedWorkout = [...prevWorkout, ...randomExercises];
            console.log('Generated Random Workout:', updatedWorkout); // Debugging log
            localStorage.setItem('currentWorkout', JSON.stringify(updatedWorkout));
            return updatedWorkout;
        });
    };

    return (
        <>
            <div className="page-title">
                <h1>Workout Creator</h1>
            </div>

            <div className="page-container">
                <h2>Add Exercise to Workout</h2>
                <section className="input-row">
                    <select
                        value={newExercise.name}
                        onChange={handleExerciseChange}
                        className="input-field"
                    >
                        <option value="">Select Exercise</option>
                        {availableExercises.map((exercise, index) => (
                            <option key={index} value={exercise}>
                                {exercise}
                            </option>
                        ))}
                    </select>
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
                    <button onClick={addExerciseToWorkout} className="normal-button">
                        Add Exercise
                    </button>
                </section>



                <h2>Current Workout</h2>
                <ul className="workout-list">
                    {workout.length === 0 ? (
                        <p>No exercises added yet.</p>
                    ) : (
                        workout.map((exercise, index) => (
                            <li key={index} className="workout-item">
                                <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                            </li>
                        ))
                    )}
                </ul>

                <section>
                    <button onClick={saveWorkout} className="normal-button">
                        Save Workout
                    </button>
                    <button onClick={clearWorkout} className="bad-button">
                        Clear Workout
                    </button>
                </section>
            </div>

            <div className="page-container">
                <h2>Load a Saved Workout</h2>
                <div>
                    <select
                        onChange={(e) => setSelectedWorkout(e.target.value)}
                        value={selectedWorkout}
                        className="input-field"
                    >
                        <option value="">Select a workout</option>
                        {savedWorkouts.map((workoutKey) => {
                            const workoutName = workoutKey.replace('workout_', '');
                            return (
                                <option key={workoutKey} value={workoutName}>
                                    {workoutName}
                                </option>
                            );
                        })}
                    </select>
                    <button onClick={loadWorkout} className="normal-button">
                        Load Workout
                    </button>
                </div>
            </div>

            <div className="page-container">
                <h2>Workout Generator</h2>
                <div>
                    <button onClick={generateRandomWorkout} className="normal-button">
                        Generate Random Workout
                    </button>
                </div>
            </div>
        </>
    );
};

export default WorkoutBuilder;
