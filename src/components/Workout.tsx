import React, { useState, useEffect } from 'react';

import SectionTitle from './buttons/SectionTitle';
import { exercisesByEquipment } from './WorkoutExercises';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

type BodyPart = 'Legs' | 'Biceps' | 'Triceps' | 'Chest' | 'Back' | 'Shoulders';

const exerciseCategories: Record<BodyPart, string[]> = {
    Legs: [
        "Barbell Squat",
        "Barbell Front Squat",
        "Barbell Lunge",
        "Smith Machine Squat",
        "Smith Machine Lunges",
        "Leg Extension",
        "Leg Extension + Isometric Hold",
        "Leg Curl",
        "Leg Curl + Isometric Hold",
        "Barbell Deadlift",
        "Barbell Sumo Deadlift",
        "Barbell Romanian Deadlift",
    ],
    Biceps: [
        "Dumbbell Bicep Curl",
        "Dumbbell Hammer Curl",
        "Barbell Curl",
        "EZ Bar Curl",
        "EZ Bar Wide-Grip Curl",
        "EZ Bar Close-Grip Curl",
    ],
    Triceps: [
        "Dumbbell Tricep Extension",
        "Dumbbell Skull Crushers",
        "EZ Bar Skull Crusher",
    ],
    Chest: [
        "Dumbbell Bench Press",
        "Dumbbell Incline Chest Press",
        "Dumbbell Decline Chest Press",
        "Dumbbell Fly",
        "Barbell Bench Press",
        "Barbell Incline Bench Press",
        "Barbell Decline Bench Press",
        "Smith Machine Bench Press",
        "Smith Machine Close-Grip Bench Press",
        "Smith Machine Incline Bench Press",
        "Machine Chest Press",
        "Machine Incline Chest Press",
    ],
    Back: [
        "Dumbbell Bent-Over Row",
        "Dumbbell Single-Arm Row",
        "Barbell Bent-Over Row",
        "Lat Pulldown",
        "Lat Pulldown Wide-Grip",
        "Lat Pulldown Narrow-Grip",
        "Lat Pulldown Reverse-Grip",
        "Lat Pulldown Single-Arm",
        "Lat Pulldown Behind-the-Head",
        "Smith Machine Bent-Over Row",
    ],
    Shoulders: [
        "Dumbbell Shoulder Press",
        "Dumbbell Lateral Raise",
        "Dumbbell Front Raise",
        "Dumbbell Shrugs",
        "Dumbbell Upright Row",
        "Barbell Overhead Press",
        "Smith Machine Overhead Press",
        "Smith Machine Shrugs",
        "Machine Shoulder Press",
    ],
};

const WorkoutBuilder: React.FC = () => {
    const [workout, setWorkout] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: 0, reps: 0 });
    const [savedWorkouts, setSavedWorkouts] = useState<string[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<string>("");
    const [availableExercises, setAvailableExercises] = useState<string[]>([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('Legs');

    useEffect(() => {
        const lastLoadedGym = localStorage.getItem('lastLoadedGym');
        if (lastLoadedGym) {
            const selectedEquipment = JSON.parse(localStorage.getItem(lastLoadedGym) || '[]');
            const exercises = selectedEquipment
                .flatMap((equipment: string) => exercisesByEquipment[equipment] || [])
            setAvailableExercises(exercises);
        }
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
        // Validate input
        if (!newExercise.name) {
            alert("Please select an exercise.");
            return;
        }
        if (newExercise.sets < 1 || newExercise.reps < 1) {
            alert("Sets and reps must be 1 or greater.");
            return;
        }

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

            <div className="card">
                <h2>Workout Generator</h2>
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

export default WorkoutBuilder;
