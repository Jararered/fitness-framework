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

type ExerciseEntry = {
    exercise_name: string;
    muscle_group: MuscleGroup[];
    required_equipment: Equipment[];
    primary_muscles: Muscle[];
    secondary_muscles: Muscle[];
    stabilizing_muscles: Muscle[];
    difficulty: Difficulty;
};

const BACK_EXERCISES: ExerciseEntry[] = [
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

const OBLIQUE_EXERCISES: ExerciseEntry[] = [
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
const AB_EXERCISES: ExerciseEntry[] = [
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

export const EXERCISES = [...BACK_EXERCISES, ...BICEP_EXERCISES, ...CHEST_EXERCISES, ...LEG_EXERCISES, ...SHOULDER_EXERCISES, ...TRICEP_EXERCISES, ...OBLIQUE_EXERCISES, ...AB_EXERCISES];
