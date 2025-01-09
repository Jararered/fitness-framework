import { useEffect, useState } from "react";

import { Workout, Circuit, LegsExampleWorkout } from "../../interfaces/Workout";
import { FormatSets } from "../utils/Formatting";
import CircuitPreview from "../workout/CircuitPreview";
import { Keys } from "../../interfaces/Storage";

const WorkoutPreview: React.FC = () => {
    const workoutLocal = localStorage.getItem(Keys.Workout);
    const [workoutState] = useState<Workout>(
        workoutLocal ? JSON.parse(workoutLocal) : LegsExampleWorkout
    );

    useEffect(() => {
        localStorage.setItem(Keys.Workout, JSON.stringify(workoutState));
    }, [workoutState]);

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