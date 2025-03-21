import React, { useEffect } from "react";
import { LuDumbbell, LuArrowDown } from "react-icons/lu";

import { useWorkout } from "../context/WorkoutContext.tsx";

import { ExampleWorkout } from "../data/types.ts";

import "../styles/pages/CircuitPreviewPage.css";

const CircuitPreviewPage: React.FC = () => {
    const { workoutState, setWorkoutState } = useWorkout();

    // Intiialize workout state from example workout
    useEffect(() => {
        setWorkoutState({
            ...workoutState,
            currentPlan: ExampleWorkout,
            isStarted: true,
            currentCircuitIndex: 0,
            currentExerciseIndex: 0,
            currentSetIndex: 0,
            repsCompleted: [],
            weightsUsed: [],
        });
        handleValidateWorkout();
    }, [setWorkoutState]);

    const handleValidateWorkout = () => {
        if (workoutState.currentPlan?.circuits.length === 0) {
            return;
        }
    };

    const handleRepTag = (circuitIndex: number, exerciseIndex: number) => {
        // Returns "Completed" if the circuit index is less than the current circuit index
        // Returns "Round x/y" if the circuit index is equal to the current circuit index
        // Returns "x Rounds" if the circuit index is greater than the current circuit index
        return (
            <React.Fragment>
                {circuitIndex < workoutState.currentCircuitIndex
                    ? "Completed"
                    : circuitIndex === workoutState.currentCircuitIndex
                    ? `Round ${exerciseIndex + 1}/${workoutState.currentPlan?.circuits[circuitIndex].exercises.length}`
                    : `${workoutState.currentPlan?.circuits[circuitIndex].exercises.length} Rounds`}
            </React.Fragment>
        );
    };

    return (
        <div className="workout-preview-page">
            <div className="card">
                <div className="card-header">
                    <h2>FOR TODAY</h2>
                </div>
                <div className="card-content">
                    <div className="workout-preview-container">
                        {/* Iterate over each circuit */}
                        {workoutState.currentPlan?.circuits.map((circuit, circuitIndex) => (
                            <React.Fragment key={circuitIndex}>
                                <div className="circuit-container">
                                    <div className="circuit-header">Circuit {circuitIndex + 1}</div>
                                    <hr />
                                    {/* Iterate over each exercise */}
                                    {circuit.exercises.map((exercise, exerciseIndex) => (
                                        <React.Fragment key={exerciseIndex}>
                                            <div
                                                className="circuit-preview-exercise"
                                                key={exerciseIndex}
                                            >
                                                <span className="exercise-preview-item">
                                                    <div className="exercise-icon">
                                                        <LuDumbbell />
                                                        {/* If the exercise is the current exercise, and the circuit is the current circuit, add a label */}
                                                        {exerciseIndex === workoutState.currentExerciseIndex &&
                                                            circuitIndex === workoutState.currentCircuitIndex && (
                                                                <span className="current-circuit-label">Current</span>
                                                            )}
                                                    </div>
                                                    <div className="exercise-details">
                                                        <div className="exercise-name">{exercise.exercise}</div>
                                                        <div className="exercise-reps">
                                                            {exercise.reps.join(", ")} Reps
                                                        </div>
                                                    </div>
                                                </span>
                                            </div>
                                            {exerciseIndex < circuit.exercises.length - 1 && (
                                                <span className="exercise-divider">
                                                    <p>1:00</p>
                                                    <LuArrowDown />
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <div className="circuit-rep-index">{handleRepTag(circuitIndex, 0)}</div>
                                    {/* Add a divider between exercises */}
                                </div>
                                {circuitIndex < (workoutState.currentPlan?.circuits.length ?? 0) - 1 && (
                                    <div className="circuit-divider">
                                        <div className="circuit-divider-text">Move to next circuit</div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircuitPreviewPage;
