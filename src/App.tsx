import React, { useState } from "react";

// Navigation
import SideBar from "./components/navigation/SideBar";
import DockBar from "./components/navigation/DockBar";

// Pages
import PageHome from "./pages/PageHome";
import PageWorkout from "./pages/PageWorkout";
import PageGym from "./pages/PageGym";
import PageProfile from "./pages/PageProfile";
import PagePreferences from "./pages/PagePreferences";

// Styles
import "./App.css";
import "./styles/button.css";
import "./styles/card.css";
import "./styles/icon.css";

const App: React.FC = () => {
    const [page, setPage] = useState<string>("home");

    const renderMainContent = () => {
        switch (page) {

            case "home":
                return <PageHome />;

            case "workout":
                return <PageWorkout />;

            case "gym":
                return <PageGym />;

            case "profile":
                return <PageProfile />;

            case "settings":
                return <PagePreferences />;

            default:
                return <PageHome />;
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
