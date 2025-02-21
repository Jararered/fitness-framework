import { WorkoutPlan, Circuit } from "../interfaces/Workout";
import { LegDayPlan } from "../interfaces/Examples";
import { FormatSets } from "../utils/Formatting";
import LocalStorage, { Keys } from "../interfaces/Storage";

const WorkoutEditor = () => {
    const [workout, setWorkout] = LocalStorage<WorkoutPlan>(Keys.Workout, LegDayPlan);

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

            {workout.circuits?.map((circuit: Circuit, circuitIndex: number) => (
                <div key={circuitIndex}>
                    <div className="flex">
                        <h3>Circuit {circuitIndex + 1}</h3>

                        <button className="circle" onClick={() => handleMoveCircuit(circuitIndex, -1)}>
                            ⬆
                        </button>

                        <button className="circle"
                            onClick={() => handleMoveCircuit(circuitIndex, 1)}>
                            ⬇
                        </button>

                        <button className="circle bad"
                            onClick={() => handleDeleteCircuit(circuitIndex)}>
                            X
                        </button>
                    </div>

                    {circuit.map((exerciseList, exerciseIndex) => (
                        <div className="flex" key={exerciseIndex}>
                            <div className="vertical">
                                <h4>{exerciseList.name}</h4>
                                <p>{exerciseList.sets ? FormatSets(exerciseList.sets) : ""} reps</p>
                            </div>

                            <div>
                                <button className="circle" onClick={() => handleMoveExercise(circuitIndex, exerciseIndex, -1)}>
                                    ⬆
                                </button>

                                <button className="circle" onClick={() => handleMoveExercise(circuitIndex, exerciseIndex, 1)}>
                                    ⬇
                                </button>

                                <button className="bad circle" onClick={() => handleDeleteExercise(circuitIndex, exerciseIndex)}>
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div >
    );
};

export default WorkoutEditor;