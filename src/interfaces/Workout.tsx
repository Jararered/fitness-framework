import { Exercise } from "./Exercise";

export type Circuit = Exercise[];

export type WorkoutState =
    "preview" |
    "started" |
    "break" |
    "completed";

export interface WorkoutIndexer {
    circuitIndex: number;
    exerciseIndex: number;
}

export interface WorkoutTime {
    start: Date;
    end: Date;
}

export interface WorkoutPlan {
    name: string;
    circuits: Circuit[];
}

export interface WorkoutLog {
    workout: WorkoutPlan;
    time: WorkoutTime;
}

export interface WorkoutActive
{
    plan: WorkoutPlan;
    time: WorkoutTime;
    state: WorkoutState;
    indexer: WorkoutIndexer;
}

export const NewWorkoutActive: WorkoutActive = {
    plan: {
        name: "",
        circuits: []
    },
    time: {
        start: new Date(),
        end: new Date()
    },
    state: "preview",
    indexer: {
        circuitIndex: 0,
        exerciseIndex: 0
    }
};