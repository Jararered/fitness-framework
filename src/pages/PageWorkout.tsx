import WorkoutEditor from "../components/WorkoutEditor";
import CircuitEditor from "../components/CircuitEditor";

const PageWorkout: React.FC = () => {
    return (
        <div className="page-workout">

            <h1>Workout</h1>

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
