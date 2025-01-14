import React from 'react';

import { Circuit } from '../interfaces/Workout';

interface CircuitPreviewProps {
    number: number;
    circuit: Circuit;
}

const CircuitPreview: React.FC<CircuitPreviewProps> = ({ number, circuit }) => {
    return (
        <div>
            <h2>Circuit {number}</h2>
            <ul>
                {circuit.map((exercise, index) => (
                    <li key={index}>
                        <strong>{exercise.name}</strong>
                        {exercise.info && (
                            <div>
                                <p>Equipment: {exercise.info.equipment}</p>
                                <p>Category: {exercise.info.category}</p>
                            </div>
                        )}
                        {exercise.plan && (
                            <div>
                                <p>Plan: {exercise.plan.sets.join(', ')} sets</p>
                            </div>
                        )}
                        {exercise.active && (
                            <div>
                                <p>Active: {exercise.active.sets?.join(', ')} sets, Weight: {exercise.active.weight} kg</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CircuitPreview;

