import { Workout, NullWorkout } from "../../interfaces/Workout";
import LocalStorage, { Keys } from "../../interfaces/Storage";
import { SetPageProps } from "../../App";
import PreviewCircuit from "../../components/PreviewCircuit";

const PageCircuitPreview = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);

    const handleStartCircuit = () => {
        const newWorkout = { ...workout };

        newWorkout.indexer.exerciseIndex = 0;

        setWorkout(newWorkout);
        setTimeout(() => setPage("exercise"), 0);
    }

    const handleSkipCircuit = () => {
        const newWorkout = { ...workout };

        newWorkout.indexer.circuitIndex++;
        newWorkout.indexer.exerciseIndex = 0;

        setWorkout(newWorkout);
        setTimeout(() => setPage("circuit-preview"), 0);
    }

    const handleEndWorkout = () => {
        const newWorkout = {
            ...workout,
            indexer: { ...workout.indexer } // deep copy of indexer
        };

        newWorkout.indexer.circuitIndex = 0;
        newWorkout.indexer.exerciseIndex = 0;

        setWorkout(newWorkout);
        setTimeout(() => setPage("workout-complete"), 0);
    }

    return (
        <div className="page-circuit-preview">
            <h1>Circuit Preview</h1>

            <div className="card">

                <PreviewCircuit
                    circuitIndex={workout.indexer.circuitIndex}
                    circuit={workout.circuits[workout.indexer.circuitIndex]}
                />

                <div className="flex">
                    <button className="normal"
                        onClick={handleStartCircuit}>
                        Start Circuit
                    </button>

                    <button className="bad"
                        onClick={handleSkipCircuit}>
                        Skip Circuit
                    </button>
                </div>
                <div className="flex">
                    <button className="bad"
                        onClick={handleEndWorkout}>
                        End Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageCircuitPreview;
