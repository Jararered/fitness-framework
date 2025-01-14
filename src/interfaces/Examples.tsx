import { Workout } from "./Workout";

export const LegsExampleWorkout: Workout = {
    name: "Leg Day",
    circuits: [
        [
            {
                name: "Barbell Squat",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Press",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Curl",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Extension",
                plan: { sets: [10, 10, 10] }
            }
        ],
        [
            {
                name: "Leg Curl + Isometric Hold",
                plan: { sets: [10, 10, 10] }
            },
            {
                name: "Leg Extension + Isometric Hold",
                plan: { sets: [10, 10, 10] }
            }
        ]
    ]
};