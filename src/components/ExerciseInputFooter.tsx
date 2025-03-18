import React, { useState } from "react";

interface ExerciseInputFooterProps {
    exerciseName: string;
    currentSet: number;
    initialReps: number;
    initialWeight: number;
    weightUnit: string;
    onSave: (reps: number, weight: number) => void;
    onCancel: () => void;
}

const ExerciseInputFooter: React.FC<ExerciseInputFooterProps> = ({
    exerciseName,
    currentSet,
    initialReps,
    initialWeight,
    weightUnit,
    onSave,
    onCancel
}) => {
    const [reps, setReps] = useState(initialReps);
    const [weight, setWeight] = useState(initialWeight);

    return (
        <div className="exercise-page-input-container">
            <div className="exercise-page-input-header">
                {exerciseName}
            </div>

            <div className="exercise-page-inputs">
                <div className="input-label set-label">Set</div>
                <div className="input-value set-value">{currentSet}</div>

                <div className="input-label reps-label">Reps</div>
                <input
                    className="input-value reps-value"
                    type="number"
                    value={reps}
                    step={1}
                    onChange={(e) => setReps(Math.max(0, Number(e.target.value)))}
                />

                <div className="input-label weight-label">Weight</div>
                <input
                    className="input-value weight-value"
                    type="number"
                    value={weight}
                    step={2.5}
                    onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
                />

                <div className="input-label unit-label">{weightUnit}</div>
            </div>
            
            <div className="footer-actions">
                <button 
                    className="save-button"
                    onClick={() => onSave(reps, weight)}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ExerciseInputFooter; 