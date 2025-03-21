type MuscleGroup = "Back" | "Biceps" | "Chest" | "Legs" | "Shoulders" | "Triceps" | "Abs" | "Obliques";
type Equipment =
    | "Barbell"
    | "Cable Machine"
    | "Chest Press Machine"
    | "Dumbbells"
    | "EZ Bar"
    | "Lat Pulldown Machine"
    | "Leg Curl Machine"
    | "Leg Extension Machine"
    | "Leg Press Machine"
    | "Pullup Bar"
    | "Smith Machine";

type Muscle =
    | ""
    | "Abs"
    | "Anterior Deltoids"
    | "Anterior Deltoids"
    | "Anterior Deltoids"
    | "Biceps"
    | "Brachialis"
    | "Brachialis"
    | "Brachioradialis"
    | "Brachioradialis"
    | "Erector Spinae"
    | "Gluteus Maximus"
    | "Hamstrings"
    | "Lateral Deltoids"
    | "Lateral Deltoids"
    | "Lateral Deltoids"
    | "Latissimus Dorsi"
    | "Lower Trapezius"
    | "Lower Trapezius"
    | "Lower Trapezius"
    | "Medial Deltoids"
    | "Medial Deltoids"
    | "Medial Deltoids"
    | "Obliques"
    | "Pectoralis Major"
    | "Pectoralis Major"
    | "Pectoralis Minor"
    | "Pectoralis Minor"
    | "Posterior Deltoids"
    | "Posterior Deltoids"
    | "Posterior Deltoids"
    | "Quadriceps"
    | "Rear Deltoids"
    | "Rhomboids"
    | "Serratus Anterior"
    | "Serratus Anterior"
    | "Sternocleidomastoid"
    | "Sternocleidomastoid"
    | "Sternothyroid"
    | "Sternothyroid"
    | "Supraspinatus"
    | "Supraspinatus"
    | "Teres Major"
    | "Teres Major"
    | "Teres Minor"
    | "Teres Minor"
    | "Trapezius"
    | "Triceps Brachii"
    | "Triceps Brachii"
    | "Triceps"
    | "Triceps"
    | "Triceps"
    | "Upper Trapezius"
    | "Upper Trapezius"
    | "Upper Trapezius";

type Difficulty = "" | "Beginner" | "Intermediate" | "Advanced";

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
                { exercise: "Barbell Bent-Over Row", reps: [10, 10, 10] },
                { exercise: "Barbell Deadlift", reps: [8, 6, 4] },
            ],
        },
        {
            exercises: [
                { exercise: "Leg Press", reps: [10, 8, 6, 4, 2] },
                { exercise: "Leg Extension", reps: [10, 10, 10, 10, 10] },
            ],
        },
        {
            exercises: [
                { exercise: "Dumbbell Bench Press", reps: [15, 12, 10] },
                { exercise: "Dumbbell French Press", reps: [15, 12, 10] },
            ],
        },
        {
            exercises: [
                { exercise: "Lat Pulldown", reps: [10, 10, 10] },
                { exercise: "Lat Pulldown Reverse-Grip", reps: [10, 10, 10] },
            ],
        },
    ],
};
