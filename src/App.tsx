import React, { useState } from "react";

// Navigation
import SideBar from "./components/navigation/SideBar";
import DockBar from "./components/navigation/DockBar";

// Pages
import PageHome from "./pages/PageHome";
import PageWorkoutEditor from "./pages/PageWorkoutEditor";
import PageGym from "./pages/PageGym";
import PageProfile from "./pages/PageProfile";
import PageSettings from "./pages/PageSettings";

// Styles
import "./App.css";
import "./styles/button.css";
import "./styles/card.css";
import "./styles/icon.css";


export type SetPageProps = {
    setPage: React.Dispatch<React.SetStateAction<string>>;
};

const App: React.FC = () => {
    const [page, setPage] = useState<string>("home");

    const renderMainContent = () => {
        switch (page) {

            case "gym":
                return <PageGym />;
            case "home":
                return <PageHome setPage={setPage} />;
            case "workout":
                return <PageWorkoutEditor />;
            case "profile":
                return <PageProfile />;
            case "settings":
                return <PageSettings />;

            default:
                return <PageHome setPage={setPage} />;
        }
    };

    return (
        <div className="App">
            <SideBar setContent={setPage} />

            <div className="main-content">
                {renderMainContent()}
            </div>

            <DockBar setContent={setPage} />
        </div>
    );
};

export default App;
