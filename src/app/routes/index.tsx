import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import EquipmentSelectPage from "../../features/equipment/components/EquipmentSelectPage";
import WorkoutCreate from "../../features/workouts/components/WorkoutCreate";
import ProfilePage from "../../pages/ProfilePage";
import { Settings } from "../../features/settings/components/Settings";
import { ExercisePage } from "../../features/exercises/components/ExercisePage";
import ExercisePreviewPage from "../../features/exercises/components/ExercisePreviewPage";
import WorkoutComplete from "../../features/workouts/components/WorkoutComplete";
import ManageDataPage from "../../pages/ManageDataPage";
import WorkoutOverview from "../../features/workouts/components/WorkoutOverview";

import RouteAnimation from "../../features/layout/components/RouteAnimation";

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <RouteAnimation>
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
          element={<WorkoutCreate />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route
          path="/preview-exercise"
          element={<ExercisePreviewPage />}
        />
        <Route
          path="/exercise"
          element={<ExercisePage />}
        />
        <Route
          path="/complete"
          element={<WorkoutComplete />}
        />
        <Route
          path="/manage-data"
          element={<ManageDataPage />}
        />
        <Route
          path="/workout-overview"
          element={<WorkoutOverview />}
        />
      </Routes>
    </RouteAnimation>
  );
};
