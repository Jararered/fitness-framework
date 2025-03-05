import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import EquipmentSelectionPage from "./pages/EquipmentSelectionPage.tsx";
import WorkoutCreationPage from "./pages/WorkoutCreationPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ExercisePreviewPage from "./pages/ExercisePreviewPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import WorkoutCompletePage from "./pages/WorkoutCompletePage.tsx";

function App() {
    return (
        <div className="App">
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
        </div>
    );
}

export default App;