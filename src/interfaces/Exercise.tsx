import { EquipmentName, Equipment } from "./Equipment";

export type ExerciseName =
    "Barbell Bench Press" |
    "Barbell Bent-Over Row" |
    "Barbell Curl" |
    "Barbell Deadlift" |
    "Barbell Decline Bench Press" |
    "Barbell Front Squat" |
    "Barbell Incline Bench Press" |
    "Barbell Lunge" |
    "Barbell Overhead Press" |
    "Barbell Romanian Deadlift" |
    "Barbell Squat" |
    "Barbell Sumo Deadlift" |
    "Dumbbell Bent-Over Row" |
    "Dumbbell Bicep Curl" |
    "Dumbbell Front Raise" |
    "Dumbbell Hammer Curl" |
    "Dumbbell Lateral Raise" |
    "Dumbbell Lunges" |
    "Dumbbell Shoulder Press" |
    "Dumbbell Shrugs" |
    "Dumbbell Single-Arm Row" |
    "Dumbbell Skull Crushers" |
    "Dumbbell Tricep Extension" |
    "Dumbbell Upright Row" |
    "EZ Bar Close-Grip Curl" |
    "EZ Bar Curl" |
    "EZ Bar Skull Crusher" |
    "EZ Bar Wide-Grip Curl" |
    "Lat Pulldown" |
    "Lat Pulldown Behind-the-Head" |
    "Lat Pulldown Narrow-Grip" |
    "Lat Pulldown Reverse-Grip" |
    "Lat Pulldown Single-Arm" |
    "Lat Pulldown Wide-Grip" |
    "Leg Curl" |
    "Leg Curl + Isometric Hold" |
    "Leg Extension" |
    "Leg Extension + Isometric Hold" |
    "Leg Press" |
    "Machine Chest Press" |
    "Machine Incline Chest Press" |
    "Machine Shoulder Press" |
    "Smith Machine Bench Press" |
    "Smith Machine Bent-Over Row" |
    "Smith Machine Close-Grip Bench Press" |
    "Smith Machine Incline Bench Press" |
    "Smith Machine Lunges" |
    "Smith Machine Shoulder Press" |
    "Smith Machine Shrugs" |
    "Smith Machine Squat";

export const ExerciseNames: ExerciseName[] = [
    "Barbell Bench Press",
    "Barbell Bent-Over Row",
    "Barbell Curl",
    "Barbell Deadlift",
    "Barbell Decline Bench Press",
    "Barbell Front Squat",
    "Barbell Incline Bench Press",
    "Barbell Lunge",
    "Barbell Overhead Press",
    "Barbell Romanian Deadlift",
    "Barbell Squat",
    "Barbell Sumo Deadlift",
    "Dumbbell Bent-Over Row",
    "Dumbbell Bicep Curl",
    "Dumbbell Front Raise",
    "Dumbbell Hammer Curl",
    "Dumbbell Lateral Raise",
    "Dumbbell Lunges",
    "Dumbbell Shoulder Press",
    "Dumbbell Shrugs",
    "Dumbbell Single-Arm Row",
    "Dumbbell Skull Crushers",
    "Dumbbell Tricep Extension",
    "Dumbbell Upright Row",
    "EZ Bar Close-Grip Curl",
    "EZ Bar Curl",
    "EZ Bar Skull Crusher",
    "EZ Bar Wide-Grip Curl",
    "Lat Pulldown",
    "Lat Pulldown Behind-the-Head",
    "Lat Pulldown Narrow-Grip",
    "Lat Pulldown Reverse-Grip",
    "Lat Pulldown Single-Arm",
    "Lat Pulldown Wide-Grip",
    "Leg Curl",
    "Leg Curl + Isometric Hold",
    "Leg Extension",
    "Leg Extension + Isometric Hold",
    "Leg Press",
    "Machine Chest Press",
    "Machine Incline Chest Press",
    "Machine Shoulder Press",
    "Smith Machine Bench Press",
    "Smith Machine Bent-Over Row",
    "Smith Machine Close-Grip Bench Press",
    "Smith Machine Incline Bench Press",
    "Smith Machine Lunges",
    "Smith Machine Shoulder Press",
    "Smith Machine Shrugs",
    "Smith Machine Squat"
];


// Exercise Type
export type ExerciseCategory =
    "Legs" |
    "Biceps" |
    "Triceps" |
    "Chest" |
    "Back" |
    "Shoulders";

export interface ExerciseInfo {
    equipment: EquipmentName;
    category: ExerciseCategory;
}

export interface ExerciseConfig {
    enabled: boolean;
}

export type Reps = number;
export type Sets = Reps[];

export interface ExercisePlan {
    sets: Sets;
}

export interface ExerciseActive {
    sets?: Sets;
    weight?: number;
}

export interface Exercise {
    name: ExerciseName; // Name of the exercise

    info?: ExerciseInfo; // Preset data about the exercise
    config?: ExerciseConfig; // User configuration for the exercise

    plan?: ExercisePlan; // Only while setting up a workout
    active?: ExerciseActive; // Only used during a workout
}

export const GetAvaliableExercises = (exercises: Exercise[], equipment: Equipment[]): ExerciseName[] => {
    const enabledEquipment = equipment.filter(e => e.config.enabled).map(e => e.name);
    return exercises
        .filter(exercise => exercise.config?.enabled && exercise.info?.equipment && enabledEquipment.includes(exercise.info.equipment))
        .map(exercise => exercise.name);
};