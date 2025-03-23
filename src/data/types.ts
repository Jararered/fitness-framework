export type MuscleGroup = "Back" | "Biceps" | "Chest" | "Legs" | "Shoulders" | "Triceps" | "Abs" | "Obliques";

export type Equipment =
    | "Barbell"
    | "Cable Machine"
    | "Chest Press Machine"
    | "Dumbbells"
    | "EZ Bar"
    | "Decline Bench"
    | "Incline Bench"
    | "Flat Bench"
    | "Lat Pulldown Machine"
    | "Leg Curl Machine"
    | "Leg Extension Machine"
    | "Leg Press Machine"
    | "Pullup Bar"
    | "Smith Machine";

export type Muscle =
    | ""
    | "Abs"
    | "Anterior Deltoids"
    | "Biceps"
    | "Brachialis"
    | "Brachioradialis"
    | "Erector Spinae"
    | "Gluteus Maximus"
    | "Hamstrings"
    | "Lateral Deltoids"
    | "Latissimus Dorsi"
    | "Lower Trapezius"
    | "Medial Deltoids"
    | "Obliques"
    | "Pectoralis Major"
    | "Pectoralis Minor"
    | "Posterior Deltoids"
    | "Quadriceps"
    | "Rear Deltoids"
    | "Rhomboids"
    | "Serratus Anterior"
    | "Sternocleidomastoid"
    | "Sternothyroid"
    | "Supraspinatus"
    | "Teres Major"
    | "Teres Minor"
    | "Trapezius"
    | "Triceps Brachii"
    | "Triceps"
    | "Upper Trapezius";

export type Difficulty = "" | "Beginner" | "Intermediate" | "Advanced";

export type Exercise = {
    exercise_name: string;
    muscle_group: MuscleGroup[];
    required_equipment: Equipment[];
    primary_muscles: Muscle[];
    secondary_muscles: Muscle[];
    stabilizing_muscles: Muscle[];
    difficulty: Difficulty;
};

// Types for planning out a workout

export interface ExercisePlan {
    exercise: string;
    reps: number[];
    sets: number;
    style: "drop" | "flat";
    baseReps: number;
}

export interface CircuitPlan {
    exercises: ExercisePlan[];
}

export interface WorkoutPlan {
    name?: string;
    circuits: CircuitPlan[];
}

// Types for logging a workout

export interface ExerciseLog {
    exercise: string;
    reps: number[];
    weight: number[];
    startTime: Date;
    endTime: Date;
}

export interface WorkoutLog {
    workoutId: number;
    exercises: ExerciseLog[];
    startTime: Date;
    endTime: Date;
    totalWeight: number;
    totalReps: number;
}

export const ExampleWorkout: WorkoutPlan = {
    name: "Example Workout",
    circuits: [
        {
            exercises: [
                { exercise: "Barbell Bent-Over Row", reps: [10, 10, 10], sets: 3, style: "flat", baseReps: 10 },
                { exercise: "Barbell Deadlift", reps: [8, 6, 4], sets: 3, style: "drop", baseReps: 8 },
            ],
        },
        {
            exercises: [
                { exercise: "Leg Press", reps: [10, 8, 6, 4, 2], sets: 3, style: "drop", baseReps: 10 },
                { exercise: "Leg Extension", reps: [10, 10, 10, 10, 10], sets: 5, style: "flat", baseReps: 10 },
            ],
        },
        {
            exercises: [
                { exercise: "Dumbbell Bench Press", reps: [15, 12, 10], sets: 3, style: "drop", baseReps: 15 },
                { exercise: "Dumbbell French Press", reps: [15, 12, 10], sets: 3, style: "drop", baseReps: 15 },
            ],
        },
        {
            exercises: [
                { exercise: "Lat Pulldown", reps: [10, 10, 10], sets: 3, style: "flat", baseReps: 10 },
                { exercise: "Lat Pulldown Reverse-Grip", reps: [10, 10, 10], sets: 3, style: "flat", baseReps: 10 },
            ],
        },
    ],
};
