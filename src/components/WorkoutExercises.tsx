import React, { useState, useEffect } from 'react';

import { equipmentExercises } from './Equipment.tsx';

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
        <div className="card">
            <h1>Available Exercises</h1>
            {availableEquipment.length > 0 ? (
                availableEquipment.map((equipment) => (
                    <div key={equipment}>
                        <h2>{equipment}</h2>
                        <div className="exercise-list">
                            {equipmentExercises[equipment]?.map((exercise) => (
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
