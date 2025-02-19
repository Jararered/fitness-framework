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

import PageCircuitBreak from "./pages/active/PageCircuitBreak";
import PageCircuitPreview from "./pages/active/PageCircuitPreview";
import PageExercise from "./pages/active/PageExercise";
import PageExerciseBreak from "./pages/active/PageExerciseBreak";
import PageWorkoutComplete from "./pages/active/PageWorkoutComplete";


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


            case "circuit-break":
                return <PageCircuitBreak setPage={setPage} />;
            case "circuit-preview":
                return <PageCircuitPreview setPage={setPage} />;
            case "exercise-break":
                return <PageExerciseBreak setPage={setPage} />;
            case "workout-complete":
                return <PageWorkoutComplete setPage={setPage} />;
            case "exercise":
                return <PageExercise setPage={setPage} />;

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

            <div className="bottom-padding">
            </div>

            <DockBar setContent={setPage} />
        </div>
    );
};

export default App;
