import { Exercise } from "./types";

type EXERCISE_NAMES =
    | "Barbell Bent-Over Row"
    | "Barbell Deadlift"
    | "Dumbbell Bent-Over Row"
    | "Dumbbell Single-Arm Row"
    | "Lat Pulldown"
    | "Lat Pulldown Behind-the-Head"
    | "Lat Pulldown Narrow-Grip"
    | "Lat Pulldown Reverse-Grip"
    | "Lat Pulldown Single-Arm"
    | "Lat Pulldown Wide-Grip"
    | "Smith Machine Bent-Over Row"
    | "Barbell Curl"
    | "Dumbbell Bicep Curl"
    | "Dumbbell Hammer Curl"
    | "EZ Bar Close-Grip Curl"
    | "EZ Bar Curl"
    | "EZ Bar Wide-Grip Curl"
    | "Machine Chest Press"
    | "Machine Incline Chest Press"
    | "Smith Machine Bench Press"
    | "Smith Machine Close-Grip Bench Press"
    | "Smith Machine Incline Bench Press"
    | "Barbell Front Squat"
    | "Barbell Lunge"
    | "Barbell Romanian Deadlift"
    | "Barbell Squat"
    | "Barbell Sumo Deadlift"
    | "Dumbbell Lunges"
    | "Leg Curl"
    | "Leg Curl + Isometric Hold"
    | "Leg Extension"
    | "Leg Extension + Isometric Hold"
    | "Leg Press"
    | "Smith Machine Lunges"
    | "Smith Machine Squat"
    | "Barbell Overhead Press"
    | "Dumbbell Front Raise"
    | "Dumbbell Lateral Raise"
    | "Dumbbell Shoulder Press"
    | "Dumbbell Shrugs"
    | "Dumbbell Upright Row"
    | "Machine Shoulder Press"
    | "Smith Machine Shoulder Press"
    | "Smith Machine Shrugs"
    | "Dumbell Seated Military Press"
    | "Dumbbell Standing Military Press"
    | "Dumbbell Seated Arnold Press"
    | "Dumbbell Seated Reverse Arnold Press"
    | "Dumbbell Seated Arnold Rotations"
    | "Dumbbell Hammer Shrug"
    | "Dumbbell Skull Crushers"
    | "Dumbbell Tricep Extension"
    | "EZ Bar Skull Crusher"
    | "Rope Pulldown"
    | "Dumbbell Side Oblique Crunch"
    | "Cable Straight Arm Oblique Twist"
    | "Cable Bent Over Oblique Dig"
    | "Rope Crunch"
    | "Hanging Leg Raise"
    | "Hanging Knee Raise"
    | "Weighted Hanging Knee Raise";

const BACK_EXERCISES: Exercise[] = [
    {
        exercise_name: "Barbell Bent-Over Row",
        muscle_group: ["Back"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Deadlift",
        muscle_group: ["Back"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Bent-Over Row",
        muscle_group: ["Back"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Single-Arm Row",
        muscle_group: ["Back"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Lat Pulldown",
        muscle_group: ["Back"],
        required_equipment: ["Lat Pulldown Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Lat Pulldown Behind-the-Head",
        muscle_group: ["Back"],
        required_equipment: ["Lat Pulldown Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Lat Pulldown Narrow-Grip",
        muscle_group: ["Back"],
        required_equipment: ["Lat Pulldown Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Lat Pulldown Reverse-Grip",
        muscle_group: ["Back"],
        required_equipment: ["Lat Pulldown Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Lat Pulldown Single-Arm",
        muscle_group: ["Back"],
        required_equipment: ["Lat Pulldown Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Lat Pulldown Wide-Grip",
        muscle_group: ["Back"],
        required_equipment: ["Lat Pulldown Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Bent-Over Row",
        muscle_group: ["Back"],
        required_equipment: ["Smith Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Pullup",
        muscle_group: ["Back"],
        required_equipment: ["Pullup Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Cable Lat Pulldown",
        muscle_group: ["Back"],
        required_equipment: ["Cable Machine"],
        primary_muscles: ["Latissimus Dorsi"],
        secondary_muscles: ["Rhomboids", "Trapezius"],
        stabilizing_muscles: ["Biceps"],
        difficulty: "Beginner",
    },
    {
        exercise_name: "Seated Cable Row",
        muscle_group: ["Back"],
        required_equipment: ["Cable Machine"],
        primary_muscles: ["Latissimus Dorsi", "Rhomboids"],
        secondary_muscles: ["Trapezius", "Rear Deltoids"],
        stabilizing_muscles: ["Biceps", "Abs"],
        difficulty: "Beginner",
    },
    {
        exercise_name: "Standing Cable Pullover",
        muscle_group: ["Back"],
        required_equipment: ["Cable Machine"],
        primary_muscles: ["Latissimus Dorsi"],
        secondary_muscles: ["Serratus Anterior"],
        stabilizing_muscles: ["Abs", "Triceps"],
        difficulty: "Intermediate",
    },
    {
        exercise_name: "Cable Face Pull",
        muscle_group: ["Back", "Shoulders"],
        required_equipment: ["Cable Machine"],
        primary_muscles: ["Rear Deltoids", "Trapezius"],
        secondary_muscles: ["Rhomboids"],
        stabilizing_muscles: ["Abs"],
        difficulty: "Beginner",
    },
    {
        exercise_name: "Straight Arm Cable Pulldown",
        muscle_group: ["Back"],
        required_equipment: ["Cable Machine"],
        primary_muscles: ["Latissimus Dorsi"],
        secondary_muscles: ["Serratus Anterior"],
        stabilizing_muscles: ["Triceps", "Abs"],
        difficulty: "Beginner",
    },
];

const BICEP_EXERCISES = [
    {
        exercise_name: "Barbell Curl",
        muscle_group: ["Biceps"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Bicep Curl",
        muscle_group: ["Biceps"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Hammer Curl",
        muscle_group: ["Biceps"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "EZ Bar Close-Grip Curl",
        muscle_group: ["Biceps"],
        required_equipment: ["EZ Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "EZ Bar Curl",
        muscle_group: ["Biceps"],
        required_equipment: ["EZ Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "EZ Bar Wide-Grip Curl",
        muscle_group: ["Biceps"],
        required_equipment: ["EZ Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
];

const CHEST_EXERCISES = [
    {
        exercise_name: "Barbell Bench Press",
        muscle_group: ["Chest"],
        required_equipment: ["Barbell", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Decline Bench Press",
        muscle_group: ["Chest"],
        required_equipment: ["Barbell", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Incline Bench Press",
        muscle_group: ["Chest"],
        required_equipment: ["Barbell", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Machine Chest Press",
        muscle_group: ["Chest"],
        required_equipment: ["Chest Press Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Machine Incline Chest Press",
        muscle_group: ["Chest"],
        required_equipment: ["Chest Press Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Bench Press",
        muscle_group: ["Chest"],
        required_equipment: ["Smith Machine", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Close-Grip Bench Press",
        muscle_group: ["Chest"],
        required_equipment: ["Smith Machine", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Incline Bench Press",
        muscle_group: ["Chest"],
        required_equipment: ["Smith Machine", "Incline Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
];

const LEG_EXERCISES = [
    {
        exercise_name: "Barbell Front Squat",
        muscle_group: ["Legs"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Lunge",
        muscle_group: ["Legs"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Romanian Deadlift",
        muscle_group: ["Legs"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Squat",
        muscle_group: ["Legs"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Barbell Sumo Deadlift",
        muscle_group: ["Legs"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Lunges",
        muscle_group: ["Legs"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Leg Curl",
        muscle_group: ["Legs"],
        required_equipment: ["Leg Curl Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Leg Curl + Isometric Hold",
        muscle_group: ["Legs"],
        required_equipment: ["Leg Curl Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Leg Extension",
        muscle_group: ["Legs"],
        required_equipment: ["Leg Extension Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Leg Extension + Isometric Hold",
        muscle_group: ["Legs"],
        required_equipment: ["Leg Extension Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Leg Press",
        muscle_group: ["Legs"],
        required_equipment: ["Leg Press Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Lunges",
        muscle_group: ["Legs"],
        required_equipment: ["Smith Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Squat",
        muscle_group: ["Legs"],
        required_equipment: ["Smith Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
];

const SHOULDER_EXERCISES = [
    {
        exercise_name: "Barbell Overhead Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Barbell"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Front Raise",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Lateral Raise",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Shoulder Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Shrugs",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Upright Row",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Machine Shoulder Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Chest Press Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Shoulder Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Smith Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Smith Machine Shrugs",
        muscle_group: ["Shoulders"],
        required_equipment: ["Smith Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbell Seated Military Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Standing Military Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Seated Arnold Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Seated Reverse Arnold Press",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Seated Arnold Rotations",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Hammer Shrug",
        muscle_group: ["Shoulders"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
];

const TRICEP_EXERCISES = [
    {
        exercise_name: "Dumbbell Skull Crushers",
        muscle_group: ["Triceps"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Dumbbell Tricep Extension",
        muscle_group: ["Triceps"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "EZ Bar Skull Crusher",
        muscle_group: ["Triceps"],
        required_equipment: ["EZ Bar", "Flat Bench"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Rope Pulldown",
        muscle_group: ["Triceps"],
        required_equipment: ["Cable Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
];

const OBLIQUE_EXERCISES: Exercise[] = [
    {
        exercise_name: "Dumbbell Side Oblique Crunch",
        muscle_group: ["Obliques"],
        required_equipment: ["Dumbbells"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Cable Straight Arm Oblique Twist",
        muscle_group: ["Obliques"],
        required_equipment: ["Cable Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Cable Bent Over Oblique Dig",
        muscle_group: ["Obliques"],
        required_equipment: ["Cable Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
];
const AB_EXERCISES: Exercise[] = [
    {
        exercise_name: "Rope Crunch",
        muscle_group: ["Abs"],
        required_equipment: ["Cable Machine"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Hanging Leg Raise",
        muscle_group: ["Abs"],
        required_equipment: ["Pullup Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Hanging Knee Raise",
        muscle_group: ["Abs"],
        required_equipment: ["Pullup Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
    },
    {
        exercise_name: "Weighted Hanging Knee Raise",
        muscle_group: ["Abs"],
        required_equipment: ["Pullup Bar"],
        primary_muscles: [""],
        secondary_muscles: [""],
        stabilizing_muscles: [""],
        difficulty: "",
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
