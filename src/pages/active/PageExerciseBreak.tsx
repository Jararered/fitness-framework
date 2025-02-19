import React from "react";

import { Workout, NullWorkout } from "../../interfaces/Workout";
import LocalStorage, {Keys} from "../../interfaces/Storage";
import { SetPageProps } from "../../App";

const PageExerciseBreak = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);

    return (
        <div className="page-exercise-break">
            <h1>Exercise Break</h1>
        </div>
    );
};

export default PageExerciseBreak;
