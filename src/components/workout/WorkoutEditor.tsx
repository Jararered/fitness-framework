import { useEffect, useState } from "react";
import { Workout, LegsExampleWorkout, EmptyWorkout, Circuit } from "../../interfaces/Workout";
import { FormatSets } from "../utils/Formatting";

const WorkoutEditor = () => {
    const [workoutState, setWorkoutState] = useState<Workout>(EmptyWorkout);

    // Load from local storage
    useEffect(() => {
        const workout = localStorage.getItem("workout");
        if (workout) {
            setWorkoutState(JSON.parse(workout));
        }
        else {
            setWorkoutState(LegsExampleWorkout);
            saveWorkoutLocal(LegsExampleWorkout);
        }
    }, []);

    // Save to local storage
    const saveWorkoutLocal = (workout: Workout) => {
        localStorage.setItem("workout", JSON.stringify(workout));
    }

    const handleDeleteCircuit = (circuitIndex: number) => {
        const newWorkout = { ...workoutState };
        newWorkout.circuits.splice(circuitIndex, 1);

        setWorkoutState(newWorkout);
        saveWorkoutLocal(newWorkout);
    }

    const handleMoveCircuit = (circuitIndex: number, direction: number) => {
        const newWorkout = { ...workoutState };
        const circuit = newWorkout.circuits[circuitIndex];
        newWorkout.circuits.splice(circuitIndex, 1);
        newWorkout.circuits.splice(circuitIndex + direction, 0, circuit);

        setWorkoutState(newWorkout);
        saveWorkoutLocal(newWorkout);
    }

    const handleDeleteExercise = (circuitIndex: number, exerciseIndex: number) => {
        const newWorkout = { ...workoutState };
        newWorkout.circuits[circuitIndex].splice(exerciseIndex, 1);

        // Check if the circuit is empty
        if (newWorkout.circuits[circuitIndex].length === 0) {
            newWorkout.circuits.splice(circuitIndex, 1);
        }

        setWorkoutState(newWorkout);
        saveWorkoutLocal(newWorkout);
    }

    const handleMoveExercise = (circuitIndex: number, exerciseIndex: number, direction: number) => {
        const newWorkout = { ...workoutState };

        // Ensure the exercise is not the first in the circuit if moving up
        if (direction === -1 && exerciseIndex === 0) return;

        // Ensure the exercise is not the last in the circuit if moving down
        if (direction === 1 && exerciseIndex === newWorkout.circuits[circuitIndex].length - 1) return;

        const exercise = newWorkout.circuits[circuitIndex][exerciseIndex];
        newWorkout.circuits[circuitIndex].splice(exerciseIndex, 1);
        newWorkout.circuits[circuitIndex].splice(exerciseIndex + direction, 0, exercise);

        setWorkoutState(newWorkout);
        saveWorkoutLocal(newWorkout);
    }

    return (
        <div className="workout-editor">

            <h2>Workout Editor</h2>

            {workoutState.circuits.map((circuit: Circuit, circuitIndex: number) => (
                <div key={circuitIndex}>
                    <h3>Circuit {circuitIndex + 1}</h3>

                    {circuit.map((exerciseList, exerciseIndex) => (
                        <div key={exerciseIndex}>
                            <p>{exerciseList.name}</p>
                            <p>{exerciseList.plan?.sets ? FormatSets(exerciseList.plan.sets) : ""} reps</p>

                            <button className="normal-button"
                                onClick={() => handleMoveExercise(circuitIndex, exerciseIndex, -1)}>
                                ⬆
                            </button>

                            <button className="normal-button"
                                onClick={() => handleMoveExercise(circuitIndex, exerciseIndex, 1)}>
                                ⬇
                            </button>

                            <button className="bad-button"
                                onClick={() => handleDeleteExercise(circuitIndex, exerciseIndex)}>
                                X
                            </button>
                        </div>
                    ))}

                    <button className="normal-button"
                        onClick={() => handleMoveCircuit(circuitIndex, -1)}>
                        ⬆
                    </button>

                    <button className="normal-button"
                        onClick={() => handleMoveCircuit(circuitIndex, 1)}>
                        ⬇
                    </button>

                    <button className="bad-button"
                        onClick={() => handleDeleteCircuit(circuitIndex)}>
                        X
                    </button>
                </div>

            ))
            }
        </div >
    );
};

export default WorkoutEditor;