import { Exercise, Sets } from "../../interfaces/Exercise";
import { Circuit } from "../../interfaces/Workout";

const CircuitPreview: React.FC<{ circuit: Circuit, circuitIndex: number, formatCommas: (sets: Sets) => string }> = ({ circuit, circuitIndex, formatCommas: FormatSets }) => (
    <div className="circuit-preview">

        <h3>Circuit {circuitIndex + 1}</h3>

        {circuit.map((exercise: Exercise, exerciseIndex: number) => (
            <div className="circuit-preview-exercise" key={exerciseIndex}>
                <h4>{exercise.name}</h4>
                <p>{exercise.plan?.sets ? FormatSets(exercise.plan.sets) : 'No reps available'}</p>
            </div>
        ))}

    </div>
);

export default CircuitPreview;