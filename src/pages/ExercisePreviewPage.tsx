import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuTrophy, LuCircleAlert, LuX, LuEqual } from "react-icons/lu";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useFooterCard } from "../context/FooterCardContext.tsx";

import { TimerCircular } from "../components/TimerCircular.tsx";
import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/ExercisePreviewPage.css";

import { QUOTES } from "../data/quotes.ts";

interface MuscularLoadInfoFooterProps {
    reps: number;
    weight: number;
    units: string;
    totalWeight: number;
}

const MuscularLoadInfoFooter: React.FC<MuscularLoadInfoFooterProps> = ({ reps, weight, units, totalWeight }) => {
    return (
        <div className="muscular-load-info-footer">
            <div className="muscular-load-info-title">Last Exercise</div>

            <div className="muscular-load-info-visual-calculation">
                <div className="reps-container">
                    <div className="reps-value">{reps}</div>
                    <div className="reps-text">Reps</div>
                </div>

                <div className="multiply-icon">
                    <LuX size={20} />
                </div>

                <div className="weight-container">
                    <div className="weight-value">{weight}</div>
                    <div className="weight-text">{units}</div>
                </div>

                <div className="equals-icon">
                    <LuEqual size={20} />
                </div>

                <div className="result-container">
                    <div className="result-value">{weight * reps}</div>
                    <div className="result-units">{units}</div>
                </div>
            </div>

            <div className="muscular-load-info-explaination">
                Muscular Load is a measure of force excerted on your body throughout your workout based on the weights
                logged & your bodyweight.
            </div>

            <div className="muscular-load-info-total-calculation">
                <div className="muscular-load-info-total-calculation-title">Total Muscular Load</div>
                <div className="muscular-load-info-total-calculation-subtitle">This Workout</div>
                <div className="muscular-load-info-total-calculation-value">
                    {totalWeight} {units}
                </div>
            </div>
        </div>
    );
};

interface MuscularLoadProps {
    reps: number; // Reps used in the previous exercise
    weight: number; // Weight used in the previous exercise
    units: string; // Units of the weight
    totalWeight: number; // Total weight used in the workout
}

const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [breakTime, setBreakTime] = useState<number>(60);
    const { showFooterCard } = useFooterCard();

    const [quote] = useState<string>(QUOTES[Math.floor(Math.random() * QUOTES.length)].quote);
    const [author] = useState<string>(QUOTES[Math.floor(Math.random() * QUOTES.length)].author);

    const MuscularLoad: React.FC<MuscularLoadProps> = ({ reps, weight, units, totalWeight }) => {
        return (
            <span className="muscular-load-container">
                <div className="muscular-load-icon">
                    <LuTrophy size={20} />
                </div>
                <div className="muscular-load-text">Muscular Load</div>
                <div className="muscular-load-info-icon">
                    <LuCircleAlert
                        style={{ transform: "rotate(180deg)" }}
                        size={20}
                        onClick={() =>
                            showFooterCard(
                                <MuscularLoadInfoFooter
                                    reps={reps}
                                    weight={weight}
                                    units={units}
                                    totalWeight={totalWeight}
                                />
                            )
                        }
                    />
                </div>
                <div className="muscular-load-value">
                    {totalWeight} {units}
                </div>
            </span>
        );
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

    const handleTimeUpdate = (timeLeft: number) => {
        setBreakTime(timeLeft);
    };

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    /* These should always be valid since this page is only called after an exercise has been completed */
    /* Last exercise, last set of last exercise */
    const lastExerciseReps =
        workoutState.repsCompleted[workoutState.currentExerciseIndex - 1][
            workoutState.repsCompleted[workoutState.currentExerciseIndex - 1].length - 1
        ];
    const lastExerciseWeight =
        workoutState.weightsUsed[workoutState.currentExerciseIndex - 1][
            workoutState.weightsUsed[workoutState.currentExerciseIndex - 1].length - 1
        ];

    return (
        <div className="exercise-preview-page">
            <div className="card">
                <div className="quote-container">
                    <div className="quote">{quote}</div>
                    <div className="author">{author}</div>
                </div>

                <DividerSpaced
                    center={
                        <div className="break-timer-container">
                            <div className="break-timer-text">REST</div>
                            <TimerCircular
                                duration={breakTime}
                                onTimeUpdate={handleTimeUpdate}
                            />
                        </div>
                    }
                    right={
                        <div className="navigation-button-container">
                            <button
                                className={`icon ${breakTime === 0 ? "" : "caution"}`}
                                onClick={() => navigate("/exercise")}
                            >
                                <LuArrowRight />
                            </button>
                            <div className="navigation-button-text">{breakTime === 0 ? "Next" : "Skip Break"}</div>
                        </div>
                    }
                />
                <MuscularLoad
                    reps={lastExerciseReps}
                    weight={lastExerciseWeight}
                    units={handleWeightUnit()}
                    totalWeight={workoutState.weightsUsed.flat().reduce((sum, val) => sum + (val || 0), 0)}
                />
            </div>
        </div>
    );
};

export default ExercisePreviewPage;
