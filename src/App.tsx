import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext.tsx";
import { IconContext } from "react-icons";

import DockBar from "./components/DockBar.tsx";
import PageTransition from "./components/PageTransition.tsx";
import { useContainer } from "./context/ContainerContext.tsx";

import HomePage from "./pages/HomePage.tsx";
import EquipmentSelectPage from "./pages/EquipmentSelectPage.tsx";
import WorkoutCreatePage from "./pages/WorkoutCreatePage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import ExercisePreviewPage from "./pages/ExercisePreviewPage.tsx";
import WorkoutCompletePage from "./pages/WorkoutCompletePage.tsx";
import ManageDataPage from "./pages/ManageDataPage.tsx";
import SandboxPage from "./pages/SandboxPage.tsx";

import WorkoutOverview from "./components/WorkoutOverview.tsx";
import ContainerPopup from "./components/ContainerPopup.tsx";
import ContainerFooter from "./components/ContainerFooter.tsx";
import ContainerToast from "./components/ContainerToast.tsx";

import "./styles/components/App.css";
import "./styles/components/Card.css";

function App() {
    const { settings } = useUser();
    const location = useLocation();
    const { isFooterOpen, contentFooter, hideFooterCard } = useContainer();
    const { isPopupOpen, contentPopup, hidePopup } = useContainer();

    const dimApp = isPopupOpen || isFooterOpen;

    return (
        <div className={`App ${settings.darkMode ? "dark-mode" : ""} `}>
            <IconContext.Provider value={{ size: "1.5rem" }}>
                <ContainerPopup
                    isOpen={isPopupOpen}
                    content={contentPopup}
                    onClose={hidePopup}
                />
                <ContainerToast />

                <div className={`app-content ${dimApp ? "dimmed" : ""}`}>
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
                        </Routes>
                    </PageTransition>
                </div>

                <div className={dimApp ? "dimmed" : ""}>
                    <DockBar />
                </div>

                <ContainerFooter
                    isOpen={isFooterOpen}
                    content={contentFooter}
                    onClose={hideFooterCard}
                />
            </IconContext.Provider>
        </div>
    );
}

export default App;
