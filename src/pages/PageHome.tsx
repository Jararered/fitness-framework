import UserGreeting from '../components/v2/UserGreeting';
import WorkoutPreview from '../components/v2/WorkoutPreview';

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