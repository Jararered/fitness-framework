import { EquipmentName } from "./Equipment";

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
    "Smith Machine Squat"
    ;

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

// Exercises
export const DefaultExercises: Exercise[] = [
    {
        name: "Barbell Bench Press",
        info: {
            equipment: "Barbell + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Bent-Over Row",
        info: {
            equipment: "Barbell",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Curl",
        info: {
            equipment: "Barbell",
            category: "Biceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Deadlift",
        info: {
            equipment: "Barbell",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Decline Bench Press",
        info: {
            equipment: "Barbell + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Front Squat",
        info: {
            equipment: "Barbell + Squat Rack",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Incline Bench Press",
        info: {
            equipment: "Barbell + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Lunge",
        info: {
            equipment: "Barbell + Squat Rack",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Overhead Press",
        info: {
            equipment: "Barbell",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Romanian Deadlift",
        info: {
            equipment: "Barbell",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Squat",
        info: {
            equipment: "Barbell + Squat Rack",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Barbell Sumo Deadlift",
        info: {
            equipment: "Barbell",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Bent-Over Row",
        info: {
            equipment: "Dumbells",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Bicep Curl",
        info: {
            equipment: "Dumbells",
            category: "Biceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Front Raise",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Hammer Curl",
        info: {
            equipment: "Dumbells",
            category: "Biceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Lateral Raise",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Lunges",
        info: {
            equipment: "Dumbells",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Shoulder Press",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Shrugs",
        info: {
            equipment: "Dumbells",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Single-Arm Row",
        info: {
            equipment: "Dumbells",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Skull Crushers",
        info: {
            equipment: "Dumbells",
            category: "Triceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Tricep Extension",
        info: {
            equipment: "Dumbells",
            category: "Triceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Dumbbell Upright Row",
        info: {
            equipment: "Barbell + Bench",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "EZ Bar Close-Grip Curl",
        info: {
            equipment: "EZ Bar",
            category: "Biceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "EZ Bar Curl",
        info: {
            equipment: "EZ Bar",
            category: "Biceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "EZ Bar Skull Crusher",
        info: {
            equipment: "EZ Bar + Bench",
            category: "Triceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "EZ Bar Wide-Grip Curl",
        info: {
            equipment: "EZ Bar",
            category: "Biceps"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Lat Pulldown",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Lat Pulldown Behind-the-Head",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Lat Pulldown Narrow-Grip",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Lat Pulldown Reverse-Grip",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Lat Pulldown Single-Arm",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Lat Pulldown Wide-Grip",
        info: {
            equipment: "Lat Pulldown Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Leg Curl",
        info: {
            equipment: "Leg Curl Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Leg Curl + Isometric Hold",
        info: {
            equipment: "Leg Curl Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Leg Extension",
        info: {
            equipment: "Leg Extension Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Leg Extension + Isometric Hold",
        info: {
            equipment: "Leg Extension Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Leg Press",
        info: {
            equipment: "Leg Press Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Machine Chest Press",
        info: {
            equipment: "Chest Press Machine",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Machine Incline Chest Press",
        info: {
            equipment: "Chest Press Machine",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Machine Shoulder Press",
        info: {
            equipment: "Chest Press Machine",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Bench Press",
        info: {
            equipment: "Smith Machine + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Bent-Over Row",
        info: {
            equipment: "Smith Machine",
            category: "Back"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Close-Grip Bench Press",
        info: {
            equipment: "Smith Machine + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Incline Bench Press",
        info: {
            equipment: "Smith Machine + Bench",
            category: "Chest"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Lunges",
        info: {
            equipment: "Smith Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Shoulder Press",
        info: {
            equipment: "Smith Machine",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Shrugs",
        info: {
            equipment: "Smith Machine",
            category: "Shoulders"
        },
        config: {
            enabled: true
        }
    },
    {
        name: "Smith Machine Squat",
        info: {
            equipment: "Smith Machine",
            category: "Legs"
        },
        config: {
            enabled: true
        }
    },
];

export const LoadDefaultExercises = () => {
    // Loads the default exercises and saves them to local storage if not present
    const exercises = localStorage.getItem("exercises");
    if (!exercises) {
        localStorage.setItem("exercises", JSON.stringify(DefaultExercises));
    }
}