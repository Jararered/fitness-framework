import React, { useState, useEffect } from 'react';

// Import Components
import CurrentWorkout from './CurrentWorkout';

// Import Interfaces
import { Exercise, SavedWorkout } from '../interfaces/Workout';
import { equipmentExercises, exerciseCategories, BodyPart } from '../interfaces/Equipment';

const WorkoutCreator: React.FC = () => {
    const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise>({ name: '', sets: [] });
    const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<string>("");
    const [availableExercises, setAvailableExercises] = useState<string[]>([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('Chest');

    useEffect(() => {
        const selectedEquipment = localStorage.getItem('selectedEquipment');
        if (selectedEquipment) {
            const equipment = JSON.parse(selectedEquipment);
            const exercises = equipment.flatMap((item: string) => equipmentExercises[item] || []);
            setAvailableExercises(exercises);
        }

        const savedWorkoutsData = localStorage.getItem('savedWorkouts');
        if (savedWorkoutsData) {
            setSavedWorkouts(JSON.parse(savedWorkoutsData));
        }

        const currentWorkout = localStorage.getItem('currentWorkout');
        if (currentWorkout) {
            setCurrentWorkout(JSON.parse(currentWorkout));
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
        const { value } = e.target;
        if (!value.trim()) {
            setNewExercise((prevExercise) => ({
                ...prevExercise,
                sets: [],
            }));
            return;
        }
        const repsArray = value.split('.').map(rep => ({ reps: Number(rep.trim()) }));
        setNewExercise((prevExercise) => ({
            ...prevExercise,
            sets: repsArray,
        }));
    };

    const addExerciseToWorkout = () => {
        if (!newExercise.name || newExercise.sets[0].reps < 1) {
            alert("Please provide valid exercise details.");
            return;
        }

        setCurrentWorkout((prevWorkout) => {
            const updatedWorkout = [...prevWorkout, newExercise];
            localStorage.setItem('currentWorkout', JSON.stringify(updatedWorkout));
            return updatedWorkout;
        });

        setNewExercise({ name: '', sets: [] });
    };

    const saveWorkout = () => {
        if (currentWorkout.length === 0) {
            alert("Please add some exercises to save a workout.");
            return;
        }

        const workoutName = prompt("Enter a name for this workout:");

        if (workoutName) {
            const newWorkout = { name: workoutName, exercises: currentWorkout };
            setSavedWorkouts((prev) => {
                const updatedWorkouts = prev.filter(w => w.name !== workoutName).concat(newWorkout);
                localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
                return updatedWorkouts;
            });
        }
    };

    const loadWorkout = () => {
        const workout = savedWorkouts.find(w => w.name === selectedWorkout);
        if (workout) {
            setCurrentWorkout(workout.exercises);
            localStorage.setItem('currentWorkout', JSON.stringify(workout.exercises));
        } else {
            alert("Please select a valid workout.");
        }
    };

    const clearCurrentWorkout = () => {
        if (window.confirm("Are you sure you want to clear this workout?")) {
            setCurrentWorkout([]);
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
                sets: Array(randomSets).fill({ reps: randomReps }),
            });
        }

        setCurrentWorkout((prevWorkout) => {
            const updatedWorkout = [...prevWorkout, ...randomExercises];
            localStorage.setItem('currentWorkout', JSON.stringify(updatedWorkout));
            return updatedWorkout;
        });
    };

    const deleteWorkout = () => {
        if (window.confirm("Are you sure you want to delete this workout?")) {
            setSavedWorkouts((prev) => {
                const updatedWorkouts = prev.filter(w => w.name !== selectedWorkout);
                localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
                return updatedWorkouts;
            });
            setSelectedWorkout("");
        }
    };

    const moveExercise = (index: number, direction: 'up' | 'down') => {
        setCurrentWorkout(prevWorkout => {
            const newWorkout = [...prevWorkout];
            if (direction === 'up' && index > 0) {
                [newWorkout[index], newWorkout[index - 1]] = [newWorkout[index - 1], newWorkout[index]];
            } else if (direction === 'down' && index < newWorkout.length - 1) {
                [newWorkout[index], newWorkout[index + 1]] = [newWorkout[index + 1], newWorkout[index]];
            }
            localStorage.setItem('currentWorkout', JSON.stringify(newWorkout));
            return newWorkout;
        });
    };

    const removeExercise = (index: number) => {
        setCurrentWorkout(prevWorkout => {
            const newWorkout = prevWorkout.filter((_, i) => i !== index);
            localStorage.setItem('currentWorkout', JSON.stringify(newWorkout));
            return newWorkout;
        });
    };

    return (
        <div className='workout-creator'>
            <h1>Workout Creator</h1>
            <div className='column'>
                <div className="card">
                    <h2>Add Exercise to Workout</h2>

                    <div>
                        <select className="input-field" value={newExercise.name}
                            onChange={handleExerciseChange}>
                            <option value="">Select Exercise</option>
                            {availableExercises.map((exercise, index) => (
                                <option key={index} value={exercise}>
                                    {exercise}
                                </option>
                            ))}
                        </select>

                        <input className="input-field" type="text"
                            inputMode="decimal"
                            name="reps"
                            placeholder="Reps (decimal separated)"
                            value={newExercise.sets.map(set => set.reps).join('. ') || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button className="normal-button" onClick={addExerciseToWorkout}>
                        Add Exercise
                    </button>

                    <CurrentWorkout 
                        currentWorkout={currentWorkout}
                        onMoveExercise={moveExercise}
                        onRemoveExercise={removeExercise}
                        showControls={true}
                    />

                    <section>
                        <button className="normal-button" onClick={saveWorkout}>
                            Save Workout
                        </button>

                        <button className="bad-button" onClick={clearCurrentWorkout}>
                            Clear Workout
                        </button>
                    </section>
                </div>

                <div className="card">
                    <h2>Load a Saved Workout</h2>
                    <select className="input-field"
                        onChange={(e) => setSelectedWorkout(e.target.value)}
                        value={selectedWorkout}
                    >
                        <option value="">Select a workout</option>
                        {savedWorkouts.map((workout) => (
                            <option key={workout.name} value={workout.name}>
                                {workout.name}
                            </option>
                        ))}
                    </select>
                    <div>
                        <button className="normal-button" onClick={loadWorkout}>
                            Load Workout
                        </button>

                        <button className="bad-button" onClick={deleteWorkout}>
                            Delete Workout
                        </button>
                    </div>
                </div>

                <div className="card">
                    <h2>Random Workout</h2>
                    <select className="input-field"
                        value={selectedBodyPart}
                        onChange={(e) => setSelectedBodyPart(e.target.value as BodyPart)}
                    >
                        {Object.keys(exerciseCategories).map((bodyPart) => (
                            <option key={bodyPart} value={bodyPart}>
                                {bodyPart}
                            </option>
                        ))}
                    </select>
                    <div>

                        <button className="normal-button" onClick={generateRandomWorkout}>
                            Generate Random Workout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCreator;
