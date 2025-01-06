import { useEffect, useState } from "react";

import WorkoutPreview from "../components/v2/WorkoutPreview";

const PageWorkout: React.FC = () => {
    const [workoutState, setWorkoutState] = useState();

    return (
        <div className="page-workout">

            <h1>Workout</h1>

            <div className="card">
                <WorkoutPreview />
            </div>

        </div>
    );
};

export default PageWorkout;
