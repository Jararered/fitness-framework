import React from "react";

import { Circuit } from "../interfaces/Workout";

interface CircuitPreviewProps {
    circuitIndex: number;
    circuit: Circuit;
}

const PreviewCircuit: React.FC<CircuitPreviewProps> = ({ circuitIndex: index, circuit }) => {
    return (
        <div>
            <h2>Circuit {index + 1}</h2>
            <ul>
                {circuit.map((exercise, index) => (
                    <li key={index}>

                        <h3>{exercise.plan.name}</h3>

                        {exercise.plan.sets && (
                            <div>
                                <p>Sets: {exercise.plan.sets.join(", ")} reps</p>
                            </div>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreviewCircuit;

