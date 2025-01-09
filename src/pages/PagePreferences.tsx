import TimingSettings from "../components/TimingSettings";
import UserSettings from "../components/UserSettings";
import ManageData from "../components/ManageData";

const PagePreferences: React.FC = () => {

    return (
        <div className="page-preferences">

            <h1>Preferences</h1>

            <div className="card">
                <UserSettings />
            </div>

            <div className="card">
                <TimingSettings />
            </div>

            <div className="card">
                <ManageData />
            </div>

        </div>
    );
};

export default PagePreferences;
