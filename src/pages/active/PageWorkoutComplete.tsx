import React from "react";

import { Workout, NullWorkout } from "../../interfaces/Workout";
import LocalStorage, { Keys } from "../../interfaces/Storage";
import { SetPageProps } from "../../App";

const PageWorkoutComplete = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);

    const handleSaveWorkout = () => {

    }

    const handleReturnHome = () => {
        setTimeout(() => { setPage("home") }, 0)
    }

    return (
        <div className="page-workout-complete">
            <h1>Workout Complete</h1>

            <div className="card">

                <button onClick={handleSaveWorkout}>
                    Save Workout
                </button>

                <button onClick={handleReturnHome}>
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default PageWorkoutComplete;
