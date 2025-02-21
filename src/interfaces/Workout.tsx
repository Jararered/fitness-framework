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

export interface Workout {
    name: string;
    circuits: Circuit[];
    time: WorkoutTime;

    state: WorkoutState;
    indexer: WorkoutIndexer;
}

export const NullWorkout: Workout = {
    name: "",
    circuits: [],
    state: "preview",
    indexer: {
        circuitIndex: 0,
        exerciseIndex: 0
    },
    time: {
        start: new Date(),
        end: new Date()
    }
};
