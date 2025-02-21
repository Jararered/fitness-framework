import LocalStorage, { Keys } from "../interfaces/Storage";

import { NewWorkoutActive, WorkoutActive, WorkoutPlan } from "../interfaces/Workout";
import { LegDayPlan } from "../interfaces/Examples";

const DebugSettings = () => {
    const [workout, setWorkout] = LocalStorage<WorkoutActive>(Keys.Workout, NewWorkoutActive);

    const handleLoadWorkout = (workoutPlan: WorkoutPlan) => {
        const newWorkoutActive: WorkoutActive = {
            plan: workoutPlan,
            time: {
                start: new Date(),
                end: new Date(),
            },
            state: "preview",
            indexer: {
                circuitIndex: 0,
                exerciseIndex: 0,
            },
        };

        setWorkout(newWorkoutActive);
    }

    return (
        <div className="debug-settings">
            <h2>Debug Settings</h2>
            <button onClick={() => handleLoadWorkout(LegDayPlan)}>
                Load Leg Day Workout
            </button>
        </div>
    );
}

export default DebugSettings;