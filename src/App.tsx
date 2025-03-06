import { Routes, Route } from "react-router-dom";
import { useWorkout } from "./context/WorkoutContext.tsx";

import DockBar from "./components/DockBar.tsx";

import HomePage from "./pages/HomePage.tsx";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage.tsx";
import WorkoutCreationPage from "./pages/WorkoutCreationPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ExercisePreviewPage from "./pages/ExercisePreviewPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import WorkoutCompletePage from "./pages/WorkoutCompletePage.tsx";

import "./App.css";

function App() {
    const { settings } = useWorkout();

    return (
        <div className={`App ${settings.darkMode ? "dark-mode" : ""}`}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/equipment" element={<EquipmentSelectionPage />} />
                <Route path="/create" element={<WorkoutCreationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/preview" element={<ExercisePreviewPage />} />
                <Route path="/exercise" element={<ExercisePage />} />
                <Route path="/complete" element={<WorkoutCompletePage />} />
            </Routes>
            <DockBar />
        </div>
    );
}

export default App;