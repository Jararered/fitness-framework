import { Workout, NullWorkout, WorkoutState } from "../../interfaces/Workout";
import LocalStorage, { Keys } from "../../interfaces/Storage";
import { SetPageProps } from "../../App";
import { useState, useEffect } from "react";
import { ActiveSet } from "../../interfaces/Exercise";

const PageExercise = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);
    const [reps, setReps] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);

    const getCurrentExercise = () => {
        const circuit = workout.circuits[workout.indexer.circuitIndex];
        if (!circuit) return null;
        const exerciseInCircuit = workout.indexer.exerciseIndex % circuit.length;
        return circuit[exerciseInCircuit];
    };

    const getCurrentSetNumber = () => {
        const circuit = workout.circuits[workout.indexer.circuitIndex];
        if (!circuit) return 0;
        return Math.floor(workout.indexer.exerciseIndex / circuit.length);
    };

    const exercise = getCurrentExercise();
    const currentSet = getCurrentSetNumber();
    const totalSets = exercise?.sets?.length || 0;
    const completedSets = exercise?.active?.sets || [];

    useEffect(() => {
        if (exercise && exercise.sets && exercise.sets[currentSet] !== undefined) {
            setReps(exercise.sets[currentSet]);
        }
    }, [exercise, currentSet]);

    const handleNextExercise = () => {
        const newWorkout = { ...workout };
        const exercise = getCurrentExercise();
        if (!exercise) return;

        // Initialize exercise active state if needed
        if (!exercise.active) {
            exercise.active = {
                sets: [],
                currentSet: 0
            };
        }

        // Save current set data
        exercise.active.sets[currentSet] = {
            reps,
            weight
        };

        // Get current circuit info
        const circuit = newWorkout.circuits[newWorkout.indexer.circuitIndex];
        const maxSets = Math.max(...circuit.map(ex => ex.sets?.length || 0));

        // Move to next exercise
        newWorkout.indexer.exerciseIndex++;

        // If we've completed a full round of exercises
        if (newWorkout.indexer.exerciseIndex % circuit.length === 0) {
            const nextSetNumber = getCurrentSetNumber();

            // If there are more sets to do
            if (nextSetNumber < maxSets) {
                setReps(0);
                setWeight(0);
                setWorkout(newWorkout);
                return;
            }

            // Move to next circuit
            newWorkout.indexer.circuitIndex++;
            newWorkout.indexer.exerciseIndex = 0;

            // Check if workout is complete
            if (newWorkout.indexer.circuitIndex >= newWorkout.circuits.length) {
                newWorkout.state = "completed" as WorkoutState;
                // Store end time as ISO string for consistent serialization
                newWorkout.time.end = new Date().toISOString();
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

        setReps(0);
        setWeight(0);
        setWorkout(newWorkout);
    };

    const handleSkipExercise = () => {
        const newWorkout = { ...workout };
        const exercise = getCurrentExercise();
        if (!exercise) return;

        // Initialize and save empty set
        if (!exercise.active) {
            exercise.active = {
                sets: [],
                currentSet: 0
            };
        }

        exercise.active.sets[currentSet] = {
            reps: 0,
            weight: 0
        };

        // Use same progression logic as handleNextExercise
        const circuit = newWorkout.circuits[newWorkout.indexer.circuitIndex];
        const maxSets = Math.max(...circuit.map(ex => ex.sets?.length || 0));

        newWorkout.indexer.exerciseIndex++;

        if (newWorkout.indexer.exerciseIndex % circuit.length === 0) {
            const nextSetNumber = getCurrentSetNumber();

            if (nextSetNumber < maxSets) {
                setReps(0);
                setWeight(0);
                setWorkout(newWorkout);
                return;
            }

            newWorkout.indexer.circuitIndex++;
            newWorkout.indexer.exerciseIndex = 0;

            if (newWorkout.indexer.circuitIndex >= newWorkout.circuits.length) {
                newWorkout.state = "completed" as WorkoutState;
                // Store end time as ISO string for consistent serialization
                newWorkout.time.end = new Date().toISOString();
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

        setReps(0);
        setWeight(0);
        setWorkout(newWorkout);
    };

    const handleEndWorkout = () => {
        const newWorkout = { ...workout };
        newWorkout.state = "completed" as WorkoutState;
        // Store end time as ISO string for consistent serialization
        newWorkout.time.end = new Date().toISOString();
        newWorkout.indexer.circuitIndex = 0;
        newWorkout.indexer.exerciseIndex = 0;
        setWorkout(newWorkout);
        setTimeout(() => setPage("workout-complete"), 0);
    };

    return (
        <div className="page-exercise">
            <h1>Exercise</h1>

            <div className="card">
                <h2>{exercise?.name || "No exercise"}</h2>
                <p>Set {currentSet + 1} of {totalSets}</p>

                <div className="circuit-progress">
                    <p>Exercise {(workout.indexer.exerciseIndex % workout.circuits[workout.indexer.circuitIndex]?.length) + 1} of {workout.circuits[workout.indexer.circuitIndex]?.length}</p>
                </div>

                <div className="completed-sets">
                    {completedSets.map((set: ActiveSet, index: number) => (
                        <div key={index} className="completed-set">
                            Set {index + 1}: {set.reps} reps @ {set.weight}lbs
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(parseInt(e.target.value) || 0)}
                        placeholder="Enter number of reps"
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                        placeholder="Enter weight in lbs"
                    />
                </div>

                <div className="flex">
                    <button onClick={handleNextExercise}>
                        {currentSet + 1 >= totalSets && (workout.indexer.exerciseIndex % workout.circuits[workout.indexer.circuitIndex]?.length) + 1 >= workout.circuits[workout.indexer.circuitIndex]?.length ? "Next Circuit" : "Next Exercise"}
                    </button>

                    <button onClick={handleSkipExercise}>
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
