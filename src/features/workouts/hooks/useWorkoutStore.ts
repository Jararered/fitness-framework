import { create } from "zustand";
import { persist } from "zustand/middleware";

import { WorkoutPlan, WorkoutLog } from "../types/workout.types";

interface WorkoutState {
    currentPlan: WorkoutPlan | null;
    isStarted: boolean;
    currentCircuitIndex: number;
    currentExerciseIndex: number;
    currentSetIndex: number;
    repsCompleted: number[][];
    weightsUsed: number[][];
}

const InitialWorkoutState: WorkoutState = {
    currentPlan: null,
    isStarted: false,
    currentCircuitIndex: 0,
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    repsCompleted: [],
    weightsUsed: [],
};

const InitialWorkoutPlan: WorkoutPlan = {
    name: "",
    circuits: [],
};

interface WorkoutStore {
    workoutPlan: WorkoutPlan;
    setWorkoutPlan: (workoutPlan: WorkoutPlan) => void;
    workoutPlans: WorkoutPlan[];
    setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => void;
    workoutLogs: WorkoutLog[];
    setWorkoutLogs: (workoutLogs: WorkoutLog[]) => void;
    workoutState: WorkoutState;
    setWorkoutState: (workoutState: WorkoutState) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
    persist(
        (set) => ({
            workoutPlan: InitialWorkoutPlan,
            setWorkoutPlan: (workoutPlan: WorkoutPlan) => set({ workoutPlan }),
            workoutPlans: [],
            setWorkoutPlans: (workoutPlans: WorkoutPlan[]) => set({ workoutPlans }),
            workoutLogs: [],
            setWorkoutLogs: (workoutLogs: WorkoutLog[]) => set({ workoutLogs }),
            workoutState: InitialWorkoutState,
            setWorkoutState: (workoutState: WorkoutState) => set({ workoutState }),
        }),
        { name: "workout-store" }
    )
);
