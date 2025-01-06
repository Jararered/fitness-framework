import { EquipmentType } from "./Equipment";

// Exercise Type
export type ExerciseType =
    "Legs" |
    "Biceps" |
    "Triceps" |
    "Chest" |
    "Back" |
    "Shoulders";

// Exercise Interface
interface ExerciseInterface {
    name: string;
    equipment: EquipmentType;
    category: ExerciseType;
    enabled: boolean;
}

export type ExerciseList = ExerciseInterface[];

// Exercises
export const DefaultExercises: ExerciseList = [
    { name: "Barbell Squat", equipment: "Barbell + Squat Rack", category: "Legs", enabled: true },
    { name: "Barbell Front Squat", equipment: "Barbell + Squat Rack", category: "Legs", enabled: true },
    { name: "Barbell Lunge", equipment: "Barbell + Squat Rack", category: "Legs", enabled: true },
    { name: "Smith Machine Squat", equipment: "Smith Machine + Bench", category: "Legs", enabled: true },
    { name: "Smith Machine Lunges", equipment: "Smith Machine + Bench", category: "Legs", enabled: true },
    { name: "Leg Extension", equipment: "Leg Extension Machine", category: "Legs", enabled: true },
    { name: "Leg Extension + Isometric Hold", equipment: "Leg Extension Machine", category: "Legs", enabled: true },
    { name: "Leg Curl", equipment: "Leg Curl Machine", category: "Legs", enabled: true },
    { name: "Leg Curl + Isometric Hold", equipment: "Leg Curl Machine", category: "Legs", enabled: true },
    { name: "Leg Press", equipment: "Leg Press Machine", category: "Legs", enabled: true },
    { name: "Barbell Deadlift", equipment: "Barbell", category: "Legs", enabled: true },
    { name: "Barbell Sumo Deadlift", equipment: "Barbell", category: "Legs", enabled: true },
    { name: "Barbell Romanian Deadlift", equipment: "Barbell + Squat Rack", category: "Legs", enabled: true },
    { name: "Dumbbell Lunges", equipment: "Dumbells", category: "Legs", enabled: true },
    { name: "Dumbbell Bicep Curl", equipment: "Dumbells", category: "Biceps", enabled: true },
    { name: "Dumbbell Hammer Curl", equipment: "Dumbells", category: "Biceps", enabled: true },
    { name: "Barbell Curl", equipment: "Barbell", category: "Biceps", enabled: true },
    { name: "EZ Bar Curl", equipment: "EZ Bar", category: "Biceps", enabled: true },
    { name: "EZ Bar Wide-Grip Curl", equipment: "EZ Bar", category: "Biceps", enabled: true },
    { name: "EZ Bar Close-Grip Curl", equipment: "EZ Bar", category: "Biceps", enabled: true },
    { name: "Dumbbell Tricep Extension", equipment: "Dumbells", category: "Triceps", enabled: true },
    { name: "Dumbbell Skull Crushers", equipment: "Dumbells", category: "Triceps", enabled: true },
    { name: "EZ Bar Skull Crusher", equipment: "EZ Bar", category: "Triceps", enabled: true },
    { name: "Barbell Bench Press", equipment: "Barbell + Bench", category: "Chest", enabled: true },
    { name: "Barbell Incline Bench Press", equipment: "Barbell + Bench", category: "Chest", enabled: true },
    { name: "Barbell Decline Bench Press", equipment: "Barbell + Bench", category: "Chest", enabled: true },
    { name: "Smith Machine Bench Press", equipment: "Smith Machine + Bench", category: "Chest", enabled: true },
    { name: "Smith Machine Close-Grip Bench Press", equipment: "Smith Machine + Bench", category: "Chest", enabled: true },
    { name: "Smith Machine Incline Bench Press", equipment: "Smith Machine + Bench", category: "Chest", enabled: true },
    { name: "Machine Chest Press", equipment: "Chest Press Machine", category: "Chest", enabled: true },
    { name: "Machine Incline Chest Press", equipment: "Chest Press Machine", category: "Chest", enabled: true },
    { name: "Dumbbell Bent-Over Row", equipment: "Dumbells", category: "Back", enabled: true },
    { name: "Dumbbell Single-Arm Row", equipment: "Dumbells", category: "Back", enabled: true },
    { name: "Barbell Bent-Over Row", equipment: "Barbell", category: "Back", enabled: true },
    { name: "Lat Pulldown", equipment: "Lat Pulldown Machine", category: "Back", enabled: true },
    { name: "Lat Pulldown Wide-Grip", equipment: "Lat Pulldown Machine", category: "Back", enabled: true },
    { name: "Lat Pulldown Narrow-Grip", equipment: "Lat Pulldown Machine", category: "Back", enabled: true },
    { name: "Lat Pulldown Reverse-Grip", equipment: "Lat Pulldown Machine", category: "Back", enabled: true },
    { name: "Lat Pulldown Single-Arm", equipment: "Lat Pulldown Machine", category: "Back", enabled: true },
    { name: "Lat Pulldown Behind-the-Head", equipment: "Lat Pulldown Machine", category: "Back", enabled: true },
    { name: "Smith Machine Bent-Over Row", equipment: "Smith Machine", category: "Back", enabled: true },
    { name: "Dumbbell Shoulder Press", equipment: "Dumbells", category: "Shoulders", enabled: true },
    { name: "Dumbbell Lateral Raise", equipment: "Dumbells", category: "Shoulders", enabled: true },
    { name: "Dumbbell Front Raise", equipment: "Dumbells", category: "Shoulders", enabled: true },
    { name: "Dumbbell Shrugs", equipment: "Dumbells", category: "Shoulders", enabled: true },
    { name: "Dumbbell Upright Row", equipment: "Dumbells", category: "Shoulders", enabled: true },
    { name: "Barbell Overhead Press", equipment: "Barbell", category: "Shoulders", enabled: true },
    { name: "Smith Machine Overhead Press", equipment: "Smith Machine", category: "Shoulders", enabled: true },
    { name: "Smith Machine Shrugs", equipment: "Smith Machine", category: "Shoulders", enabled: true },
    { name: "Machine Shoulder Press", equipment: "Chest Press Machine", category: "Shoulders", enabled: true },
];