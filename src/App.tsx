import { Routes, Route, useLocation } from "react-router-dom";
import { useWorkout } from "./context/WorkoutContext.tsx";

import DockBar from "./components/DockBar.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import PageTransition from "./components/PageTransition.tsx";

import HomePage from "./pages/HomePage.tsx";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage.tsx";
import WorkoutCreationPage from "./pages/WorkoutCreationPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ExercisePreviewPage from "./pages/ExercisePreviewPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import WorkoutCompletePage from "./pages/WorkoutCompletePage.tsx";

import "./styles/components/App.css";

function App() {
    const { settings } = useWorkout();
    const location = useLocation();

    return (
        <div className={`App ${settings.darkMode ? "dark-mode" : ""}`}>
            <PageTransition>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/equipment" element={<EquipmentSelectionPage />} />
                    <Route path="/create" element={<WorkoutCreationPage />} />
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