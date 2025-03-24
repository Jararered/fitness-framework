import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuTrophy, LuCircleAlert, LuX, LuEqual, LuDumbbell } from "react-icons/lu";

import { useContainer } from "../context/ContainerContext.tsx";

import { TimerCircular } from "../components/TimerCircular.tsx";
import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/ExercisePreviewPage.css";

import { QUOTES } from "../data/quotes.ts";

import { useWorkoutStore } from "../features/workouts/hooks/useWorkoutStore.ts";
import { useSettingStore } from "../features/settings/hooks/useSettingStore.ts";
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
                    <LuX />
                </div>

                <div className="weight-container">
                    <div className="weight-value">{weight}</div>
                    <div className="weight-text">{units}</div>
                </div>

                <div className="equals-icon">
                    <LuEqual />
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
    const { workoutState } = useWorkoutStore();
    const { quoteMode, weightUnit } = useSettingStore();
    const navigate = useNavigate();
    const { showFooterCard } = useContainer();

    const [isTimerDone, setIsTimerDone] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const breakTime = 60;

    const [quote] = useState<string>(QUOTES[quoteMode][Math.floor(Math.random() * QUOTES[quoteMode].length)].quote);
    const [author] = useState<string>(QUOTES[quoteMode][Math.floor(Math.random() * QUOTES[quoteMode].length)].author);

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

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    /* These should always be valid since this page is only called after an exercise has been completed */
    /* Last exercise, last set of last exercise */
    const lastExerciseReps = 1;
    const lastExerciseWeight = 1;

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
                                reset={resetTimer}
                                onComplete={() => setIsTimerDone(true)}
                            />
                        </div>
                    }
                    right={
                        <div className="navigation-button-container">
                            <button
                                className={`icon ${isTimerDone ? "" : "caution"}`}
                                onClick={() => {
                                    setResetTimer(true);
                                    navigate("/exercise");
                                }}
                            >
                                <LuArrowRight />
                            </button>
                            <div className="navigation-button-text">{isTimerDone ? "Next" : "Skip Break"}</div>
                        </div>
                    }
                />
                <MuscularLoad
                    reps={lastExerciseReps}
                    weight={lastExerciseWeight}
                    units={weightUnit}
                    totalWeight={workoutState.weightsUsed
                        .flat()
                        .reduce((sum: number, val: number) => sum + (val || 0), 0)}
                />
            </div>
            <UpNextCard
                name={
                    workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises[
                        workoutState.currentExerciseIndex
                    ].exercise
                }
                reps={
                    workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises[
                        workoutState.currentExerciseIndex
                    ].reps[workoutState.currentSetIndex]
                }
            />
        </div>
    );
};

interface ExerciseDetailsProps {
    name: string;
    reps: number;
}

const UpNextCard: React.FC<ExerciseDetailsProps> = ({ name, reps }) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-row">
                    <div className="up-next-text tag left">Up Next</div>
                </span>
                <span className="card-row">
                    <div className="video-placeholder">
                        <div className="video-placeholder-icon">
                            <LuDumbbell />
                        </div>
                    </div>
                    <div className="exercise-details left">
                        <div className="exercise-name">{name}</div>
                        <div className="exercise-sets-reps">{reps} Reps</div>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default ExercisePreviewPage;
