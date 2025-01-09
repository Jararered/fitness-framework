import UserGreeting from "../components/UserGreeting";
import WorkoutPreview from "../components/WorkoutPreview";

const PageHome = () => {
    return (
        <div className="page-home">

            <UserGreeting />

            <div className="card">
                <WorkoutPreview />
            </div>

        </div>
    );
};

export default PageHome;