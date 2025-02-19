import { Workout, NullWorkout, WorkoutState } from "../../interfaces/Workout";
import LocalStorage, { Keys } from "../../interfaces/Storage";
import { SetPageProps } from "../../App";
import { useState } from "react";

const PageExercise = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);
    const [exerciseName, setExerciseName] = useState<string>("");
    const [reps, setReps] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);

    const handleGetCurrentExcerciseName = () => {
        if (workout.indexer.circuitIndex >= workout.circuits.length)
            return "";

        if (workout.indexer.exerciseIndex >= workout.circuits[workout.indexer.circuitIndex].length)
            return "";

        const circuit = workout.circuits[workout.indexer.circuitIndex];
        const exercise = circuit[workout.indexer.exerciseIndex];
        return exercise.name;
    };

    const handleNextExercise = () => {
        const newWorkout = { ...workout };
        newWorkout.indexer.exerciseIndex++;

        // If the exercise index is greater than the length of the circuit
        // then move to the next circuit
        if (newWorkout.indexer.exerciseIndex >= newWorkout.circuits[newWorkout.indexer.circuitIndex].length) {
            newWorkout.indexer.exerciseIndex = 0;

            // Check if the circuit index is greater than the length of the circuits
            // then the workout is complete
            newWorkout.indexer.circuitIndex++;
            if (newWorkout.indexer.circuitIndex >= newWorkout.circuits.length) {
                newWorkout.state = "complete" as WorkoutState;
                newWorkout.time.end = new Date();
                newWorkout.indexer.circuitIndex = 0;
                newWorkout.indexer.exerciseIndex = 0;

                setWorkout(newWorkout);
                setTimeout(() => setPage("workout-complete"), 0);
                return;
            }

            setWorkout(newWorkout);
            setTimeout(() => setPage("circuit-preview"), 0);
            return;
        }

        setWorkout(newWorkout);
    };

    const handleSkipExercise = () => {
        const newWorkout = { ...workout };
        newWorkout.indexer.exerciseIndex++;

        if (newWorkout.indexer.exerciseIndex >= newWorkout.circuits[newWorkout.indexer.circuitIndex].length) {
            newWorkout.indexer.exerciseIndex = 0;
            newWorkout.indexer.circuitIndex++;
            setWorkout(newWorkout);
            setTimeout(() => setPage("circuit-preview"), 0);
        }

        setWorkout(newWorkout);
    }

    const handleEndWorkout = () => {
        const newWorkout = { ...workout };

        // Set the workout state to complete
        newWorkout.state = "complete" as WorkoutState;

        // Reset the indexer
        newWorkout.indexer.circuitIndex = 0;
        newWorkout.indexer.exerciseIndex = 0;

        setWorkout(newWorkout);
        setTimeout(() => setPage("workout-complete"), 0);
    }

    return (
        <div className="page-exercise">
            <h1>Exercise</h1>

            <div className="card">
                <h2>{handleGetCurrentExcerciseName()}</h2>
                <div className="flex">
                    <button
                        onClick={handleNextExercise}>
                        Next Exercise
                    </button>

                    <button
                        onClick={handleSkipExercise}>
                        Skip Exercise
                    </button>
                </div>

                <div className="flex">
                    <button
                        className="bad"
                        onClick={handleEndWorkout}>
                        End Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageExercise;
