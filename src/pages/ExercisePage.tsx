import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuCheck, LuCirclePlus, LuArrowLeft } from "react-icons/lu";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useFooterCard } from "../context/FooterCardContext.tsx";

import { DividerSpaced } from "../components/DividerSpaced.tsx";
import ExerciseInputFooter from "../components/ExerciseInputFooter.tsx";

import "../styles/pages/ExercisePage.css";

import { QUOTES } from "../data/quotes.ts";

const ExercisePage: React.FC = () => {
    const navigate = useNavigate();
    const { workoutState, setWorkoutState } = useWorkout();
    const { settings } = useUser();
    const { showFooterCard, hideFooterCard } = useFooterCard();

    const [repsInput, setRepsInput] = useState<number>(0);
    const [weightInput, setWeightInput] = useState<number>(0);

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];
    const isLastSet = workoutState.currentSetIndex === currentExercise.reps.length - 1;
    const isLastExercise = workoutState.currentExerciseIndex === workoutState.currentPlan.exercises.length - 1;
    const isFirstSet = workoutState.currentSetIndex === 0;
    const isFirstExercise = workoutState.currentExerciseIndex === 0;

    const [randomQuote, setRandomQuote] = useState<string>("");
    const [randomQuoteAuthor, setRandomQuoteAuthor] = useState<string>("");
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setRandomQuote(QUOTES[randomIndex].quote);
        setRandomQuoteAuthor(QUOTES[randomIndex].author);
    }, []);

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
                weightUnit={handleWeightUnit()}
                onSave={handleSave}
                onCancel={hideFooterCard}
            />
        );

        showFooterCard(content);
    };

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
        }

        setRepsInput(0);
        setWeightInput(0);
    };

    const handleBack = () => {
        if (isFirstSet && isFirstExercise) {
            // Reset workout state
            setWorkoutState({
                ...workoutState,
                isStarted: false,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
            navigate("/");
        } else if (isFirstSet && workoutState.currentPlan) {
            setWorkoutState({
                ...workoutState,
                currentExerciseIndex: workoutState.currentExerciseIndex - 1,
                currentSetIndex:
                    workoutState.currentPlan.exercises[workoutState.currentExerciseIndex - 1].reps.length - 1,
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
        }
    };

    return (
        <div className="exercise-page">
            <h1>{currentExercise.exercise}</h1>

            <div className="card">
                <div className="card-header">
                    <div className="quote-container">
                        <div className="quote-text">{randomQuote}</div>
                        <div className="quote-author">{randomQuoteAuthor}</div>
                    </div>
                </div>

                <div className="card-content">
                    <div className="last-weight">
                        <div className="last-weight-title">Last Round</div>
                        <span
                            className="last-weight-weight"
                            onClick={handleShowRepsInputFooter}
                        >
                            {weightInput} {handleWeightUnit()} {<LuCirclePlus />}
                        </span>
                    </div>

                    <DividerSpaced
                        left={
                            <div className="navigation-button-container">
                                <button
                                    className="icon caution"
                                    onClick={handleBack}
                                >
                                    <LuArrowLeft />
                                </button>
                                <div className="navigation-button-text">Back</div>
                            </div>
                        }
                        center={
                            <div className="reps-goal">
                                <div
                                    onClick={() => setRepsInput(13)}
                                    className="reps-goal-number"
                                >
                                    {currentExercise.reps[workoutState.currentSetIndex]}
                                </div>
                                <div className="reps-goal-text">reps</div>
                            </div>
                        }
                        right={
                            <div className="navigation-button-container">
                                <button
                                    className="icon"
                                    onClick={handleNext}
                                >
                                    <LuCheck />
                                </button>
                                <div className="navigation-button-text">Next</div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ExercisePage;
