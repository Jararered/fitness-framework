import { useEffect, useState } from "react";

import { Workout, LegsExampleWorkout, Circuit } from "../../interfaces/Workout";
import { FormatSets } from "../utils/Formatting";

const WorkoutEditor = () => {
    const workoutLocal = localStorage.getItem("workout");
    const [workoutState, setWorkoutState] = useState<Workout>(
        workoutLocal ? JSON.parse(workoutLocal) : LegsExampleWorkout
    );

    // Load from local storage
    useEffect(() => {
        localStorage.setItem("workout", JSON.stringify(workoutState));
    }, [workoutState]);

    const handleDeleteExercise = (circuitIndex: number, exerciseIndex: number) => {
        const newWorkout = { ...workoutState };
        newWorkout.circuits[circuitIndex].splice(exerciseIndex, 1);
        setWorkoutState(newWorkout);
    }

    const handleDeleteCircuit = (circuitIndex: number) => {
        const newWorkout = { ...workoutState };
        newWorkout.circuits.splice(circuitIndex, 1);
        setWorkoutState(newWorkout);
    }

    const handleMoveCircuit = (circuitIndex: number, direction: number) => {
        const newWorkout = { ...workoutState };

        // Ensure the circuit is not the first if moving up
        if (direction === -1 && circuitIndex === 0) return;

        // Ensure the circuit is not the last if moving down
        if (direction === 1 && circuitIndex === newWorkout.circuits.length - 1) return;

        const circuit = newWorkout.circuits[circuitIndex];
        newWorkout.circuits.splice(circuitIndex, 1);
        newWorkout.circuits.splice(circuitIndex + direction, 0, circuit);

        setWorkoutState(newWorkout);
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

            ))}
        </div >
    );
};

export default WorkoutEditor;