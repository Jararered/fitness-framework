import React, { useState, useEffect } from 'react';
import './WorkoutExercises.css';

export const exercisesByEquipment: { [key: string]: string[] } = {
    "Chest Fly Machine": ["Chest Fly", "Rear Delt Fly"],
    "Chest Press Machine": ["Seated Chest Press", "Incline Chest Press"],
    "Row Machine": ["Seated Row", "Face Pull", "High Row"],
    "Cable Machine": ["Cable Curl", "Tricep Pushdown", "Cable Lateral Raise", "Cable Chest Fly"],
    "Leg Press Machine": ["Leg Press", "Calf Raise"],
    "Lat Pulldown Machine": ["Lat Pulldown", "Single-Arm Pulldown"],
    "Smith Machine": ["Smith Machine Squat", "Smith Machine Bench Press"]
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
                    <div key={equipment} className="equipment-card">
                        <h2>{equipment}</h2>
                        <div className="exercise-list">
                            {exercisesByEquipment[equipment]?.map((exercise) => (
                                <div key={exercise} className="exercise-card">
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
