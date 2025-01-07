import { useEffect, useState } from "react";

import { ExerciseList } from "../../interfaces/Exercises";
import { EquipmentList } from "../../interfaces/Equipment";
import { Circuit, Workout } from "../../interfaces/Workout";

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

    const avaliableExercises = () => {
        // Filter out exercises that are not enabled, while also checking if the equipment is enabled
        return exerciseState?.filter(exercise => exercise.enabled && equipmentState?.find(equipment => equipment.name === exercise.equipment)?.enabled);
    }

    return (
        <div className="exercise-selector">

            <h2>Circuit Creator</h2>

            <div>
                <input type="text" placeholder="Circuit Name" onChange={(e) => setCircuitNameState(e.target.value)} />
            </div>

            <div>
                <select id="exercise" onChange={(e) => setSelectedExerciseState(e.target.value)}>
                    {avaliableExercises()?.map((exercise, index) => (
                        <option key={index} value={exercise.name}>{exercise.name}</option>
                    ))}
                </select>

                <button className="normal-button">
                    Add Exercise
                </button>
            </div>
        </div>
    );
}

export default CircuitCreator;
