import TimingPreferences from '../components/v2/TimingPreferences';
import UserPreferences from '../components/v2/UserPreferences';
import ManageData from '../components/v2/ManageData';

const PagePreferences: React.FC = () => {

    return (
        <div className="page-preferences">

            <h2>Preferences</h2>

            <div className="card">
                <UserPreferences />
            </div>

            <div className="card">
                <TimingPreferences />
            </div>

            <div className="card">
                <ManageData />
            </div>

        </div>
    );
};

export default PagePreferences;
