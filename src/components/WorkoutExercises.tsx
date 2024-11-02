import React, { useState, useEffect } from 'react';

export const exercisesByEquipment: { [key: string]: string[] } = {
    "Dumbells": [
        "Dumbbell Shrugs",
        "Dumbbell Upright Row",
        "Dumbbell Lateral Raise",
        "Dumbbell Front Raise",
        "Dumbbell Bent-Over Row",
        "Dumbbell Single-Arm Row",
        "Dumbbell Bicep Curl",
        "Dumbbell Hammer Curl",
        "Dumbbell Tricep Extension",
        "Dumbbell Skull Crushers",
    ],
    "Dumbells + Bench": [
        "Dumbbell Bench Press",
        "Dumbbell Incline Chest Press",
        "Dumbbell Decline Chest Press",
        "Dumbbell Fly",
        "Dumbbell Shoulder Press",
    ],
    "Lat Pulldown Machine": [
        "Lat Pulldown",
        "Lat Pulldown Wide-Grip",
        "Lat Pulldown Narrow-Grip",
        "Lat Pulldown Reverse-Grip",
        "Lat Pulldown Single-Arm",
        "Lat Pulldown Behind-the-Head",
    ],
    "Barbell": [
        "Barbell Deadlift",
        "Barbell Bent-Over Row",
        "Barbell Clean and Press",
        "Barbell Snatch",
        "Barbell Hip Thrust",
        "Barbell Curl",
        "Barbell Sumo Deadlift",
    ],
    "Barbell + Bench": [
        "Barbell Bench Press",
        "Barbell Incline Bench Press",
        "Barbell Decline Bench Press",
    ],
    "Barbell + Squat Rack": [
        "Barbell Squat",
        "Barbell Overhead Press",
        "Barbell Front Squat",
        "Barbell Romanian Deadlift",
        "Barbell Lunge",
    ],
    "EZ Bar": [
        "EZ Bar Curl",
        "EZ Bar Wide-Grip Curl",
        "EZ Bar Close-Grip Curl",
        "EZ Bar Skull Crusher",
    ],
    "Smith Machine": [
        "Smith Machine Squat",
        "Smith Machine Shoulder Press",
        "Smith Machine Deadlift",
        "Smith Machine Lunges",
        "Smith Machine Bent-Over Row",
        "Smith Machine Front Squat",
        "Smith Machine Overhead Press",
        "Smith Machine Shrugs",
        "Smith Machine Reverse Lunge",
    ],
    "Smith Machine + Bench": [
        "Smith Machine Bench Press",
        "Smith Machine Close-Grip Bench Press",
        "Smith Machine Incline Bench Press",
    ],
    "Chest Press Machine": [
        "Machine Chest Press",
        "Machine Incline Chest Press",
        "Machine Shoulder Press",
    ],
    "Leg Extension Machine": [
        "Leg Extension",
        "Leg Extension + Isometric Hold"
    ],
    "Leg Curl Machine": [
        "Leg Curl",
        "Leg Curl + Isometric Hold"
    ],
};

const WorkoutExercises: React.FC = () => {
    const [availableEquipment, setAvailableEquipment] = useState<string[]>([]);

    useEffect(() => {
        // Retrieve selected equipment from localStorage
        const lastLoadedGym = localStorage.getItem('lastLoadedGym');
        if (lastLoadedGym) {
            const equipment = JSON.parse(localStorage.getItem(lastLoadedGym) || '[]');
            setAvailableEquipment(equipment);
        }
    }, []);

    return (
        <div className="page-container">
            <h1>Available Exercises</h1>
            {availableEquipment.length > 0 ? (
                availableEquipment.map((equipment) => (
                    <div key={equipment}>
                        <h2>{equipment}</h2>
                        <div className="exercise-list">
                            {exercisesByEquipment[equipment]?.map((exercise) => (
                                <div key={exercise}>
                                    <p>{exercise}</p>
                                </div>
                            )) || <p>No exercises available for this equipment.</p>}
                        </div>
                    </div>
                ))
            ) : (
                <p>No equipment selected. Please configure equipment in the Equipment page.</p>
            )}
        </div>
    );
};

export default WorkoutExercises;
