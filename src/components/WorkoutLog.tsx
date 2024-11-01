import React, { useState } from 'react';
import './CommonStyles.css';

interface Workout {
    exercise: string;
    sets: number;
    reps: number;
    weight: number;
}

const WorkoutLog: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [newWorkout, setNewWorkout] = useState<Workout>({ exercise: '', sets: 0, reps: 0, weight: 0 });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewWorkout((prevWorkout) => ({
            ...prevWorkout,
            [name]: name === 'exercise' ? value : Number(value), // Convert non-exercise fields to number
        }));
    };

    const handleAddWorkout = () => {
        if (newWorkout.exercise && newWorkout.sets && newWorkout.reps && newWorkout.weight) {
            setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
            setNewWorkout({ exercise: '', sets: 0, reps: 0, weight: 0 });
        } else {
            alert("Please fill out all fields before adding a workout.");
        }
    };

    return (
        <div className="page-container">
            <h1>Workout Log</h1>
            <section>
                <input
                    type="text"
                    name="exercise"
                    placeholder="Exercise Name"
                    value={newWorkout.exercise}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="sets"
                    placeholder="Sets"
                    value={newWorkout.sets || ""}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Reps"
                    value={newWorkout.reps || ""}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (lbs)"
                    value={newWorkout.weight || ""}
                    onChange={handleInputChange}
                    className="input-field"
                />
                <button onClick={handleAddWorkout} className="action-button">
                    Add Workout
                </button>
            </section>
            <h2>Logged Workouts</h2>
            <ul>
                {workouts.map((workout, index) => (
                    <li key={index}>
                        <strong>{workout.exercise}</strong>: {workout.sets} sets of {workout.reps} reps at {workout.weight} lbs
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutLog;
