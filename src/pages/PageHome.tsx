import UserGreeting from "../components/UserGreeting";
import PreviewWorkout from "../components/PreviewWorkout";
import LocalStorage, { Keys } from "../interfaces/Storage";
import { NewWorkoutActive, WorkoutActive } from "../interfaces/Workout";
import { WorkoutState } from "../interfaces/Workout";
import { SetPageProps } from "../App";

const PageHome = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<WorkoutActive>(Keys.Workout, NewWorkoutActive);

    const handleStartWorkout = () => {

    };

    const handleClearWorkout = () => {

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
                    <button className="bad" onClick={handleClearWorkout}>
                        Clear Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageHome;