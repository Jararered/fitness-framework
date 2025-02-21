import { NullWorkout, Workout } from "../interfaces/Workout";
import LocalStorage, { Keys } from "../interfaces/Storage";

const PreviewWorkout: React.FC = () => {
    const [workout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);

    return (
        <div className="workout-preview">

            <h2>Workout Preview</h2>

            {workout.circuits.length === 0 ? (
                <p>No circuits in workout, add some in the editor.</p>
            ) : (
                workout.circuits.map((circuit, circuitIndex) => (
                    <div className={"circuit-" + circuitIndex} key={circuitIndex}>

                        <h3>Circuit {circuitIndex + 1}</h3>

                        {circuit.map((exercise, exerciseIndex) => (
                            <div className="flex" key={exerciseIndex}>
                                <b>{exercise.name}</b>
                                <p>{exercise.sets.join(", ")} reps</p>
                            </div>
                        ))}

                    </div>
                ))
            )}
        </div>
    );
};

export default PreviewWorkout;