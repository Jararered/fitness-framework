import { Exercise, ExerciseName, GetAvaliableExercises } from "../interfaces/Exercise";
import { Equipment } from "../interfaces/Equipment";
import { DefaultExercises, DefaultEquipment } from "../interfaces/Defaults";

import LocalStorage, { Keys } from "../interfaces/Storage";
import { useState } from "react";
import { Circuit, NewWorkoutActive, WorkoutActive, WorkoutPlan } from "../interfaces/Workout";

const CircuitCreator: React.FC = () => {
    const [exercises] = LocalStorage<Exercise[]>(Keys.Exercises, DefaultExercises);
    const [equipment] = LocalStorage<Equipment[]>(Keys.Equipment, DefaultEquipment);
    const [workout, setWorkout] = LocalStorage<WorkoutActive>(Keys.Workout, NewWorkoutActive);

    const [selectedExercise, setSelectedExercise] = useState<ExerciseName>();
    const [selectedReps, setSelectedReps] = useState<number[]>([]);

    const [circuit, setCircuit] = useState<Circuit>();

    return (
        <div className="circuit-creator">

            <h2>Circuit Creator</h2>

            <div className="flex">

                {/* Selector that displays the avaliable workouts and sets the selected exercise state */}
                <select
                    value={selectedExercise || ''}
                    onChange={(e) => { const value = e.target.value; setSelectedExercise(value as ExerciseName); }}
                >
                    <option value="">Select Exercise</option>
                    {
                        GetAvaliableExercises(exercises, equipment).map((exercise, index) => {
                            return (
                                <option key={index} value={exercise}>
                                    {exercise}
                                </option>
                            );
                        })
                    }
                </select>

                <select value={selectedReps.length ? selectedReps.join(',') : '0'} onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReps(value === '0' ? [] : value.split(',').map(Number));
                }}>
                    <option value="0">Select Reps</option>
                    <option value="10,10,10">10, 10, 10</option>
                    <option value="10,10,10,10,10">10, 10, 10, 10, 10</option>
                </select>

            </div>

            <button onClick={() => { }}>
                Add Exercise
            </button>

            <div className="flex">
                <button onClick={() => { }}>
                    Add to Circuit
                </button>

                <button onClick={() => { }}>
                    Reset Inputs
                </button>
            </div>
        </div>
    );
};

export default CircuitCreator;

