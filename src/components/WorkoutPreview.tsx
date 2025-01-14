import { Workout, Circuit } from "../interfaces/Workout";
import { LegsExampleWorkout } from "../interfaces/Examples";
import { FormatSets } from "../utils/Formatting";
import CircuitPreview from "./CircuitPreview";
import LocalStorage, { Keys } from "../interfaces/Storage";

const WorkoutPreview: React.FC = () => {
    const [workout] = LocalStorage<Workout>(Keys.Workout, LegsExampleWorkout);

    return (
        <div className="workout-preview">

            <h2>Workout Preview</h2>

            {workout.circuits.map((circuit: Circuit, circuitIndex: number) => (
                <CircuitPreview key={circuitIndex} circuit={circuit} circuitIndex={circuitIndex} formatCommas={FormatSets} />
            ))}

        </div>
    );
};

export default WorkoutPreview;