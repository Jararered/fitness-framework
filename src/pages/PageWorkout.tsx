import WorkoutPreview from "../components/home/WorkoutPreview";
import WorkoutEditor from "../components/workout/WorkoutEditor";
import CircuitEditor from "../components/workout/CircuitEditor";

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
                <CircuitEditor />
            </div>

        </div>
    );
};

export default PageWorkout;
