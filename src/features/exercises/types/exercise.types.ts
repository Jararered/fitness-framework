import { Equipment } from "../../equipment/types/equipment.types";

export type MuscleGroup = "Back" | "Biceps" | "Chest" | "Legs" | "Shoulders" | "Triceps" | "Abs" | "Obliques";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Exercise = {
    exercise_name: string;
    muscle_group: MuscleGroup;
    required_equipment: Equipment[];

    // TODO: Add primary, secondary, and stabilizing muscles
    difficulty?: Difficulty;
    // primary_muscles?: Muscle[];
    // secondary_muscles?: Muscle[];
    // stabilizing_muscles?: Muscle[];
};

const BACK_EXERCISES: Exercise[] = [
    {
        exercise_name: "Barbell Bent-Over Row",
        muscle_group: "Back",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Barbell Deadlift",
        muscle_group: "Back",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Dumbbell Bent-Over Row",
        muscle_group: "Back",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Single-Arm Row",
        muscle_group: "Back",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Lat Pulldown",
        muscle_group: "Back",
        required_equipment: ["Lat Pulldown Machine"],
    },
    {
        exercise_name: "Lat Pulldown Behind-the-Head",
        muscle_group: "Back",
        required_equipment: ["Lat Pulldown Machine"],
    },
    {
        exercise_name: "Lat Pulldown Narrow-Grip",
        muscle_group: "Back",
        required_equipment: ["Lat Pulldown Machine"],
    },
    {
        exercise_name: "Lat Pulldown Reverse-Grip",
        muscle_group: "Back",
        required_equipment: ["Lat Pulldown Machine"],
    },
    {
        exercise_name: "Lat Pulldown Single-Arm",
        muscle_group: "Back",
        required_equipment: ["Lat Pulldown Machine"],
    },
    {
        exercise_name: "Lat Pulldown Wide-Grip",
        muscle_group: "Back",
        required_equipment: ["Lat Pulldown Machine"],
    },
    {
        exercise_name: "Smith Machine Bent-Over Row",
        muscle_group: "Back",
        required_equipment: ["Smith Machine"],
    },
    {
        exercise_name: "Pullup",
        muscle_group: "Back",
        required_equipment: ["Pullup Bar"],
    },
    {
        exercise_name: "Cable Lat Pulldown",
        muscle_group: "Back",
        required_equipment: ["Cable Machine"],
        difficulty: "Beginner",
    },
    {
        exercise_name: "Seated Cable Row",
        muscle_group: "Back",
        required_equipment: ["Cable Machine"],
        difficulty: "Beginner",
    },
    {
        exercise_name: "Standing Cable Pullover",
        muscle_group: "Back",
        required_equipment: ["Cable Machine"],
        difficulty: "Intermediate",
    },
    {
        exercise_name: "Cable Face Pull",
        muscle_group: "Back",
        required_equipment: ["Cable Machine"],
        difficulty: "Beginner",
    },
    {
        exercise_name: "Straight Arm Cable Pulldown",
        muscle_group: "Back",
        required_equipment: ["Cable Machine"],
        difficulty: "Beginner",
    },
];

const BICEP_EXERCISES: Exercise[] = [
    {
        exercise_name: "Barbell Curl",
        muscle_group: "Biceps",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Dumbbell Bicep Curl",
        muscle_group: "Biceps",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Hammer Curl",
        muscle_group: "Biceps",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "EZ Bar Close-Grip Curl",
        muscle_group: "Biceps",
        required_equipment: ["EZ Bar"],
    },
    {
        exercise_name: "EZ Bar Curl",
        muscle_group: "Biceps",
        required_equipment: ["EZ Bar"],
    },
    {
        exercise_name: "EZ Bar Wide-Grip Curl",
        muscle_group: "Biceps",
        required_equipment: ["EZ Bar"],
    },
];

const CHEST_EXERCISES: Exercise[] = [
    {
        exercise_name: "Barbell Bench Press",
        muscle_group: "Chest",
        required_equipment: ["Barbell", "Flat Bench"],
    },
    {
        exercise_name: "Barbell Decline Bench Press",
        muscle_group: "Chest",
        required_equipment: ["Barbell", "Decline Bench"],
    },
    {
        exercise_name: "Barbell Incline Bench Press",
        muscle_group: "Chest",
        required_equipment: ["Barbell", "Incline Bench"],
    },
    {
        exercise_name: "Machine Chest Press",
        muscle_group: "Chest",
        required_equipment: ["Chest Press Machine"],
    },
    {
        exercise_name: "Machine Incline Chest Press",
        muscle_group: "Chest",
        required_equipment: ["Chest Press Machine"],
    },
    {
        exercise_name: "Smith Machine Bench Press",
        muscle_group: "Chest",
        required_equipment: ["Smith Machine", "Flat Bench"],
    },
    {
        exercise_name: "Smith Machine Close-Grip Bench Press",
        muscle_group: "Chest",
        required_equipment: ["Smith Machine", "Flat Bench"],
    },
    {
        exercise_name: "Smith Machine Incline Bench Press",
        muscle_group: "Chest",
        required_equipment: ["Smith Machine", "Incline Bench"],
    },
];

const LEG_EXERCISES: Exercise[] = [
    {
        exercise_name: "Barbell Front Squat",
        muscle_group: "Legs",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Barbell Lunge",
        muscle_group: "Legs",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Barbell Romanian Deadlift",
        muscle_group: "Legs",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Barbell Squat",
        muscle_group: "Legs",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Barbell Sumo Deadlift",
        muscle_group: "Legs",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Dumbbell Lunges",
        muscle_group: "Legs",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Leg Curl",
        muscle_group: "Legs",
        required_equipment: ["Leg Curl Machine"],
    },
    {
        exercise_name: "Leg Curl + Isometric Hold",
        muscle_group: "Legs",
        required_equipment: ["Leg Curl Machine"],
    },
    {
        exercise_name: "Leg Extension",
        muscle_group: "Legs",
        required_equipment: ["Leg Extension Machine"],
    },
    {
        exercise_name: "Leg Extension + Isometric Hold",
        muscle_group: "Legs",
        required_equipment: ["Leg Extension Machine"],
    },
    {
        exercise_name: "Leg Press",
        muscle_group: "Legs",
        required_equipment: ["Leg Press Machine"],
    },
    {
        exercise_name: "Smith Machine Lunges",
        muscle_group: "Legs",
        required_equipment: ["Smith Machine"],
    },
    {
        exercise_name: "Smith Machine Squat",
        muscle_group: "Legs",
        required_equipment: ["Smith Machine"],
    },
];

const SHOULDER_EXERCISES: Exercise[] = [
    {
        exercise_name: "Barbell Overhead Press",
        muscle_group: "Shoulders",
        required_equipment: ["Barbell"],
    },
    {
        exercise_name: "Dumbbell Front Raise",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Lateral Raise",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Shoulder Press",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Shrugs",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Upright Row",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Machine Shoulder Press",
        muscle_group: "Shoulders",
        required_equipment: ["Chest Press Machine"],
    },
    {
        exercise_name: "Smith Machine Shoulder Press",
        muscle_group: "Shoulders",
        required_equipment: ["Smith Machine"],
    },
    {
        exercise_name: "Smith Machine Shrugs",
        muscle_group: "Shoulders",
        required_equipment: ["Smith Machine"],
    },
    {
        exercise_name: "Dumbell Seated Military Press",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells", "Flat Bench"],
    },
    {
        exercise_name: "Dumbbell Standing Military Press",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Seated Arnold Press",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells", "Flat Bench"],
    },
    {
        exercise_name: "Dumbbell Seated Reverse Arnold Press",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells", "Flat Bench"],
    },
    {
        exercise_name: "Dumbbell Seated Arnold Rotations",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells", "Flat Bench"],
    },
    {
        exercise_name: "Dumbbell Hammer Shrug",
        muscle_group: "Shoulders",
        required_equipment: ["Dumbbells"],
    },
];

const TRICEP_EXERCISES: Exercise[] = [
    {
        exercise_name: "Dumbbell Skull Crushers",
        muscle_group: "Triceps",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Dumbbell Tricep Extension",
        muscle_group: "Triceps",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "EZ Bar Skull Crusher",
        muscle_group: "Triceps",
        required_equipment: ["EZ Bar", "Flat Bench"],
    },
    {
        exercise_name: "Rope Pulldown",
        muscle_group: "Triceps",
        required_equipment: ["Cable Machine"],
    },
];

const OBLIQUE_EXERCISES: Exercise[] = [
    {
        exercise_name: "Dumbbell Side Oblique Crunch",
        muscle_group: "Obliques",
        required_equipment: ["Dumbbells"],
    },
    {
        exercise_name: "Cable Straight Arm Oblique Twist",
        muscle_group: "Obliques",
        required_equipment: ["Cable Machine"],
    },
    {
        exercise_name: "Cable Bent Over Oblique Dig",
        muscle_group: "Obliques",
        required_equipment: ["Cable Machine"],
    },
];
const AB_EXERCISES: Exercise[] = [
    {
        exercise_name: "Rope Crunch",
        muscle_group: "Abs",
        required_equipment: ["Cable Machine"],
    },
    {
        exercise_name: "Hanging Leg Raise",
        muscle_group: "Abs",
        required_equipment: ["Pullup Bar"],
    },
    {
        exercise_name: "Hanging Knee Raise",
        muscle_group: "Abs",
        required_equipment: ["Pullup Bar"],
    },
    {
        exercise_name: "Weighted Hanging Knee Raise",
        muscle_group: "Abs",
        required_equipment: ["Pullup Bar"],
    },
];

export const EXERCISES = [
    ...BACK_EXERCISES,
    ...BICEP_EXERCISES,
    ...CHEST_EXERCISES,
    ...LEG_EXERCISES,
    ...SHOULDER_EXERCISES,
    ...TRICEP_EXERCISES,
    ...OBLIQUE_EXERCISES,
    ...AB_EXERCISES,
];

export const EXERCISES_BY_MUSCLE_GROUP = {
    Back: BACK_EXERCISES,
    Biceps: BICEP_EXERCISES,
    Chest: CHEST_EXERCISES,
    Legs: LEG_EXERCISES,
    Shoulders: SHOULDER_EXERCISES,
    Triceps: TRICEP_EXERCISES,
    Abs: AB_EXERCISES,
    Obliques: OBLIQUE_EXERCISES,
};

export interface ExercisePlan {
    exercise: string;
    reps: number[];
    sets: number;
    style: "drop" | "flat";
    baseReps: number;
}

export enum DifficultyRating {
    Easy = "Easy", // 1
    Moderate = "Moderate", // 2
    Perfect = "Perfect", // 3
    Challenging = "Challenging", // 4
    Hard = "Hard", // 5
}

export interface ExerciseLog {
    exercise: string;
    reps: number[];
    weight: number[];
    difficulty: DifficultyRating;
    startTime: Date;
    endTime: Date;
}
