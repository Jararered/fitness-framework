import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrophy, FaInfoCircle, FaTimes, FaEquals } from "react-icons/fa";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useFooterCard } from "../context/FooterCardContext.tsx";

import { TimerCircular } from "../components/TimerCircular.tsx";
import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/ExercisePreviewPage.css";

import quotes from "../data/quotes.json";

interface MuscularLoadInfoFooterProps {
    reps: number;
    weight: number;
    units: string;
    totalWeight: number;
}

const MuscularLoadInfoFooter: React.FC<MuscularLoadInfoFooterProps> = ({ reps, weight, units, totalWeight }) => {
    return (
        <div className="muscular-load-info-footer">
            <div className="muscular-load-info-title">
                Last Exercise
            </div>

            <div className="muscular-load-info-visual-calculation">
                <div className="reps-container">
                    <div className="reps-value">{reps}</div>
                    <div className="reps-text">Reps</div>
                </div>

                <div className="multiply-icon">
                    <FaTimes size={20} />
                </div>

                <div className="weight-container">
                    <div className="weight-value">{weight}</div>
                    <div className="weight-text">{units}</div>
                </div>

                <div className="equals-icon">
                    <FaEquals size={20} />
                </div>

                <div className="result-container">
                    <div className="result-value">{weight * reps}</div>
                    <div className="result-units">{units}</div>
                </div>
            </div>

            <div className="muscular-load-info-explaination">
                Muscular Load is a measure of force excerted on your body throughout your workout based on the weights logged & your bodyweight.
            </div>

            <div className="muscular-load-info-total-calculation">
                <div className="muscular-load-info-total-calculation-title">Total Muscular Load</div>
                <div className="muscular-load-info-total-calculation-subtitle">This Workout</div>
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
    const { showFooterCard } = useFooterCard();
    const [quote] = useState<string>(quotes[Math.floor(Math.random() * quotes.length)].quote);
    const [author] = useState<string>(quotes[Math.floor(Math.random() * quotes.length)].author);

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
                    <FaInfoCircle size={20}
                        onClick={() => showFooterCard(
                            <MuscularLoadInfoFooter reps={69} weight={420} units={units} totalWeight={69420} />
                        )} />
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
                            <div className="break-text">REST</div>
                            <TimerCircular duration={breakTime} />
                        </div>
                    }
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