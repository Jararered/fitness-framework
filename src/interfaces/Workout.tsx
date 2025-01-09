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

export const LegsExampleWorkout: Workout = {
    name: "Leg Day",
    circuits: [
        [
            {
                name: "Barbell Squat",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Press",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Curl",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Extension",
                plan: { sets: [10, 10, 10] }
            }
        ],
        [
            {
                name: "Leg Curl + Isometric Hold",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Extension + Isometric Hold",
                plan: { sets: [10, 10, 10] }
            }
        ]
    ]
};