import { useCallback } from "react";
import { FaCheck, FaDumbbell } from "react-icons/fa";

import { Exercise, DefaultExercises } from "../../interfaces/Exercise";
import LocalStorage, { Keys } from "../../interfaces/Storage";

const ExerciseToggles = () => {
    const [exercises, setExercises] = LocalStorage<Exercise[]>(Keys.Exercises, DefaultExercises);

    // Handle toggling exercises
    const handleExerciseToggle = useCallback((name: string) => {
        const newExerciseState = exercises.map(exercise => {
            if (exercise.name === name) {
                if (exercise.config) {
                    exercise.config.enabled = !exercise.config.enabled;
                }
            }
            return exercise;
        });
        setExercises(newExerciseState);
    }, [exercises]);

    return (
        <div className="exercise-toggles">

            <h2>Exercise Toggles</h2>

            <div className="flexible-container">
                {exercises && exercises.map(exercise => (
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

            <button
                className="bad-button"
                onClick={() => setExercises(DefaultExercises)}>
                Reset Exercises
            </button>

        </div >
    );
}

export default ExerciseToggles;