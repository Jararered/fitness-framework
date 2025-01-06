import { useEffect, useState } from "react";

import { Workout, DefaultWorkout, ExerciseEntry, LegsExampleWorkout } from "../../interfaces/Workout";
import { Circuit } from "../../interfaces/Workout";

const WorkoutPreview: React.FC = () => {
    const [workoutState, setWorkoutState] = useState(LegsExampleWorkout);

    // Load from local storage
    useEffect(() => {
        const workout = localStorage.getItem('workout');
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
        localStorage.setItem('workout', JSON.stringify(workout));
    }

    const formatCommas = (reps: number[]) => {
        return reps.join(', ');
    }

    return (
        <div className="workout-preview">

            <h2>Workout Preview</h2>

            {workoutState.circuits.map((circuit: Circuit, circuitIndex: number) => (
                <div key={circuitIndex}>

                    <h3>Circuit {circuitIndex + 1}</h3>

                    {circuit.exercises.map((exercise: ExerciseEntry, exerciseIndex: number) => (
                        <div key={exerciseIndex}>
                            <p>{exercise.name}</p>
                            <p>{formatCommas(exercise.reps)} reps</p>
                        </div>
                    ))}

                </div>
            ))
            }
        </div >
    );
};

export default WorkoutPreview;