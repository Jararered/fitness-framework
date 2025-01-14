import { Workout } from "../interfaces/Workout";
import { LegsExampleWorkout } from "../interfaces/Examples";
import LocalStorage, { Keys } from "../interfaces/Storage";

const WorkoutPreview: React.FC = () => {
    const [workout] = LocalStorage<Workout>(Keys.Workout, LegsExampleWorkout);

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
                                <p>{exercise.plan?.sets.join(', ')} sets</p>
                            </div>
                        ))}

                    </div>
                ))
            )}
        </div>
    );
};

export default WorkoutPreview;