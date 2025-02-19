import React from "react";

import { Workout, NullWorkout } from "../../interfaces/Workout";
import LocalStorage, {Keys} from "../../interfaces/Storage";
import { SetPageProps } from "../../App";

const PageCircuitBreak = ({ setPage }: SetPageProps) => {
    const [workout, setWorkout] = LocalStorage<Workout>(Keys.Workout, NullWorkout);

    return (
        <div className="page-circuit-break">
            <h1>Circuit Break</h1>
        </div>
    );
};

export default PageCircuitBreak;
