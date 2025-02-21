import WorkoutEditor from "../components/WorkoutEditor";
import CircuitCreator from "../components/CircuitCreator";
import SetGenerator from "../components/SetGenerator";

const PageWorkoutEditor: React.FC = () => {
    return (
        <div className="page-workout">

            <h1>Workout</h1>

            <div className="card">
                <WorkoutEditor />
            </div>

            <div className="card">
                <CircuitCreator />
            </div>

            <div className="card">
                <SetGenerator />
            </div>

        </div>
    );
};

export default PageWorkoutEditor;
