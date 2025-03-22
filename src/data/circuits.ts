import { CircuitPlan } from "./types.ts";
import { MuscleGroup, Equipment } from "./types.ts";

const BACK_CIRCUITS: CircuitPlan[] = [
    {
        exercises: [
            {
                exercise: "Lat Pulldown",
                reps: [10, 8, 6],
                sets: 3,
                style: "drop",
                baseReps: 10,
            },
            {
                exercise: "Lat Pulldown Behind Head",
                reps: [10, 8, 6],
                sets: 3,
                style: "drop",
                baseReps: 10,
            },
        ],
    },
];
