import React from "react";

import WorkoutPreview from "../components/WorkoutPreview.tsx";

const HomePage: React.FC = () => {
    return (
        <div className="home-page page-container">
            <h1>Home</h1>
            <div className="card">
                <div className="card-header">
                    <h2>Workout Preview</h2>
                    <p>Below will show a preview of your workout once you have loaded a workout.</p>
                </div>

                <WorkoutPreview />
            </div>
        </div>
    );
};

export default HomePage;
