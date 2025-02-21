import { WorkoutPlan } from "./Workout";

export const LegDayPlan: WorkoutPlan = {
    name: "Leg Day",
    circuits: [
        [
            {
                name: "Barbell Squat",
                sets: [10, 10, 10],
                info: {
                    equipment: "Barbell + Squat Rack",
                    category: "Legs"
                },
                config: {
                    enabled: true
                }

            },
            {
                name: "Leg Press",
                sets: [10, 10, 10],
                info: {
                    equipment: "Leg Press Machine",
                    category: "Legs"
                },
                config: {
                    enabled: true
                }

            },
            {
                name: "Leg Curl",
                sets: [10, 10, 10],
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
                sets: [10, 10, 10],
                info: {
                    equipment: "Leg Extension Machine",
                    category: "Legs"
                },
                config: {
                    enabled: true
                }

            }
        ],
        [
            {
                name: "Leg Curl + Isometric Hold",
                sets: [10, 10, 10],
                info: {
                    equipment: "Leg Curl Machine",
                    category: "Legs"
                },
                config: {
                    enabled: true
                }

            },
            {
                name: "Leg Extension + Isometric Hold",
                sets: [10, 10, 10],
                info: {
                    equipment: "Leg Extension Machine",
                    category: "Legs"
                },
                config: {
                    enabled: true
                }

            }
        ]
    ]
};