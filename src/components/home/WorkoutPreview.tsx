import { Workout, Circuit, LegsExampleWorkout } from "../../interfaces/Workout";
import { FormatSets } from "../utils/Formatting";
import CircuitPreview from "../workout/CircuitPreview";
import LocalStorage, { Keys } from "../../interfaces/Storage";

const WorkoutPreview: React.FC = () => {
    const [workoutState] = LocalStorage<Workout>(Keys.Workout, LegsExampleWorkout);

    return (
        <div className="workout-preview">

            <h2>Workout Preview</h2>

            {workoutState.circuits.map((circuit: Circuit, circuitIndex: number) => (
                <CircuitPreview key={circuitIndex} circuit={circuit} circuitIndex={circuitIndex} formatCommas={FormatSets} />
            ))}

        </div>
    );
};

export default WorkoutPreview;