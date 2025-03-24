import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import EquipmentSelectPage from "../../pages/EquipmentSelectPage";
import WorkoutCreatePage from "../../pages/WorkoutCreatePage";
import ProfilePage from "../../pages/ProfilePage";
import SettingsPage from "../../pages/SettingsPage";
import { ExercisePage, PreviewNextCircuit, PreviewNextExercise } from "../../pages/ExercisePage";
import ExercisePreviewPage from "../../pages/ExercisePreviewPage";
import WorkoutCompletePage from "../../pages/WorkoutCompletePage";
import ManageDataPage from "../../pages/ManageDataPage";
import WorkoutOverview from "../../components/WorkoutOverview";
import SandboxPage from "../../pages/SandboxPage";

const AppRoutes = () => {
    const location = useLocation();

    return (
        <Routes
            location={location}
            key={location.pathname}
        >
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/equipment"
                element={<EquipmentSelectPage />}
            />
            <Route
                path="/create"
                element={<WorkoutCreatePage />}
            />
            <Route
                path="/profile"
                element={<ProfilePage />}
            />
            <Route
                path="/settings"
                element={<SettingsPage />}
            />
            <Route
                path="/preview"
                element={<ExercisePreviewPage />}
            />
            <Route
                path="/exercise"
                element={<ExercisePage />}
            />
            <Route
                path="/complete"
                element={<WorkoutCompletePage />}
            />
            <Route
                path="/manage-data"
                element={<ManageDataPage />}
            />
            <Route
                path="/workout-overview"
                element={<WorkoutOverview />}
            />
            <Route
                path="/sandbox"
                element={<SandboxPage />}
            />
            <Route
                path="/preview-next-exercise"
                element={<PreviewNextExercise />}
            />
            <Route
                path="/preview-next-circuit"
                element={<PreviewNextCircuit />}
            />
        </Routes>
    );
};

export default AppRoutes;
