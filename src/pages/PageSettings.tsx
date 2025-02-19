import UserSettings from "../components/UserSettings";
import TimingSettings from "../components/TimingSettings";
import ManageData from "../components/ManageData";
import DebugSettings from "../components/DebugSettings";

const PageSettings: React.FC = () => {

    return (
        <div className="page-settings">

            <h1>Settings</h1>

            <div className="card">
                <UserSettings />
            </div>

            <div className="card">
                <TimingSettings />
            </div>

            <div className="card">
                <ManageData />
            </div>

            <div className="card">
                <DebugSettings />
            </div>

        </div>
    );
};

export default PageSettings;
