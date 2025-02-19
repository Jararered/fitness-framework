import LocalStorage, { Keys } from "../interfaces/Storage";

import { Workout } from "../interfaces/Workout";
import { LegsExampleWorkout } from "../interfaces/Examples";

const DebugSettings = () => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, LegsExampleWorkout);

    const handleLoadExampleWorkout = () => {
        setWorkout(LegsExampleWorkout);
    }

    return (
        <div className="debug-settings">

            <h2>Debug Settings</h2>

            <button onClick={handleLoadExampleWorkout}>Load Example Workout</button>

        </div>
    );
}

export default DebugSettings;