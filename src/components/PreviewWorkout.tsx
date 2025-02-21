import { NewWorkoutActive, WorkoutActive } from "../interfaces/Workout";
import LocalStorage, { Keys } from "../interfaces/Storage";

const PreviewWorkout: React.FC = () => {
    const [workout] = LocalStorage<WorkoutActive>(Keys.Workout, NewWorkoutActive);

    return (
        <div className="workout-preview">

            <h2>Workout Preview</h2>

            {!workout.plan ? (
                <p>No workout plan loaded.</p>
            ) : workout.plan.circuits.length === 0 ? (
                <p>No circuits in workout, add some in the editor.</p>
            ) : (
                workout.plan.circuits.map((circuit, circuitIndex) => (
                    <div className={"circuit-" + circuitIndex} key={circuitIndex}>

                        <h3>Circuit {circuitIndex + 1}</h3>

                        {circuit.map((exercise, exerciseIndex) => (
                            <div className="flex" key={exerciseIndex}>
                                <b>{exercise.plan.name}</b>
                                <p>{exercise.plan.sets.join(", ")} reps</p>
                            </div>
                        ))}

                    </div>
                ))
            )}
        </div>
    );
};

export default PreviewWorkout;