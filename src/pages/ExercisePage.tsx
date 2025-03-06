import React, { useState, useEffect, useRef } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const ExercisePage: React.FC = () => {
    const { workoutState, setWorkoutState, settings } = useWorkout();
    const navigate = useNavigate();
    const [repsInput, setRepsInput] = useState<number>(0);
    const [weightInput, setWeightInput] = useState<number>(0);
    const [breakTime, setBreakTime] = useState<number>(60); // 60 seconds break timer
    const timerRef = useRef<number | null>(null); // Use number for browser timer ID

    // Start or reset the timer
    const startTimer = () => {
        if (timerRef.current !== null) clearInterval(timerRef.current); // Clear existing timer
        setBreakTime(60); // Reset to 60 seconds
        timerRef.current = setInterval(() => {
            setBreakTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    };

    useEffect(() => {
        startTimer(); // Start timer on mount
        return () => {
            if (timerRef.current !== null) clearInterval(timerRef.current); // Cleanup on unmount
        };
    }, []); // Empty dependency array for mount only

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];
    const isLastSet = workoutState.currentSetIndex === currentExercise.reps.length - 1;
    const isLastExercise = workoutState.currentExerciseIndex === workoutState.currentPlan.exercises.length - 1;

    // Calculate cumulative stats
    const totalRepsCompleted = workoutState.repsCompleted
        .flat()
        .reduce((sum, val) => sum + (val || 0), 0);
    const totalWeightLifted = workoutState.weightsUsed
        .flat()
        .reduce((sum, val) => sum + (val || 0), 0);

    const handleNext = () => {
        const updatedReps = [...workoutState.repsCompleted];
        const updatedWeights = [...workoutState.weightsUsed];

        if (!updatedReps[workoutState.currentExerciseIndex]) {
            updatedReps[workoutState.currentExerciseIndex] = [];
            updatedWeights[workoutState.currentExerciseIndex] = [];
        }
        updatedReps[workoutState.currentExerciseIndex][workoutState.currentSetIndex] = repsInput;
        updatedWeights[workoutState.currentExerciseIndex][workoutState.currentSetIndex] = weightInput;

        setWorkoutState({
            ...workoutState,
            repsCompleted: updatedReps,
            weightsUsed: updatedWeights,
        });

        if (isLastSet && isLastExercise) {
            navigate("/complete");
        } else if (isLastSet) {
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: 0,
                repsCompleted: updatedReps,
                weightsUsed: updatedWeights,
            });
            navigate("/preview");
        } else {
            setWorkoutState({
                ...workoutState,
                currentSetIndex: workoutState.currentSetIndex + 1,
                repsCompleted: updatedReps,
                weightsUsed: updatedWeights,
            });
            startTimer(); // Reset and start timer on "Next" within exercise
        }

        setRepsInput(0);
        setWeightInput(0);
    };

    return (
        <div className="exercise-page">
            <div className="card">
                <h1>{currentExercise.exercise}</h1>
                {breakTime > 0 && <p>Break: {breakTime}s</p>}
                <p>Set {workoutState.currentSetIndex + 1} of {currentExercise.reps.length}</p>
                <p>Planned Reps: {currentExercise.reps[workoutState.currentSetIndex]}</p>
                <label>Reps Completed</label>
                <input
                    type="number"
                    min="0"
                    value={repsInput}
                    onChange={(e) => setRepsInput(Math.max(0, Number(e.target.value)))}
                />
                <label>Weight Used ({settings.unit})</label>
                <input
                    type="number"
                    min="0"
                    step="2.5"
                    value={weightInput}
                    onChange={(e) => setWeightInput(Math.max(0, Number(e.target.value)))}
                />
                <button onClick={handleNext}>Next</button>
            </div>
            <div className="card">
                <h2>Workout Statistics</h2>
                <p>Total Reps Completed: {totalRepsCompleted}</p>
                <p>Total Weight Lifted: {totalWeightLifted} {settings.unit}</p>
            </div>
        </div>
    );
};

export default ExercisePage;