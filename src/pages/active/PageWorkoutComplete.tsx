import React from "react";
import { Workout, NullWorkout } from "../../interfaces/Workout";
import LocalStorage, { Keys } from "../../interfaces/Storage";
import { SetPageProps } from "../../App";
import { ActiveSet } from "../../interfaces/Exercise";

interface CompletedWorkout extends Workout {
    id: string;
}

const PageWorkoutComplete = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);
    const [completedWorkouts, setCompletedWorkouts] = LocalStorage<CompletedWorkout[]>("completed-workouts", []);

    // Convert stored date strings back to Date objects
    const startTime = new Date(workout.time.start);
    const endTime = new Date(workout.time.end);

    const calculateWorkoutStats = () => {
        let totalReps = 0;
        let totalWeight = 0;
        let totalSets = 0;

        workout.circuits.forEach(circuit => {
            circuit.forEach(exercise => {
                if (exercise.active?.sets) {
                    exercise.active.sets.forEach((set: ActiveSet) => {
                        totalReps += set.reps;
                        totalWeight += set.weight * set.reps;
                        totalSets++;
                    });
                }
            });
        });

        return {
            totalReps,
            totalWeight,
            totalSets,
            avgWeight: totalWeight / totalReps
        };
    };

    const handleSaveWorkout = () => {
        const completedWorkout: CompletedWorkout = {
            ...workout,
            id: new Date().toISOString()
        };

        setCompletedWorkouts([...completedWorkouts, completedWorkout]);
        
        // Reset the current workout
        setWorkout(NullWorkout);
        
        // Return to home
        setTimeout(() => setPage("home"), 0);
    };

    const stats = calculateWorkoutStats();
    const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

    return (
        <div className="page-workout-complete">
            <h1>Workout Complete</h1>

            <div className="card vertical"> {/* Add vertical class for better spacing */}
                <h2>Workout Summary</h2>
                <div className="stats">
                    <p>Total Sets: {stats.totalSets}</p>
                    <p>Total Reps: {stats.totalReps}</p>
                    <p>Total Volume: {stats.totalWeight}lbs</p>
                    <p>Average Weight: {Math.round(stats.avgWeight)}lbs</p>
                    <p>Duration: {durationMinutes} minutes</p>
                </div>

                <h3>Exercise Details</h3>
                <div className="scroll-container"> {/* Add a container for the scrollable content */}
                    {workout.circuits.map((circuit, circuitIndex) => (
                        <div key={circuitIndex} className="circuit-summary">
                            <h4>Circuit {circuitIndex + 1}</h4>
                            {circuit.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex} className="exercise-summary">
                                    <h5>{exercise.name}</h5>
                                    {exercise.active?.sets.map((set: ActiveSet, setIndex: number) => (
                                        <p key={setIndex}>Set {setIndex + 1}: {set.reps} reps @ {set.weight}lbs</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    <button onClick={handleSaveWorkout}>
                        Save Workout
                    </button>

                    <button onClick={() => setPage("home")}>
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageWorkoutComplete;
