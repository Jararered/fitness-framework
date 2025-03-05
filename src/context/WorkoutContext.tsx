import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import exerciseData from "../data/exercises.json";
import { Exercise, WorkoutPlan, WorkoutLog } from "../types";

interface Settings {
    name: string;
    weight: number;
    height: number;
    unit: "imperial" | "metric";
    darkMode: boolean;
}

interface EquipmentConfig {
    name: string;
    equipment: string[];
}

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
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    equipmentConfigs: EquipmentConfig[];
    setEquipmentConfigs: React.Dispatch<React.SetStateAction<EquipmentConfig[]>>;
    equipmentLast: string;
    setEquipmentLast: React.Dispatch<React.SetStateAction<string>>;
    workoutState: WorkoutState;
    setWorkoutState: React.Dispatch<React.SetStateAction<WorkoutState>>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [exercises] = useState<Exercise[]>(exerciseData);

    const [equipment] = useState<string[]>(() => {
        const allEquipment = exercises.flatMap((ex) => ex.equipment);
        return [...new Set(allEquipment)].sort();
    });
    const [categories] = useState<string[]>(() => {
        const allCategories = exercises.flatMap((ex) => ex.category);
        return [...new Set(allCategories)].sort();
    });
    const [difficulties] = useState<string[]>(() => {
        const allDifficulties = exercises.map((ex) => ex.difficulty);
        return [...new Set(allDifficulties)].sort();
    });

    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(() => {
        const saved = localStorage.getItem("workoutPlans");
        return saved ? JSON.parse(saved) : [];
    });
    const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
        const saved = localStorage.getItem("workoutLogs");
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
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem("settings");
        return saved
            ? JSON.parse(saved)
            : { name: "", weight: 0, height: 0, unit: "metric", darkMode: false };
    });
    const [equipmentConfigs, setEquipmentConfigs] = useState<EquipmentConfig[]>(() => {
        const saved = localStorage.getItem("equipmentConfigs");
        return saved ? JSON.parse(saved) : [];
    });
    const [equipmentLast, setEquipmentLast] = useState<string>(() => {
        const saved = localStorage.getItem("equipmentLast");
        return saved ? JSON.parse(saved) : "";
    });
    const [workoutState, setWorkoutState] = useState<WorkoutState>(() => {
        const saved = localStorage.getItem("workoutState");
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
        localStorage.setItem("workoutPlans", JSON.stringify(workoutPlans));
        localStorage.setItem("workoutLogs", JSON.stringify(workoutLogs));
        localStorage.setItem("settings", JSON.stringify(settings));
        localStorage.setItem("equipmentConfigs", JSON.stringify(equipmentConfigs));
        localStorage.setItem("equipmentLast", JSON.stringify(equipmentLast));
        localStorage.setItem("workoutState", JSON.stringify(workoutState));
    }, [workoutPlans, workoutLogs, settings, equipmentConfigs, equipmentLast, workoutState]);

    return (
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
                settings,
                setSettings,
                equipmentConfigs,
                setEquipmentConfigs,
                equipmentLast,
                setEquipmentLast,
                workoutState,
                setWorkoutState,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
};