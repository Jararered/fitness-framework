import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrophy, FaInfoCircle, FaTimes, FaEquals } from "react-icons/fa";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useFooterCard } from "../context/FooterCardContext.tsx";

import { TimerCircular } from "../components/TimerCircular.tsx";
import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/ExercisePreviewPage.css";

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
                <div className="reps-value">{reps}</div>
                <div className="reps-text">Reps</div>

                <div className="multiply-icon">
                    <FaTimes size={20} />
                </div>

                <div className="weight-value">{weight} {units}</div>
                <div className="weight-text">Weight</div>

                <div className="equals-icon">
                    <FaEquals size={20} />
                </div>

                <div className="muscular-load-value">{weight * reps} {units}</div>
            </div>

            <div className="muscular-load-info-explaination">
                Muscular Load is a measure of force excerted on your body throughout your workout based on the weights logged & your bodyweight.
            </div>

            <div className="muscular-load-info-total-calculation">
                <div className="muscular-load-info-total-calculation-title">TOTAL MUSCULAR LOAD</div>
                <div className="muscular-load-info-total-calculation-title">This Workout</div>
                <div className="muscular-load-info-total-calculation-value">{totalWeight} {units}</div>
            </div>

        </div>
    );
};

interface MuscularLoadProps {
    value: number;
    units: string;
}

const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [breakTime] = useState<number>(60);
    const { showFooterCard, hideFooterCard } = useFooterCard();

    const lastReps = workoutState.repsCompleted[workoutState.currentExerciseIndex][workoutState.currentSetIndex - 1];
    const lastWeight = workoutState.weightsUsed[workoutState.currentExerciseIndex][workoutState.currentSetIndex - 1];

    const MuscularLoad: React.FC<MuscularLoadProps> = ({ value, units }) => {
        return (
            <div className="muscular-load-container">
                <div className="muscular-load-icon">
                    <FaTrophy size={20} />
                </div>
                <div className="muscular-load-text">
                    Muscular Load
                </div>
                <div className="muscular-load-info-icon">
                    <FaInfoCircle size={20} onClick={() => showFooterCard(<MuscularLoadInfoFooter reps={lastReps} weight={lastWeight} units={units} totalWeight={value} />)} />
                </div>
                <div className="muscular-load-value">
                    {value} {units}
                </div>
            </div>
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

    if (!workoutState.currentPlan) return <div>No workout loaded</div>;

    const currentExercise = workoutState.currentPlan.exercises[workoutState.currentExerciseIndex];

    return (
        <div className="exercise-preview-page">
            <div className="card">

                <h1>Up Next</h1>

                <DividerSpaced
                    center={<TimerCircular duration={breakTime} />}
                    right={
                        <div className="skip-break-container">
                            <button className="skip-break-button" onClick={() => navigate("/exercise")}>
                                <FaArrowRight size={20} />
                            </button>
                            <div className="skip-break-text">Skip Break</div>
                        </div>
                    }
                />

                <MuscularLoad value={workoutState.weightsUsed.flat().reduce((sum, val) => sum + (val || 0), 0)} units={handleWeightUnit()} />

            </div>
        </div>
    );
};

export default ExercisePreviewPage;