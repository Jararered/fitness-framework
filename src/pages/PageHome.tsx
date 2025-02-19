import UserGreeting from "../components/UserGreeting";
import PreviewWorkout from "../components/PreviewWorkout";
import LocalStorage, { Keys } from "../interfaces/Storage";
import { NullWorkout, Workout } from "../interfaces/Workout";
import { WorkoutState } from "../interfaces/Workout";
import { SetPageProps } from "../App";

const PageHome = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);

    const handleStartWorkout = () => {
        const newWorkout = { ...workout };

        // Set the workout state to started
        newWorkout.state = "started" as WorkoutState;

        // Reset the indexer
        newWorkout.indexer.circuitIndex = 0;
        newWorkout.indexer.exerciseIndex = 0;

        // Set the start time
        newWorkout.time.start = new Date();

        setWorkout(newWorkout);
        setTimeout(() => setPage("circuit-preview"), 0);
    };

    return (
        <div className="page-home">
            <UserGreeting />
            <div className="card">
                <PreviewWorkout />
                <div className="flex">
                    <button onClick={handleStartWorkout}>
                        Start Workout
                    </button>
                    <button className="bad">
                        Clear Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageHome;