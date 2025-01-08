import { ExerciseNames } from "./Exercises";

// ExerciseEntry is a single exercise with a name and a list of reps
export interface ExerciseEntry {
    name: string; // Ex: "Barbell Squat"
    reps: number[]; // Ex: [10, 10, 10]
}

// Circuit is a list of exercises
export type Circuit = ExerciseEntry[]; // Ex: [ExerciseEntry, ExerciseEntry]

export type WorkoutState = "started" | "paused" | "completed";

export interface WorkoutIndexer {
    circuitIndex: number;
    exerciseIndex: number;
}

export interface DateDetails {
    start: Date;
    end: Date;
}

export interface Workout {
    name: string; // Ex: "Leg Day", set by user
    circuits: Circuit[]; // Ex: [[ExerciseEntry, ExerciseEntry], [ExerciseEntry, ExerciseEntry]]

    // Fields for tracking workout state when a user starts a workout
    state?: WorkoutState;
    indexer?: WorkoutIndexer;
    date?: DateDetails;
}

export const EmptyWorkout: Workout = {
    name: "",
    circuits: []
};

// Example Workouts
export const LegsExampleWorkout: Workout = {
    name: "Leg Day",
    circuits: [
        [
            {
                name: ExerciseNames.BarbellSquat,
                reps: [10, 10, 10]
            },
            {
                name: ExerciseNames.LegPress,
                reps: [10, 10, 10]
            },
            {
                name: ExerciseNames.LegCurl,
                reps: [10, 10, 10]
            },
            {
                name: ExerciseNames.LegExtension,
                reps: [10, 10, 10]
            }
        ],
        [
            {
                name: ExerciseNames.LegCurlIsometricHold,
                reps: [10, 10, 10]
            },
            {
                name: ExerciseNames.LegExtensionIsometricHold,
                reps: [10, 10, 10]
            }
        ]
    ]
};