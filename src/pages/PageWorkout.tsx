import WorkoutPreview from "../components/v2/WorkoutPreview";
import WorkoutEditor from "../components/v2/WorkoutEditor";
import CircuitCreator from "../components/v2/CircuitCreator";

const PageWorkout: React.FC = () => {
    return (
        <div className="page-workout">

            <h1>Workout</h1>

            {/* <div className="card">
                <WorkoutPreview />
            </div> */}

            <div className="card">
                <WorkoutEditor />
            </div>

            <div className="card">
                <CircuitCreator />
            </div>

        </div>
    );
};

export default PageWorkout;
