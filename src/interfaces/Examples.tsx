import { Workout } from "./Workout";

export const LegsExampleWorkout: Workout = {
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
                },
                active: {
                    sets: [0, 0, 0],
                    weight: 0
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
                },
                active: {
                    sets: [0, 0, 0],
                    weight: 0
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
                },
                active: {
                    sets: [0, 0, 0],
                    weight: 0
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
                },
                active: {
                    sets: [0, 0, 0],
                    weight: 0
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
                },
                active: {
                    sets: [0, 0, 0],
                    weight: 0
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
                },
                active: {
                    sets: [0, 0, 0],
                    weight: 0
                }
            }
        ]
    ],
    state: "preview",
    indexer: {
        circuitIndex: 0,
        exerciseIndex: 0
    },
    time: {
        start: new Date(),
        end: new Date()
    }
};