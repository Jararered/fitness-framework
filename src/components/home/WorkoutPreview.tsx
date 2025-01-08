import { useEffect, useState } from "react";
import { Workout, Circuit, LegsExampleWorkout } from "../../interfaces/Workout";
import { FormatSets } from "../utils/Formatting";
import CircuitPreview from "../workout/CircuitPreview";

const WorkoutPreview: React.FC = () => {
    const [workoutState, setWorkoutState] = useState<Workout>(LegsExampleWorkout);

    // Load from local storage
    useEffect(() => {
        const workout = localStorage.getItem("workout");
        if (workout) {
            setWorkoutState(JSON.parse(workout));
        }
        else {
            setWorkoutState(LegsExampleWorkout);
            saveWorkoutLocal(LegsExampleWorkout);
        }
    }, []);

    // Save to local storage
    const saveWorkoutLocal = (workout: Workout) => {
        localStorage.setItem("workout", JSON.stringify(workout));
    }

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