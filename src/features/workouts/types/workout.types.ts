import { CircuitPlan } from "../../circuits/types/circuit.types";
import { ExerciseLog } from "../../exercises/types/exercise.types";

export interface WorkoutPlan {
  name?: string;
  circuits: CircuitPlan[];
}

export interface WorkoutLog {
  workoutId: number;
  exercises: ExerciseLog[];
  startTime: Date;
  endTime: Date;
  totalWeight: number;
  totalReps: number;
}
