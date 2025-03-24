import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuCheck, LuCirclePlus, LuArrowLeft, LuArrowRight } from "react-icons/lu";

import { useContainer } from "../context/ContainerContext.tsx";

import { DividerSpaced } from "../components/DividerSpaced.tsx";
import ExerciseInputFooter from "../components/ExerciseInputFooter.tsx";

import { QUOTES } from "../data/quotes.ts";

import "../styles/pages/ExercisePage.css";

import { useWorkoutStore } from "../features/workouts/hooks/useWorkoutStore.ts";
import { useSettingStore } from "../features/settings/hooks/useSettingStore.ts";

const ExercisePage: React.FC = () => {
    const navigate = useNavigate();
    const { workoutState, setWorkoutState } = useWorkoutStore();
    const { quoteMode, weightUnit } = useSettingStore();
    const { showFooterCard, hideFooterCard } = useContainer();

    const [repsInput, setRepsInput] = useState<number>(0);
    const [weightInput, setWeightInput] = useState<number>(0);

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise =
        workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises[
            workoutState.currentExerciseIndex
        ];
    if (!currentExercise) return <div>Invalid exercise index</div>;

    const [quote] = useState<string>(QUOTES[quoteMode][Math.floor(Math.random() * QUOTES[quoteMode].length)].quote);
    const [author] = useState<string>(QUOTES[quoteMode][Math.floor(Math.random() * QUOTES[quoteMode].length)].author);

    // These are all relative to their respective parent circuit/exercise/set
    const isFirstCircuit = workoutState.currentCircuitIndex === 0;
    const isLastCircuit = workoutState.currentCircuitIndex === workoutState.currentPlan.circuits.length - 1;
    const isFirstExercise = workoutState.currentExerciseIndex === 0;
    const isLastExercise =
        workoutState.currentExerciseIndex ===
        workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises.length - 1;
    const isFirstSet = workoutState.currentSetIndex === 0;
    const isLastSet =
        workoutState.currentSetIndex ===
        workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises[workoutState.currentExerciseIndex]
            .reps.length -
            1;

    useEffect(() => {
        if (repsInput === 0) {
            setRepsInput(currentExercise.reps[workoutState.currentSetIndex]);
        }
    }, [currentExercise.reps, workoutState.currentSetIndex, repsInput]);

    const handleShowRepsInputFooter = () => {
        const handleSave = (newReps: number, newWeight: number) => {
            setRepsInput(newReps);
            setWeightInput(newWeight);
            hideFooterCard();
        };

        const content = (
            <ExerciseInputFooter
                exerciseName={currentExercise.exercise}
                currentSet={workoutState.currentSetIndex + 1}
                initialReps={repsInput}
                initialWeight={weightInput}
                onSave={handleSave}
            />
        );

        showFooterCard(content);
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

        // Logic for when to navigate to the next exercise
        if (isLastCircuit && isLastExercise && isLastSet) {
            // Reset workout state
            setWorkoutState({
                ...workoutState,
                isStarted: false,
                currentCircuitIndex: 0,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
            });
            navigate("/complete");
        } else if (isLastExercise && isLastSet) {
            // Move to next circuit
            setWorkoutState({
                ...workoutState,
                currentCircuitIndex: workoutState.currentCircuitIndex + 1,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
            });
        } else if (isLastExercise) {
            // Move to next set of first exercise
            setWorkoutState({
                ...workoutState,
                currentCircuitIndex: workoutState.currentCircuitIndex,
                currentExerciseIndex: 0,
                currentSetIndex: workoutState.currentSetIndex + 1,
            });

            navigate("/preview");
        } else {
            // Move to next exercise in same circuit
            setWorkoutState({
                ...workoutState,
                currentCircuitIndex: workoutState.currentCircuitIndex,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: workoutState.currentSetIndex,
            });

            navigate("/preview");
        }

        setRepsInput(0);
        setWeightInput(0);
    };

    const handleBack = () => {
        if (isFirstCircuit && isFirstExercise && isFirstSet) {
            // First set of first exercise of first circuit
            setWorkoutState({
                ...workoutState,
                isStarted: false,
                currentCircuitIndex: 0,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
            });
            navigate("/");
        } else if (isFirstExercise && isFirstSet) {
            // First set of first exercise
            setWorkoutState({
                ...workoutState,
                currentCircuitIndex: workoutState.currentCircuitIndex - 1,
                currentExerciseIndex: workoutState.currentExerciseIndex,
                currentSetIndex: workoutState.currentSetIndex,
            });
        } else if (isFirstExercise) {
            // First set
            setWorkoutState({
                ...workoutState,
                currentCircuitIndex: workoutState.currentCircuitIndex,
                currentExerciseIndex: workoutState.currentExerciseIndex,
                currentSetIndex: workoutState.currentSetIndex - 1,
            });
        } else {
            setWorkoutState({
                ...workoutState,
                currentCircuitIndex: workoutState.currentCircuitIndex,
                currentExerciseIndex: workoutState.currentExerciseIndex + 1,
                currentSetIndex: workoutState.currentSetIndex,
            });
        }
    };

    return (
        <div className="exercise-page">
            <h1>{currentExercise.exercise}</h1>

            <div className="card">
                <div className="card-header">
                    <div className="quote-container">
                        <div className="quote-text">{quote}</div>
                        <div className="quote-author">{author}</div>
                    </div>
                </div>

                <div className="card-content">
                    <div className="last-weight">
                        <div className="last-weight-title">Last Round</div>
                        <span
                            className="last-weight-weight"
                            onClick={handleShowRepsInputFooter}
                        >
                            {weightInput} {weightUnit} {<LuCirclePlus />}
                        </span>
                    </div>

                    <DividerSpaced
                        left={
                            <div className="navigation-button-container">
                                <button
                                    className="icon caution"
                                    // onClick={handleBack}
                                >
                                    <LuArrowLeft />
                                </button>
                                <div className="navigation-button-text">Back</div>
                            </div>
                        }
                        center={
                            <div className="reps-goal">
                                <div className="reps-goal-number">
                                    {currentExercise.reps[workoutState.currentSetIndex]}
                                </div>
                                <div className="reps-goal-text">reps</div>
                            </div>
                        }
                        right={
                            <div className="navigation-button-container">
                                <button
                                    className={`icon ${weightInput === 0 ? "caution" : ""}`}
                                    onClick={handleNext}
                                >
                                    {weightInput === 0 ? <LuArrowRight /> : <LuCheck />}
                                </button>
                                <div className="navigation-button-text">{weightInput === 0 ? "Skip" : "Next"}</div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

const PreviewNextExercise = () => {
    return (
        <div className="preview-next-exercise">
            <h1>Preview Next Exercise</h1>
        </div>
    );
};

const PreviewNextCircuit = () => {
    return (
        <div className="preview-next-circuit">
            <h1>Preview Next Circuit</h1>
        </div>
    );
};

export { ExercisePage, PreviewNextExercise, PreviewNextCircuit };
