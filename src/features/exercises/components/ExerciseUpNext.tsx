import { LuDumbbell } from "react-icons/lu";

import "./ExerciseUpNext.css";

interface ExerciseUpNextProps {
  name: string;
  reps: number;
}

interface ElementProps {
  className?: string;
  children: React.ReactNode;
}

const CardContainer = ({ children, className }: ElementProps) => {
  return <div className={`card-container ${className ?? ""}`}>{children}</div>;
};

const CardHeader = ({ children, className }: ElementProps) => {
  return <div className={`card-header ${className ?? ""}`}>{children}</div>;
};

const CardContent = ({ children, className }: ElementProps) => {
  return <div className={`card-content ${className ?? ""}`}>{children}</div>;
};

export const ExerciseUpNext: React.FC<ExerciseUpNextProps> = ({ name, reps }) => {
  return (
    <CardContainer className="exercise-up-next-container">
      <div className="up-next-text tag">Up Next</div>

      <div className="video-placeholder">
        <LuDumbbell />
      </div>

      <div className="exercise-details">
        <strong className="accent">{name}</strong>
        <p>{reps} Reps</p>
      </div>
    </CardContainer>
  );
};
