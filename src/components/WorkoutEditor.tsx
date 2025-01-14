import { Workout, LegsExampleWorkout, Circuit } from "../interfaces/Workout";
import { FormatSets } from "../utils/Formatting";
import LocalStorage, { Keys } from "../interfaces/Storage";

const WorkoutEditor = () => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, LegsExampleWorkout);

    const handleDeleteExercise = (circuitIndex: number, exerciseIndex: number) => {
        const newWorkout = { ...workout };
        newWorkout.circuits[circuitIndex].splice(exerciseIndex, 1);
        setWorkout(newWorkout);
    }

    const handleDeleteCircuit = (circuitIndex: number) => {
        const newWorkout = { ...workout };
        newWorkout.circuits.splice(circuitIndex, 1);
        setWorkout(newWorkout);
    }

    const handleMoveCircuit = (circuitIndex: number, direction: number) => {
        const newWorkout = { ...workout };

        // Ensure the circuit is not the first if moving up
        if (direction === -1 && circuitIndex === 0) return;

        // Ensure the circuit is not the last if moving down
        if (direction === 1 && circuitIndex === newWorkout.circuits.length - 1) return;

        const circuit = newWorkout.circuits[circuitIndex];
        newWorkout.circuits.splice(circuitIndex, 1);
        newWorkout.circuits.splice(circuitIndex + direction, 0, circuit);

        setWorkout(newWorkout);
    }

    const handleMoveExercise = (circuitIndex: number, exerciseIndex: number, direction: number) => {
        const newWorkout = { ...workout };

        // Ensure the exercise is not the first in the circuit if moving up
        if (direction === -1 && exerciseIndex === 0) return;

        // Ensure the exercise is not the last in the circuit if moving down
        if (direction === 1 && exerciseIndex === newWorkout.circuits[circuitIndex].length - 1) return;

        const exercise = newWorkout.circuits[circuitIndex][exerciseIndex];
        newWorkout.circuits[circuitIndex].splice(exerciseIndex, 1);
        newWorkout.circuits[circuitIndex].splice(exerciseIndex + direction, 0, exercise);

        setWorkout(newWorkout);
    }

    return (
        <div className="workout-editor">

            <h2>Workout Editor</h2>

            {workout.circuits.map((circuit: Circuit, circuitIndex: number) => (
                <div key={circuitIndex}>
                    <h3>Circuit {circuitIndex + 1}</h3>

                    {circuit.map((exerciseList, exerciseIndex) => (
                        <div className="flex" key={exerciseIndex}>
                            <div>
                                <p>{exerciseList.name}</p>
                                <p>{exerciseList.plan?.sets ? FormatSets(exerciseList.plan.sets) : ""} reps</p>
                            </div>

                            <div>
                                <button onClick={() => handleMoveExercise(circuitIndex, exerciseIndex, -1)}>
                                    ⬆
                                </button>

                                <button onClick={() => handleMoveExercise(circuitIndex, exerciseIndex, 1)}>
                                    ⬇
                                </button>

                                <button className="bad" onClick={() => handleDeleteExercise(circuitIndex, exerciseIndex)}>
                                    X
                                </button>
                            </div>
                        </div>
                    ))}

                    <button onClick={() => handleMoveCircuit(circuitIndex, -1)}>
                        ⬆
                    </button>

                    <button
                        onClick={() => handleMoveCircuit(circuitIndex, 1)}>
                        ⬇
                    </button>

                    <button className="bad"
                        onClick={() => handleDeleteCircuit(circuitIndex)}>
                        X
                    </button>
                </div>

            ))}
        </div >
    );
};

export default WorkoutEditor;