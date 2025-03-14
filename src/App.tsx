import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext.tsx";

import DockBar from "./components/DockBar.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import PageTransition from "./components/PageTransition.tsx";

import HomePage from "./pages/HomePage.tsx";
import EquipmentSelectPage from "./pages/EquipmentSelectPage.tsx";
import WorkoutCreatePage from "./pages/WorkoutCreatePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ExercisePreviewPage from "./pages/ExerciseOverviewPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import WorkoutCompletePage from "./pages/WorkoutCompletePage.tsx";

import "./styles/components/App.css";

function App() {
    const { settings } = useUser();
    const location = useLocation();

    return (
        <div className={`App ${settings.darkMode ? "dark-mode" : ""}`}>
            <PageTransition>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/equipment" element={<EquipmentSelectPage />} />
                    <Route path="/create" element={<WorkoutCreatePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/preview" element={<ExercisePreviewPage />} />
                    <Route path="/exercise" element={<ExercisePage />} />
                    <Route path="/complete" element={<WorkoutCompletePage />} />
                </Routes>
            </PageTransition>
            <ToastContainer />
            <DockBar />
        </div>
    );
}

export default App;