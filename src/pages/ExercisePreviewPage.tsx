import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTrophy, FaInfoCircle } from "react-icons/fa";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import { TimerCircular } from "../components/TimerCircular.tsx";
import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/ExercisePreviewPage.css";

interface MuscularLoadProps {
    value: number;
}

const MuscularLoad: React.FC<MuscularLoadProps> = ({ value }) => {
    return (
        <div className="muscular-load">
            <div className="muscular-load-icon">
                <FaTrophy size={20} />
            </div>
            <div className="muscular-load-text">Muscular Load</div>
            <div className="muscular-load-info-icon">
                <FaInfoCircle size={20} />
            </div>
            <div className="muscular-load-value">{value}</div>
        </div>
    );
};

const ExercisePreviewPage: React.FC = () => {
    const { workoutState } = useWorkout();
    const { settings } = useUser();
    const navigate = useNavigate();
    const [breakTime] = useState<number>(60);

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

                <MuscularLoad value={workoutState.weightsUsed.flat().reduce((sum, val) => sum + (val || 0), 0)} />

            </div>
        </div>
    );
};

export default ExercisePreviewPage;