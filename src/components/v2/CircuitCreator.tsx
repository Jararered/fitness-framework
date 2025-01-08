import { useEffect, useState } from "react";

import { ExerciseList } from "../../interfaces/Exercises";
import { EquipmentList } from "../../interfaces/Equipment";
import { Circuit, ExerciseEntry, Workout } from "../../interfaces/Workout";

const CircuitCreator: React.FC = () => {
    const [exerciseState, setExerciseState] = useState<ExerciseList>();
    const [equipmentState, setEquipmentState] = useState<EquipmentList>();
    const [workoutState, setWorkoutState] = useState<Workout>();

    const [circuitState, setCircuitState] = useState<Circuit>();
    const [circuitNameState, setCircuitNameState] = useState<string>("");
    const [selectedExerciseState, setSelectedExerciseState] = useState<string>("");

    // Load from local storage
    useEffect(() => {
        const exercises = localStorage.getItem("exercises");
        if (exercises) {
            setExerciseState(JSON.parse(exercises));
        }

        const equipment = localStorage.getItem("equipment");
        if (equipment) {
            setEquipmentState(JSON.parse(equipment));
        }
    }, []);

    const getAvaliableExercises = () => {
        // Filter out exercises that are not enabled, while also checking if the equipment is enabled
        return exerciseState?.filter(exercise => exercise.enabled && equipmentState?.find(equipment => equipment.name === exercise.equipment)?.enabled);
    }

    return (
        <div className="exercise-selector">

            <h2>Circuit Creator</h2>

            <div>
                <select id="exercise" onChange={(e) => setSelectedExerciseState(e.target.value)}>
                    {getAvaliableExercises()?.map((exercise, index) => (
                        <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>

                <button
                    className="normal-button"
                    onClick={() => {
                        const exercise = exerciseState?.find(exercise => exercise.name === selectedExerciseState);

                        if (exercise) {
                            const newExercise: ExerciseEntry = {
                                name: exercise.name,
                                reps: []
                            };

                            if (circuitState) {
                                setCircuitState([...circuitState, newExercise]);
                            } else {
                                setCircuitState([newExercise]);
                            }
                        }
                    }}
                >
                    Add Exercise
                </button>

                <input type="text" placeholder="Reps"
                    onChange={(e) => {
                        const reps = e.target.value;
                        const exercise = circuitState?.[circuitState.length - 1];

                        if (exercise) {
                            exercise.reps.push(parseInt(reps));
                            setCircuitState([...circuitState]);
                        }
                    }}
                />

            </div>
        </div >
    );
}

export default CircuitCreator;
