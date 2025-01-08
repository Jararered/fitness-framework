import UserGreeting from '../components/home/UserGreeting';
import WorkoutPreview from '../components/home/WorkoutPreview';

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