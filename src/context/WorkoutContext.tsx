import { createContext, useState, useContext, ReactNode, useEffect } from "react";

import exerciseData from "../data/exercises.json";
import { Exercise, WorkoutPlan, WorkoutLog } from "../types";
import { UserProvider } from "./UserContext";

interface WorkoutState {
    currentPlan: WorkoutPlan | null;
    isStarted: boolean;
    currentExerciseIndex: number;
    currentSetIndex: number;
    repsCompleted: number[][];
    weightsUsed: number[][];
}

interface WorkoutContextType {
    exercises: Exercise[];
    equipment: string[];
    categories: string[];
    difficulties: string[];
    workoutPlans: WorkoutPlan[];
    setWorkoutPlans: React.Dispatch<React.SetStateAction<WorkoutPlan[]>>;
    workoutLogs: WorkoutLog[];
    setWorkoutLogs: React.Dispatch<React.SetStateAction<WorkoutLog[]>>;
    workoutState: WorkoutState;
    setWorkoutState: React.Dispatch<React.SetStateAction<WorkoutState>>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [exercises] = useState<Exercise[]>(exerciseData);

    const [equipment] = useState<string[]>(() => {
        const allEquipment = exercises.flatMap((ex) => ex.required_equipment);
        return [...new Set(allEquipment)].sort();
    });
    const [categories] = useState<string[]>(() => {
        const allCategories = exercises.flatMap((ex) => ex.muscle_group);
        return [...new Set(allCategories)].sort();
    });
    const [difficulties] = useState<string[]>(() => {
        const allDifficulties = exercises.map((ex) => ex.difficulty);
        return [...new Set(allDifficulties)].sort();
    });

    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(() => {
        const saved = localStorage.getItem("workout-plans");
        return saved ? JSON.parse(saved) : [];
    });
    const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
        const saved = localStorage.getItem("workout-logs");
        if (saved) {
            const parsedLogs = JSON.parse(saved);
            return parsedLogs.map((log: WorkoutLog) => ({
                ...log,
                startTime: new Date(log.startTime),
                endTime: new Date(log.endTime),
                exercises: log.exercises.map((ex: any) => ({
                    ...ex,
                    startTime: new Date(ex.startTime),
                    endTime: new Date(ex.endTime),
                })),
            }));
        }
        return [];
    });
    const [workoutState, setWorkoutState] = useState<WorkoutState>(() => {
        const saved = localStorage.getItem("workout-state");
        return saved
            ? JSON.parse(saved)
            : {
                currentPlan: null,
                isStarted: false,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            };
    });

    useEffect(() => {
        localStorage.setItem("workout-plans", JSON.stringify(workoutPlans));
        localStorage.setItem("workout-logs", JSON.stringify(workoutLogs));
        localStorage.setItem("workout-state", JSON.stringify(workoutState));
    }, [workoutPlans, workoutLogs, workoutState]);

    return (
        <UserProvider>
            <WorkoutContext.Provider
                value={{
                    exercises,
                    equipment,
                    categories,
                    difficulties,
                    workoutPlans,
                    setWorkoutPlans,
                    workoutLogs,
                    setWorkoutLogs,
                    workoutState,
                    setWorkoutState,
                }}
            >
                {children}
            </WorkoutContext.Provider>
        </UserProvider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
};