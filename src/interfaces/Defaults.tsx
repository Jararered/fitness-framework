import { Exercise } from "./Exercise";
import { Equipment } from "./Equipment";

export const DefaultEquipment: Equipment[] = [
    { name: "Barbell", config: { enabled: true } },
    { name: "Barbell + Bench", config: { enabled: true } },
    { name: "Barbell + Squat Rack", config: { enabled: true } },
    { name: "Chest Press Machine", config: { enabled: true } },
    { name: "Dumbells", config: { enabled: true } },
    { name: "EZ Bar", config: { enabled: true } },
    { name: "EZ Bar + Bench", config: { enabled: true } },
    { name: "Lat Pulldown Machine", config: { enabled: true } },
    { name: "Leg Curl Machine", config: { enabled: true } },
    { name: "Leg Extension Machine", config: { enabled: true } },
    { name: "Leg Press Machine", config: { enabled: true } },
    { name: "Smith Machine", config: { enabled: true } },
    { name: "Smith Machine + Bench", config: { enabled: true } }
];

export const DefaultExercises: Exercise[] = [
    {
        name: "Barbell Bench Press",
        info: {
            equipment: "Barbell + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Bent-Over Row",
        info: {
            equipment: "Barbell",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Curl",
        info: {
            equipment: "Barbell",
            category: "Biceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Deadlift",
        info: {
            equipment: "Barbell",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Decline Bench Press",
        info: {
            equipment: "Barbell + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Front Squat",
        info: {
            equipment: "Barbell + Squat Rack",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Incline Bench Press",
        info: {
            equipment: "Barbell + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Lunge",
        info: {
            equipment: "Barbell + Squat Rack",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Overhead Press",
        info: {
            equipment: "Barbell",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Romanian Deadlift",
        info: {
            equipment: "Barbell",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Squat",
        info: {
            equipment: "Barbell + Squat Rack",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Barbell Sumo Deadlift",
        info: {
            equipment: "Barbell",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Bent-Over Row",
        info: {
            equipment: "Dumbells",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Bicep Curl",
        info: {
            equipment: "Dumbells",
            category: "Biceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Front Raise",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Hammer Curl",
        info: {
            equipment: "Dumbells",
            category: "Biceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Lateral Raise",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Lunges",
        info: {
            equipment: "Dumbells",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Shoulder Press",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Shrugs",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Single-Arm Row",
        info: {
            equipment: "Dumbells",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Skull Crushers",
        info: {
            equipment: "Dumbells",
            category: "Triceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Tricep Extension",
        info: {
            equipment: "Dumbells",
            category: "Triceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Dumbbell Upright Row",
        info: {
            equipment: "Barbell + Bench",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "EZ Bar Close-Grip Curl",
        info: {
            equipment: "EZ Bar",
            category: "Biceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "EZ Bar Curl",
        info: {
            equipment: "EZ Bar",
            category: "Biceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "EZ Bar Skull Crusher",
        info: {
            equipment: "EZ Bar + Bench",
            category: "Triceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "EZ Bar Wide-Grip Curl",
        info: {
            equipment: "EZ Bar",
            category: "Biceps"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Lat Pulldown",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Lat Pulldown Behind-the-Head",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Lat Pulldown Narrow-Grip",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Lat Pulldown Reverse-Grip",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Lat Pulldown Single-Arm",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Lat Pulldown Wide-Grip",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Leg Curl",
        info: {
            equipment: "Leg Curl Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Leg Curl + Isometric Hold",
        info: {
            equipment: "Leg Curl Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Leg Extension",
        info: {
            equipment: "Leg Extension Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Leg Extension + Isometric Hold",
        info: {
            equipment: "Leg Extension Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Leg Press",
        info: {
            equipment: "Leg Press Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Machine Chest Press",
        info: {
            equipment: "Chest Press Machine",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Machine Incline Chest Press",
        info: {
            equipment: "Chest Press Machine",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Machine Shoulder Press",
        info: {
            equipment: "Chest Press Machine",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Bench Press",
        info: {
            equipment: "Smith Machine + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Bent-Over Row",
        info: {
            equipment: "Smith Machine",
            category: "Back"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Close-Grip Bench Press",
        info: {
            equipment: "Smith Machine + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Incline Bench Press",
        info: {
            equipment: "Smith Machine + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Lunges",
        info: {
            equipment: "Smith Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Shoulder Press",
        info: {
            equipment: "Smith Machine",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Shrugs",
        info: {
            equipment: "Smith Machine",
            category: "Shoulders"
        },
        config: {
            enabled: true
        },
        sets: []
    },
    {
        name: "Smith Machine Squat",
        info: {
            equipment: "Smith Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        },
        sets: []
    },
];

export const LoadDefaultExercises = () => {
    // Loads the default exercises and saves them to local storage if not present
    const exercises = localStorage.getItem("exercises");
    if (!exercises) {
        localStorage.setItem("exercises", JSON.stringify(DefaultExercises));
    }
}