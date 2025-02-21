// SetGenerator.tsx
import React, { useState, useEffect } from "react";

type SetType = "straight" | "pyramid" | "drop";

interface SetGeneratorProps {
    initialReps?: number; // Optional prop for initial base reps
    initialSets?: number; // Optional prop for initial set count
}

const SetGenerator: React.FC<SetGeneratorProps> = ({
    initialReps = 10,
    initialSets = 3,
}) => {
    const [setType, setSetType] = useState<SetType>("straight");
    const [baseReps, setBaseReps] = useState(initialReps);
    const [setCount, setSetCount] = useState(initialSets);
    const [repsArray, setRepsArray] = useState<number[]>([]);

    const increment = 2; // Rep increment for pyramid/drop sets
    const minReps = 1; // Minimum reps for drop sets

    // Generate the reps array based on set type, base reps, and set count
    const generateRepsArray = (): number[] => {
        let result: number[] = [];

        switch (setType) {
            case "straight":
                result = Array(setCount).fill(baseReps);
                break;

            case "pyramid": {
                const halfCount = Math.floor(setCount / 2);
                const isOdd = setCount % 2 !== 0;
                const peak = baseReps + halfCount * increment; // Calculate peak reps

                // Build ascending part
                for (let i = 0; i < halfCount; i++) {
                    result.push(baseReps + i * increment);
                }
                // Add peak if odd number of sets
                if (isOdd) result.push(peak);
                // Build descending part
                for (let i = halfCount - 1; i >= 0; i--) {
                    result.push(baseReps + i * increment);
                }
                break;
            }

            case "drop": {
                result = Array(setCount)
                    .fill(0)
                    .map((_, i) => Math.max(minReps, baseReps - i * increment));
                break;
            }

            default:
                result = [];
        }
        return result;
    };

    // Update reps array whenever setType, baseReps, or setCount changes
    useEffect(() => {
        setRepsArray(generateRepsArray());
    }, [setType, baseReps, setCount]);

    // Handlers for adjusting reps and sets
    const increaseReps = () => setBaseReps((prev) => prev + increment);
    const decreaseReps = () => setBaseReps((prev) => Math.max(minReps + increment, prev - increment));
    const increaseSets = () => setSetCount((prev) => prev + 1);
    const decreaseSets = () => setSetCount((prev) => Math.max(1, prev - 1));

    return (
        <div>
            <h2>Set Generator</h2>

            {/* Set Type Selection */}
            <div>
                <label>Set Type: </label>
                <select
                    value={setType}
                    onChange={(e) => setSetType(e.target.value as SetType)}
                >
                    <option value="straight">Straight</option>
                    <option value="pyramid">Pyramid</option>
                    <option value="drop">Drop</option>
                </select>
            </div>

            {/* Rep Count Controls */}
            <div>
                <label>Modify Reps</label>
                <button onClick={increaseReps}>+</button>
                <button className="bad" onClick={decreaseReps} disabled={baseReps <= minReps + increment}>
                    -
                </button>
            </div>

            {/* Set Count Controls */}
            <div>
                <label>Modify Sets</label>
                <button onClick={increaseSets}>+</button>
                <button className="bad" onClick={decreaseSets} disabled={setCount <= 1}>
                    -
                </button>
            </div>

            {/* Display Reps Array */}
            <div>
                <h3>Exercise Preview:</h3>
                <ul>
                    {repsArray.map((reps, index) => (
                        <li key={index}>
                            Set {index + 1}: {reps} reps
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SetGenerator;