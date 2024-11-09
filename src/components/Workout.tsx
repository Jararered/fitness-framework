import React, { useState, useEffect } from 'react';
import { equipmentExercises, exerciseCategories, BodyPart } from './Equipment';
import SectionTitle from './buttons/SectionTitle';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface SavedWorkout {
    name: string;
    exercises: Exercise[];
}

const WorkoutCreator: React.FC = () => {
    const [workout, setWorkout] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: 0, reps: 0 });
    const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<string>("");
    const [availableExercises, setAvailableExercises] = useState<string[]>([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('Legs');

    useEffect(() => {
        const lastGym = localStorage.getItem('lastGym');
        const savedGyms = localStorage.getItem('savedGyms');

        if (lastGym && savedGyms) {
            const gym = JSON.parse(savedGyms).find((entry: { name: string }) => entry.name === lastGym);
            if (gym) {
                const exercises = gym.equipment.flatMap((equipment: string) => equipmentExercises[equipment] || []);
                setAvailableExercises(exercises);
            }
        }

        const savedWorkoutsData = localStorage.getItem('savedWorkouts');
        if (savedWorkoutsData) {
            setSavedWorkouts(JSON.parse(savedWorkoutsData));
        }

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
        if (!newExercise.name || newExercise.sets < 1 || newExercise.reps < 1) {
            alert("Please provide valid exercise details.");
            return;
        }

        setWorkout((prevWorkout) => {
            const updatedWorkout = [...prevWorkout, newExercise];
            localStorage.setItem('currentWorkout', JSON.stringify(updatedWorkout));
            return updatedWorkout;
        });

        setNewExercise({ name: '', sets: 0, reps: 0 });
    };

    const saveWorkout = () => {
        const workoutName = prompt("Enter a name for this workout:");
        if (workoutName) {
            const newWorkout = { name: workoutName, exercises: workout };
            setSavedWorkouts((prev) => {
                const updatedWorkouts = prev.filter(w => w.name !== workoutName).concat(newWorkout);
                localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
                return updatedWorkouts;
            });
            alert(`Workout "${workoutName}" saved!`);
        }
    };

    const loadWorkout = () => {
        const workout = savedWorkouts.find(w => w.name === selectedWorkout);
        if (workout) {
            setWorkout(workout.exercises);
            localStorage.setItem('currentWorkout', JSON.stringify(workout.exercises));
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

        const bodyPartExercises = exerciseCategories[selectedBodyPart].filter(
            exercise => availableExercises.includes(exercise)
        );

        if (bodyPartExercises.length === 0) {
            alert(`No exercises available for ${selectedBodyPart} with current equipment. Please select different equipment.`);
            return;
        }

        const randomExercises: Exercise[] = [];
        const numberOfExercises = Math.min(4, bodyPartExercises.length);

        for (let i = 0; i < numberOfExercises; i++) {
            const randomExercise = bodyPartExercises[Math.floor(Math.random() * bodyPartExercises.length)];
            const randomSets = Math.floor(Math.random() * 3) + 3;
            const randomReps = (Math.floor(Math.random() * 4) + 1) * 5;

            randomExercises.push({
                name: randomExercise,
                sets: randomSets,
                reps: randomReps,
            });
        }

        setWorkout((prevWorkout) => {
            const updatedWorkout = [...prevWorkout, ...randomExercises];
            localStorage.setItem('currentWorkout', JSON.stringify(updatedWorkout));
            return updatedWorkout;
        });
    };

    return (
        <div className='main-content'>
            <SectionTitle title="Workout" />
            <div className="card">
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
                </section>
                <section className="input-row">
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
                </section>
                <button onClick={addExerciseToWorkout} className="normal-button">
                    Add Exercise
                </button>
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
            <div className="card">
                <h2>Load a Saved Workout</h2>
                <div className="input-row">
                    <select
                        onChange={(e) => setSelectedWorkout(e.target.value)}
                        value={selectedWorkout}
                        className="input-field"
                    >
                        <option value="">Select a workout</option>
                        {savedWorkouts.map((workout) => (
                            <option key={workout.name} value={workout.name}>
                                {workout.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={loadWorkout} className="normal-button">
                        Load Workout
                    </button>
                </div>
            </div>
            <div className="card">
                <h2>Random Workout</h2>
                <div className="input-row">
                    <select
                        value={selectedBodyPart}
                        onChange={(e) => setSelectedBodyPart(e.target.value as BodyPart)}
                        className="input-field"
                    >
                        {Object.keys(exerciseCategories).map((bodyPart) => (
                            <option key={bodyPart} value={bodyPart}>
                                {bodyPart}
                            </option>
                        ))}
                    </select>
                    <button onClick={generateRandomWorkout} className="normal-button">
                        Generate Random Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCreator;
