import React from "react";
import { useNavigate } from "react-router-dom";
import { LuPlay } from "react-icons/lu";

import { useWorkoutStore } from "../hooks/useWorkoutStore";

import { Card } from "../../layout/components/Card";

const WorkoutPreview: React.FC = () => {
    const navigate = useNavigate();

    const { workoutPlan } = useWorkoutStore();
    const { workoutState, setWorkoutState } = useWorkoutStore();

    const handleStartWorkout = () => {
        if (workoutPlan) {
            // Start the current plan from the beginning
            setWorkoutState({
                ...workoutState,
                currentPlan: workoutPlan,
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
        if (workoutPlan && workoutState.isStarted) {
            navigate("/exercise");
        }
    };

    return (
        <div className="workout-preview component">
            <div className="card-header">{workoutPlan?.name ? <label>{workoutPlan.name}</label> : ""}</div>

            <div className="card-content">
                {workoutPlan?.circuits ? (
                    <React.Fragment>
                        {workoutPlan.circuits.map((circuit, index) => (
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
