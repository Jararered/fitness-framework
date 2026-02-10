import { create } from "zustand";
import { persist, devtools, StorageValue } from "zustand/middleware";
import { z } from "zod";
import { EXERCISES } from "../data/exercises";
import { Exercise, WorkoutPlan, WorkoutLog, ExerciseLog } from "../data/types";

// Zod schemas for validation
const ExercisePlanSchema = z.object({
    exercise: z.string(),
    reps: z.array(z.number()),
    sets: z.number(),
    style: z.enum(["drop", "flat"]),
    baseReps: z.number(),
});

const CircuitPlanSchema = z.object({
    exercises: z.array(ExercisePlanSchema),
});

const WorkoutPlanSchema = z.object({
    name: z.string().optional(),
    circuits: z.array(CircuitPlanSchema),
});

const ExerciseLogSchema = z.object({
    exercise: z.string(),
    reps: z.array(z.number()),
    weight: z.array(z.number()),
    startTime: z.coerce.date(), // Coerce string to Date
    endTime: z.coerce.date(),
});

const WorkoutLogSchema = z.object({
    workoutId: z.number(),
    exercises: z.array(ExerciseLogSchema),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    totalWeight: z.number(),
    totalReps: z.number(),
});

const WorkoutStateSchema = z.object({
    currentPlan: WorkoutPlanSchema.nullable(),
    isStarted: z.boolean(),
    currentCircuitIndex: z.number(),
    currentExerciseIndex: z.number(),
    currentSetIndex: z.number(),
    repsCompleted: z.array(z.array(z.number())),
    weightsUsed: z.array(z.array(z.number())),
});

interface WorkoutState {
    currentPlan: WorkoutPlan | null;
    isStarted: boolean;
    currentCircuitIndex: number;
    currentExerciseIndex: number;
    currentSetIndex: number;
    repsCompleted: number[][];
    weightsUsed: number[][];
}

interface WorkoutStore {
    // Derived static data (not persisted)
    exercises: Exercise[];
    equipment: string[];
    categories: string[];
    difficulties: string[];

    // Persisted state
    workoutPlans: WorkoutPlan[];
    workoutLogs: WorkoutLog[];
    workoutState: WorkoutState;

    // Actions
    setWorkoutPlans: (plans: WorkoutPlan[] | ((prev: WorkoutPlan[]) => WorkoutPlan[])) => void;
    setWorkoutLogs: (logs: WorkoutLog[] | ((prev: WorkoutLog[]) => WorkoutLog[])) => void;
    setWorkoutState: (state: WorkoutState | ((prev: WorkoutState) => WorkoutState)) => void;
}

const isDevelopment = import.meta.env.MODE === "development";

// Custom storage with Date reconstruction
const workoutStorage = {
    getItem: (name: string): StorageValue<WorkoutStore> | null => {
        const str = localStorage.getItem(name);
        if (!str) return null;

        try {
            const parsed = JSON.parse(str);

            // Validate and reconstruct Date objects in workoutLogs
            if (parsed.state?.workoutLogs) {
                parsed.state.workoutLogs = parsed.state.workoutLogs.map((log: WorkoutLog) => ({
                    ...log,
                    startTime: new Date(log.startTime),
                    endTime: new Date(log.endTime),
                    exercises: log.exercises.map((ex: ExerciseLog) => ({
                        ...ex,
                        startTime: new Date(ex.startTime),
                        endTime: new Date(ex.endTime),
                    })),
                }));

                // Validate after Date reconstruction
                z.array(WorkoutLogSchema).parse(parsed.state.workoutLogs);
            }

            // Validate workoutPlans
            if (parsed.state?.workoutPlans) {
                z.array(WorkoutPlanSchema).parse(parsed.state.workoutPlans);
            }

            // Validate workoutState
            if (parsed.state?.workoutState) {
                WorkoutStateSchema.parse(parsed.state.workoutState);
            }

            return parsed;
        } catch (error) {
            console.error("Invalid workout data in localStorage:", error);
            
            // Log warning, show toast, and reset
            if (typeof window !== "undefined") {
                console.warn("Workout data has been reset due to invalid data");
            }
            
            localStorage.removeItem(name);
            return null;
        }
    },
    setItem: (name: string, value: StorageValue<WorkoutStore>) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
};

export const useWorkoutStore = create<WorkoutStore>()(
    devtools(
        persist(
            (set) => {
                const exercises = EXERCISES as Exercise[];
                const equipment = [...new Set(exercises.flatMap((ex) => ex.required_equipment))].sort();
                const categories = [...new Set(exercises.flatMap((ex) => ex.muscle_group))].sort();
                const difficulties = [...new Set(exercises.map((ex) => ex.difficulty))].sort();

                return {
                    // Static computed values (not persisted)
                    exercises,
                    equipment,
                    categories,
                    difficulties,

                    // Initial persisted state
                    workoutPlans: [],
                    workoutLogs: [],
                    workoutState: {
                        currentPlan: null,
                        isStarted: false,
                        currentCircuitIndex: 0,
                        currentExerciseIndex: 0,
                        currentSetIndex: 0,
                        repsCompleted: [],
                        weightsUsed: [],
                    },

                    // Actions with updater function support
                    setWorkoutPlans: (plans) =>
                        set((state) => ({
                            workoutPlans: typeof plans === "function" ? plans(state.workoutPlans) : plans,
                        })),

                    setWorkoutLogs: (logs) =>
                        set((state) => ({
                            workoutLogs: typeof logs === "function" ? logs(state.workoutLogs) : logs,
                        })),

                    setWorkoutState: (workoutState) =>
                        set((state) => ({
                            workoutState:
                                typeof workoutState === "function" ? workoutState(state.workoutState) : workoutState,
                        })),
                };
            },
            {
                name: "fitness-workout-store",
                storage: workoutStorage,
                // Don't use partialize - handle selective persistence in storage layer
            }
        ),
        {
            name: "WorkoutStore",
            enabled: isDevelopment,
        }
    )
);
