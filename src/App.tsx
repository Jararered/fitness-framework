import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext.tsx";
import { IconContext } from "react-icons";

import DockBar from "./components/DockBar.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import PageTransition from "./components/PageTransition.tsx";
import FooterCard from "./components/FooterCard.tsx";
import { useFooterCard } from "./context/FooterCardContext.tsx";

import HomePage from "./pages/HomePage.tsx";
import EquipmentSelectPage from "./pages/EquipmentSelectPage.tsx";
import WorkoutCreatePage from "./pages/WorkoutCreatePage.tsx";
import TestPage from "./components/PopupContainer.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import ExercisePreviewPage from "./pages/ExercisePreviewPage.tsx";
import WorkoutCompletePage from "./pages/WorkoutCompletePage.tsx";
import ManageDataPage from "./pages/ManageDataPage.tsx";
import CircuitPreviewPage from "./pages/CircuitPreviewPage.tsx";

import "./styles/components/App.css";
import "./styles/components/Card.css";

function App() {
    const { settings } = useUser();
    const location = useLocation();
    const { isVisible, content, hideFooterCard } = useFooterCard();

    return (
        <div className={`App ${settings.darkMode ? "dark-mode" : ""}`}>
            <IconContext.Provider value={{ size: "1.5rem" }}>
                <PageTransition>
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
                            path="/test"
                            element={<TestPage />}
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
                            path="/circuit-preview"
                            element={<CircuitPreviewPage />}
                        />
                    </Routes>
                </PageTransition>
                <ToastContainer />
                <DockBar />
                <FooterCard
                    isVisible={isVisible}
                    content={content}
                    onClose={hideFooterCard}
                />
            </IconContext.Provider>
        </div>
    );
}

export default App;
