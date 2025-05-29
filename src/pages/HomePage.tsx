import React from "react";

import { Card } from "../features/layout/components/Card.tsx";
import WorkoutPreview from "../features/workouts/components/WorkoutPreview.tsx";

import ApiTester from "../app/ApiTester.tsx";

const HomePage: React.FC = () => {
  return (
    <div className="home-page page-container">
      <h1>Home</h1>

      <ApiTester />

      <Card
        title="Workout Preview"
        description="Below will show a preview of your workout once you have loaded a workout."
        content={<WorkoutPreview />}
      />
    </div>
  );
};

export default HomePage;
