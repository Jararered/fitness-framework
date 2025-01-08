import { useEffect, useState } from "react";
import { FaCheck, FaDumbbell } from "react-icons/fa";

import { Exercise, DefaultExercises } from "../../interfaces/Exercise";
import { Equipment, DefaultEquipment } from "../../interfaces/Equipment";

const ExerciseToggles = () => {
    const [, setEquipmentState] = useState<Equipment[]>();
    const [exerciseState, setExerciseState] = useState<Exercise[]>();

    // Load from local storage or use default values
    useEffect(() => {
        const exercises = localStorage.getItem("exercises");
        if (exercises) {
            setExerciseState(JSON.parse(exercises));
        } else {
            setExerciseState(DefaultExercises);
            saveExercisesLocal(DefaultExercises);
        }

        const equipment = localStorage.getItem("equipment");
        if (equipment) {
            setEquipmentState(JSON.parse(equipment));
        }
        else {
            setEquipmentState(DefaultEquipment);
        }

    });

    // Save to local storage
    const saveExercisesLocal = (exercises: Exercise[]) => {
        localStorage.setItem("exercises", JSON.stringify(exercises));
    }

    // Handle toggling exercises
    const handleExerciseToggle = (name: string) => {
        setExerciseState(prev => {
            if (!prev) return prev;
            const updatedExercises = prev.map(exercise => {
                if (exercise.name === name) {
                    return exercise.config ? { ...exercise, enabled: !exercise.config.enabled } : exercise;
                }
                return exercise;
            });
            saveExercisesLocal(updatedExercises);
            return updatedExercises;
        });
    }

    const handleResetExercises = () => {
        setExerciseState(DefaultExercises);
        saveExercisesLocal(DefaultExercises);
    }

    return (
        <div className="exercise-toggles">

            <h2>Exercise Toggles</h2>

            <div className="flexible-container">
                {
                    exerciseState && exerciseState.map(exercise => (
                    <div
                        className={`small-card ${exercise.config && exercise.config.enabled ? "enabled" : ""}`}
                        onClick={() => handleExerciseToggle(exercise.name)}
                        key={exercise.name}
                    >
                        <div className="equipment-icon">{<FaDumbbell size={48} />}</div>
                        <div className="small-card-name">{exercise.name}</div>
                        <div className="checkmark-icon">{exercise.config && exercise.config.enabled && <FaCheck size={24} />} </div>
                    </div>
                ))}
            </div>

            <button className="bad-button" onClick={handleResetExercises}>
                Reset Exercises
            </button>

        </div>
    );
}

export default ExerciseToggles;