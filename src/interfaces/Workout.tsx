export interface ExerciseEntry {
    name: string; // Ex: "Barbell Squat"
    reps: number[]; // Ex: [10, 10, 10]
}

export type ExerciseList = ExerciseEntry[];

export interface Circuit {
    name: string; // Ex: Machine that the circuit is on
    exercises: ExerciseList; // Ex: [{name: "Barbell Squat", reps: [10, 10, 10]}, {name: "Smith Machine Bench Press", reps: [10, 10, 10]}]
}

export type CircuitList = Circuit[];

export interface DateDetails {
    start: Date;
    end: Date;
}

export interface WorkoutIndexer {
    circuitIndex: number;
    exerciseIndex: number;
}

export type WorkoutState = "started" | "paused" | "completed";


export interface Workout {
    name: string; // Ex: "Leg Day"
    circuits: CircuitList;

    state?: WorkoutState;
    indexer?: WorkoutIndexer;
    date?: DateDetails;
}

export const DefaultWorkout : Workout = {
    name: "Default Workout",
    circuits: []
};

// Example Workouts
export const LegsExampleWorkout: Workout = {
    name: "Leg Day",
    circuits: [
        {
            name: "Smith Machine Circuit",
            exercises: [
                { name: "Smith Machine Squat", reps: [10, 10, 10] },
                { name: "Smith Machine Front Squat", reps: [10, 10, 10] },

            ]
        },
        {
            name: "Leg Extension Circuit",
            exercises: [
                { name: "Leg Extension", reps: [10, 10, 10] },
                { name: "Leg Curl", reps: [10, 10, 10] }
            ]
        }
    ]
};