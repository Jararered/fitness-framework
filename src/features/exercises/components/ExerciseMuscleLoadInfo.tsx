import { LuX, LuEqual } from "react-icons/lu";

interface ExerciseMuscleLoadInfoProps {
    reps: number;
    weight: number;
    units: string;
    totalWeight: number;
}

const ExerciseMuscleLoadInfo: React.FC<ExerciseMuscleLoadInfoProps> = ({ reps, weight, units, totalWeight }) => {
    return (
        <div className="muscular-load-info-footer">
            <div className="muscular-load-info-title">Last Exercise</div>

            <div className="muscular-load-info-visual-calculation">
                <div className="reps-container">
                    <div className="reps-value">{reps}</div>
                    <div className="reps-text">Reps</div>
                </div>

                <div className="multiply-icon">
                    <LuX size={24} />
                </div>

                <div className="weight-container">
                    <div className="weight-value">{weight}</div>
                    <div className="weight-text">{units}</div>
                </div>

                <div className="equals-icon">
                    <LuEqual size={24} />
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

export default ExerciseMuscleLoadInfo;
