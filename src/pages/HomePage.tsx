import React from "react";

import WorkoutPreview from "../components/WorkoutPreview.tsx";

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <h1>Home</h1>
            <div className="card">
                <WorkoutPreview />
            </div>
        </div>
    );
};

export default HomePage;
