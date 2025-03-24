import { useNavigate } from "react-router-dom";
import { LuPlay } from "react-icons/lu";
import React from "react";

import { useWorkoutStore } from "../features/workouts/hooks/useWorkoutStore.ts";

const WorkoutPreview: React.FC = () => {
    const navigate = useNavigate();
    const { workoutState, setWorkoutState } = useWorkoutStore();

    const handleStartWorkout = () => {
        if (workoutState.currentPlan) {
            // Start the current plan from the beginning
            setWorkoutState({
                ...workoutState,
                isStarted: true,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
            navigate("/exercise");
        }
    };

    const handleResumeWorkout = () => {
        if (workoutState.currentPlan && workoutState.isStarted) {
            navigate("/exercise");
        }
    };

    return (
        <div className="workout-preview component">
            <div className="card-header">
                {workoutState.currentPlan?.name ? <label>{workoutState.currentPlan.name}</label> : ""}
            </div>

            <div className="card-content">
                {workoutState.currentPlan?.circuits ? (
                    <React.Fragment>
                        {workoutState.currentPlan.circuits.map((circuit, index) => (
                            <React.Fragment key={index}>
                                <h2>Circuit {index + 1}</h2>
                                {circuit.exercises.map((exercise, index) => (
                                    <span
                                        className="card-row"
                                        key={index}
                                    >
                                        <label className="left">{exercise.exercise}</label>
                                        <p className="right">{exercise.reps.join(", ")} Reps</p>
                                    </span>
                                ))}
                            </React.Fragment>
                        ))}
                        {workoutState.isStarted ? (
                            <button onClick={handleResumeWorkout}>
                                Resume Workout
                                <LuPlay />
                            </button>
                        ) : (
                            <button onClick={handleStartWorkout}>
                                Start Workout
                                <LuPlay />
                            </button>
                        )}
                    </React.Fragment>
                ) : (
                    <strong>No workout loaded yet.</strong>
                )}
            </div>
        </div>
    );
};

export default WorkoutPreview;
