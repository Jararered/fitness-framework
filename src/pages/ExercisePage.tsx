import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import DividerSpaced from "../components/DividerSpaced.tsx";
import WorkoutStatistics from "../components/WorkoutStatistics.tsx";
import { TimerCircular } from "../components/TimerCircular.tsx";

const ExercisePage: React.FC = () => {
    const { workoutState, setWorkoutState } = useWorkout();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [repsInput, setRepsInput] = useState<number>(0);
    const [weightInput, setWeightInput] = useState<number>(0);
    const [breakTime, setBreakTime] = useState<number>(0);

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];
    const isLastSet = workoutState.currentSetIndex === currentExercise.reps.length - 1;
    const isLastExercise = workoutState.currentExerciseIndex === workoutState.currentPlan.exercises.length - 1;
    const isFirstSet = workoutState.currentSetIndex === 0;
    const isFirstExercise = workoutState.currentExerciseIndex === 0;

    useEffect(() => {
        if (repsInput === 0) {
            setRepsInput(currentExercise.reps[workoutState.currentSetIndex]);
        }
    }, [currentExercise.reps, workoutState.currentSetIndex, repsInput]);

    const handleWeightUnit = () => {
        let weightUnit: string = "";
        if (settings.unit === "metric") {
            weightUnit = "kg";
        } else if (settings.unit === "imperial") {
            weightUnit = "lbs";
        }
        return weightUnit;
    };

    const handleNext = () => {
        const updatedReps = [...workoutState.repsCompleted];
        const updatedWeights = [...workoutState.weightsUsed];

        if (!updatedReps[workoutState.currentExerciseIndex]) {
            updatedReps[workoutState.currentExerciseIndex] = [];
            updatedWeights[workoutState.currentExerciseIndex] = [];
        }

        updatedReps[workoutState.currentExerciseIndex][workoutState.currentSetIndex] = repsInput;
        updatedWeights[workoutState.currentExerciseIndex][workoutState.currentSetIndex] = weightInput * repsInput;

        setWorkoutState({
            ...workoutState,
            repsCompleted: updatedReps,
            weightsUsed: updatedWeights,
        });

        if (isLastSet && isLastExercise) {
            // Last set of last exercise
            navigate("/complete");
        } else if (isLastSet) {
            // Last set of an exercise
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: 0,
                repsCompleted: updatedReps,
                weightsUsed: updatedWeights,
            });
            navigate("/preview");
        } else {
            // Next set of an exercise
            setWorkoutState({
                ...workoutState,
                currentSetIndex: workoutState.currentSetIndex + 1,
                repsCompleted: updatedReps,
                weightsUsed: updatedWeights,
            });
            setBreakTime(60);
        }

        setRepsInput(0);
        setWeightInput(0);
    };

    const handleBack = () => {
        if (isFirstSet && isFirstExercise) {
            navigate("/preview");
        } else if (isFirstSet && workoutState.currentPlan) {
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex - 1,
                currentSetIndex: workoutState.currentPlan.exercises[workoutState.currentExerciseIndex - 1].reps.length - 1,
            });
        } else {
            setWorkoutState({
                ...workoutState,
                currentSetIndex: workoutState.currentSetIndex - 1,
            });
        }
    };

    const handleSkip = () => {
        if (isLastSet && isLastExercise) {
            navigate("/complete");
        } else if (isLastSet) {
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: 0,
            });
            navigate("/preview");
        } else {
            setWorkoutState({
                ...workoutState,
                currentSetIndex: workoutState.currentSetIndex + 1,
            });
            setBreakTime(60);
        }
    };

    return (
        <div className="exercise-page">
            <div className="card">
                <h1>{currentExercise.exercise}</h1>

                <TimerCircular duration={breakTime} />

                <p>Set {workoutState.currentSetIndex + 1} of {currentExercise.reps.length}</p>
                <p>Goal: {currentExercise.reps[workoutState.currentSetIndex]} reps</p>
                <span>
                    <div>
                        <label>Reps</label>
                        <input
                            type="number"
                            min="0"
                            value={repsInput}
                            onChange={(e) => setRepsInput(Math.max(0, Number(e.target.value)))}
                        />
                    </div>
                    <div>
                        <label>Weight ({handleWeightUnit()})</label>
                        <input
                            type="number"
                            min="0"
                            step="2.5"
                            value={weightInput}
                            onChange={(e) => setWeightInput(Math.max(0, Number(e.target.value)))}
                        />
                    </div>
                </span>
                <DividerSpaced
                    left={
                        <button onClick={handleBack} className="secondary">
                            Back
                        </button>
                    }
                    center={
                        <button onClick={handleNext} className="primary">
                            {isLastSet && isLastExercise ? "Complete" : "Next"}
                        </button>
                    }
                    right={
                        <button onClick={handleSkip} className="secondary">
                            Skip
                        </button>
                    }
                />
            </div>
            <WorkoutStatistics
                repsCompleted={workoutState.repsCompleted}
                weightsUsed={workoutState.weightsUsed}
                units={handleWeightUnit()}
            />
        </div>
    );
};


export default ExercisePage;