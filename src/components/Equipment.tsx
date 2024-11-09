import { FaDumbbell } from 'react-icons/fa';

export const equipment = [
    "Barbell + Bench",
    "Barbell + Squat Rack",
    "Barbell",
    "Chest Press Machine",
    "Dumbells + Bench",
    "Dumbells",
    "EZ Bar", "Smith Machine",
    "Lat Pulldown Machine",
    "Leg Curl Machine",
    "Leg Extension Machine",
    "Smith Machine + Bench",
];

export const equipmentIcons: { [key: string]: JSX.Element } = {
    "Barbell + Bench": <FaDumbbell size={48} />,
    "Barbell + Squat Rack": <FaDumbbell size={48} />,
    "Barbell": <FaDumbbell size={48} />,
    "Chest Press Machine": <FaDumbbell size={48} />,
    "Dumbells + Bench": <FaDumbbell size={48} />,
    "Dumbells": <FaDumbbell size={48} />,
    "EZ Bar": <FaDumbbell size={48} />,
    "Lat Pulldown Machine": <FaDumbbell size={48} />,
    "Leg Curl Machine": <FaDumbbell size={48} />,
    "Leg Extension Machine": <FaDumbbell size={48} />,
    "Smith Machine + Bench": <FaDumbbell size={48} />,
    "Smith Machine": <FaDumbbell size={48} />,
};

export const equipmentExercises: { [key: string]: string[] } = {
    "Barbell + Bench": ["Barbell Bench Press", "Barbell Incline Bench Press", "Barbell Decline Bench Press"],
    "Barbell + Squat Rack": ["Barbell Squat", "Barbell Overhead Press", "Barbell Front Squat", "Barbell Romanian Deadlift", "Barbell Lunge"],
    "Barbell": ["Barbell Deadlift", "Barbell Bent-Over Row", "Barbell Clean and Press", "Barbell Snatch", "Barbell Hip Thrust", "Barbell Curl", "Barbell Sumo Deadlift"],
    "Chest Press Machine": ["Machine Chest Press", "Machine Incline Chest Press", "Machine Shoulder Press"],
    "Dumbells + Bench": ["Dumbbell Bench Press", "Dumbbell Incline Chest Press", "Dumbbell Decline Chest Press", "Dumbbell Fly", "Dumbbell Shoulder Press"],
    "Dumbells": ["Dumbbell Shrugs", "Dumbbell Upright Row", "Dumbbell Lateral Raise", "Dumbbell Front Raise", "Dumbbell Bent-Over Row", "Dumbbell Single-Arm Row", "Dumbbell Bicep Curl", "Dumbbell Hammer Curl", "Dumbbell Tricep Extension", "Dumbbell Skull Crushers"],
    "EZ Bar": ["EZ Bar Curl", "EZ Bar Wide-Grip Curl", "EZ Bar Close-Grip Curl", "EZ Bar Skull Crusher"],
    "Lat Pulldown Machine": ["Lat Pulldown", "Lat Pulldown Wide-Grip", "Lat Pulldown Narrow-Grip", "Lat Pulldown Reverse-Grip", "Lat Pulldown Single-Arm", "Lat Pulldown Behind-the-Head"],
    "Leg Curl Machine": ["Leg Curl", "Leg Curl + Isometric Hold"],
    "Leg Extension Machine": ["Leg Extension", "Leg Extension + Isometric Hold"],
    "Smith Machine + Bench": ["Smith Machine Bench Press", "Smith Machine Close-Grip Bench Press", "Smith Machine Incline Bench Press"],
    "Smith Machine": ["Smith Machine Squat", "Smith Machine Shoulder Press", "Smith Machine Deadlift", "Smith Machine Lunges", "Smith Machine Bent-Over Row", "Smith Machine Front Squat", "Smith Machine Overhead Press", "Smith Machine Shrugs", "Smith Machine Reverse Lunge"],
};

export type BodyPart = 'Legs' | 'Biceps' | 'Triceps' | 'Chest' | 'Back' | 'Shoulders';

export const exerciseCategories: Record<BodyPart, string[]> = {
    Legs: [
        "Barbell Squat",
        "Barbell Front Squat",
        "Barbell Lunge",
        "Smith Machine Squat",
        "Smith Machine Lunges",
        "Leg Extension",
        "Leg Extension + Isometric Hold",
        "Leg Curl",
        "Leg Curl + Isometric Hold",
        "Barbell Deadlift",
        "Barbell Sumo Deadlift",
        "Barbell Romanian Deadlift",
    ],
    Biceps: [
        "Dumbbell Bicep Curl",
        "Dumbbell Hammer Curl",
        "Barbell Curl",
        "EZ Bar Curl",
        "EZ Bar Wide-Grip Curl",
        "EZ Bar Close-Grip Curl",
    ],
    Triceps: [
        "Dumbbell Tricep Extension",
        "Dumbbell Skull Crushers",
        "EZ Bar Skull Crusher",
    ],
    Chest: [
        "Dumbbell Bench Press",
        "Dumbbell Incline Chest Press",
        "Dumbbell Decline Chest Press",
        "Dumbbell Fly",
        "Barbell Bench Press",
        "Barbell Incline Bench Press",
        "Barbell Decline Bench Press",
        "Smith Machine Bench Press",
        "Smith Machine Close-Grip Bench Press",
        "Smith Machine Incline Bench Press",
        "Machine Chest Press",
        "Machine Incline Chest Press",
    ],
    Back: [
        "Dumbbell Bent-Over Row",
        "Dumbbell Single-Arm Row",
        "Barbell Bent-Over Row",
        "Lat Pulldown",
        "Lat Pulldown Wide-Grip",
        "Lat Pulldown Narrow-Grip",
        "Lat Pulldown Reverse-Grip",
        "Lat Pulldown Single-Arm",
        "Lat Pulldown Behind-the-Head",
        "Smith Machine Bent-Over Row",
    ],
    Shoulders: [
        "Dumbbell Shoulder Press",
        "Dumbbell Lateral Raise",
        "Dumbbell Front Raise",
        "Dumbbell Shrugs",
        "Dumbbell Upright Row",
        "Barbell Overhead Press",
        "Smith Machine Overhead Press",
        "Smith Machine Shrugs",
        "Machine Shoulder Press",
    ],
};

// Function to get exercises by body part
export const getExercisesByBodyPart = (bodyPart: BodyPart): string[] => {
    return exerciseCategories[bodyPart];
};

// Function to get exercises by equipment
export const getExercisesByEquipment = (equipmentName: string): string[] => {
    return equipmentExercises[equipmentName] || [];
};