import { Exercise } from "./Exercise";

export type Circuit = Exercise[];

export type WorkoutState =
    "started" |
    "paused" |
    "completed";

export interface WorkoutIndexer {
    circuitIndex: number;
    exerciseIndex: number;
}

export interface WorkoutTime {
    start: Date;
    end: Date;
}

export interface Workout {
    name: string;
    circuits: Circuit[];

    state?: WorkoutState;
    indexer?: WorkoutIndexer;
    time?: WorkoutTime;
}

export const EmptyWorkout: Workout = {
    name: "",
    circuits: []
};
