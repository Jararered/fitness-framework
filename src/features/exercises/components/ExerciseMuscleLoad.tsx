import { LuCircleAlert, LuTrophy } from "react-icons/lu";

import { useContainer } from "../../../context/ContainerContext.tsx";

import ExerciseMuscleLoadInfo from "./ExerciseMuscleLoadInfo.tsx";

interface ExerciseMuscleLoadProps {
  reps: number;
  weight: number;
  units: string;
  totalWeight: number;
}

const ExerciseMuscleLoad: React.FC<ExerciseMuscleLoadProps> = ({ reps, weight, units, totalWeight }) => {
  const { showFooterCard } = useContainer();

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
              <ExerciseMuscleLoadInfo
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

export default ExerciseMuscleLoad;
