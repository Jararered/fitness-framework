// Types for the exercise data;

export interface Exercise {
    exercise_name: string;
    required_equipment: string[];
    muscle_group: string[];
    muscles: string[];
    difficulty: string;
}

// Types for planning out a workout

export interface ExercisePlan {
    exercise: string;
    reps: number[];
}

export interface WorkoutPlan {
    name?: string;
    exercises: ExercisePlan[];
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
