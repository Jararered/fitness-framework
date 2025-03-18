import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaPlusCircle } from "react-icons/fa";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useFooterCard } from "../context/FooterCardContext.tsx";

import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/ExercisePage.css";

import quotes from "../data/quotes.json";

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
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex].quote);
        setRandomQuoteAuthor(quotes[randomIndex].author);
    }, []);

    useEffect(() => {
        if (repsInput === 0) {
            setRepsInput(currentExercise.reps[workoutState.currentSetIndex]);
        }
    }, [currentExercise.reps, workoutState.currentSetIndex, repsInput]);

    const handleShowRepsInputFooter = () => {
        const content = (
            <div className="exercise-page-input-container">
                {/* Show the current exercise Name */}
                <div>
                    <h2>{currentExercise.exercise}</h2>
                </div>

                <div className="exercise-page-inputs">
                    {/* Shows the current set number */}
                    <div className="input-label set-label">Set</div>
                    <div className="input-value set-value">{workoutState.currentSetIndex + 1}</div>

                    {/* Shows the reps input */}
                    <div className="input-label reps-label">Reps</div>
                    <input
                        className="input-value reps-value"
                        type="number"
                        value={repsInput}
                        step={1}
                        onChange={(e) => setRepsInput(Math.max(0, Number(e.target.value)))}
                    />

                    {/* Shows the weight input */}
                    <div className="input-label weight-label">Weight</div>
                    <input
                        className="input-value weight-value"
                        type="number"
                        value={weightInput}
                        step={2.5}
                        onChange={(e) => setWeightInput(Math.max(0, Number(e.target.value)))}
                    />

                    {/* Shows the weight unit */}
                    <div className="input-label unit-label">{handleWeightUnit()}</div>
                </div>
            </div>
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
        }
    };

    return (
        <div className="exercise-page">

            <h1>{currentExercise.exercise}</h1>

            <div className="card">

                <div className="quote-container">
                    <div className="quote-text">{randomQuote}</div>
                    <div className="quote-author">{randomQuoteAuthor}</div>
                </div>

                <div className="last-weight">
                    <div className="last-weight-title">Last Round</div>
                    <div className="last-weight-weight" onClick={handleShowRepsInputFooter}>{weightInput} {handleWeightUnit()} {<FaPlusCircle size={16} />}</div>
                </div>

                <DividerSpaced
                    center={
                        <div className="reps-goal">
                            <div onClick={() => setRepsInput(13)} className="reps-goal-number">{currentExercise.reps[workoutState.currentSetIndex]}</div>
                            <div className="reps-goal-text">reps</div>
                        </div>
                    }
                    right={
                        <div className="next-exercise-container">
                            <button className="next-exercise-button" onClick={handleNext}>
                                <FaCheck size={20} />
                            </button>
                            <div className="next-exercise-text">Next</div>
                        </div>
                    }
                />

                <DividerSpaced
                    left={
                        <button onClick={handleBack}>
                            Back
                        </button>
                    }
                    center={
                        <button onClick={handleNext}>
                            {isLastSet && isLastExercise ? "Complete" : "Next"}
                        </button>
                    }
                    right={
                        <button onClick={handleSkip}>
                            Skip
                        </button>
                    }
                />
            </div>

        </div>
    );
};

export default ExercisePage;