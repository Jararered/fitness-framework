import React, { useState } from "react";

import { useSettingStore } from "../../settings/hooks/useSettingStore.ts";
interface ExerciseInputFooterProps {
    exerciseName: string;
    currentSet: number;
    initialReps: number;
    initialWeight: number;
    onSave: (reps: number, weight: number) => void;
}

const ExerciseInputFooter: React.FC<ExerciseInputFooterProps> = ({
    exerciseName,
    currentSet,
    initialReps,
    initialWeight,
    onSave,
}) => {
    const { weightUnit } = useSettingStore();

    const [reps, setReps] = useState(initialReps);
    const [weight, setWeight] = useState(initialWeight);

    const handleSave = () => {
        // Use placeholder values if no input is provided
        if (reps === 0) {
            setReps(initialReps);
        }
        if (weight === 0) {
            setWeight(initialWeight);
        }

        onSave(reps, weight);
    };

    return (
        <div className="exercise-page-input-container">
            <div className="exercise-page-input-header">{exerciseName}</div>

            <div className="exercise-page-inputs">
                <div className="input-label set-label">Set</div>
                <div className="input-value set-value">{currentSet}</div>

                <div className="input-label reps-label">Reps</div>
                <input
                    className="input-value reps-value"
                    type="number"
                    inputMode="numeric"
                    value={reps}
                    step={1}
                    onChange={(e) => setReps(Math.max(0, Number(e.target.value)))}
                />

                <div className="input-label weight-label">Weight</div>
                <input
                    className="input-value weight-value"
                    type="number"
                    inputMode="decimal"
                    step={2.5}
                    placeholder={initialWeight.toString()}
                    onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
                />

                <div className="input-label unit-label">{weightUnit}</div>
            </div>

            <div className="footer-actions">
                <button
                    className="save-button"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ExerciseInputFooter;
