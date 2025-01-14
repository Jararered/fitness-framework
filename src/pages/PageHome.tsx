import UserGreeting from "../components/UserGreeting";
import WorkoutPreview from "../components/WorkoutPreview";

const PageHome = () => {

    return (
        <div className="page-home">

            <UserGreeting />

            <div className="card">

                <WorkoutPreview />

                <div className="flex">
                    <button>
                        Start Workout
                    </button>

                    <button className="bad">
                        Delete Workout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageHome;