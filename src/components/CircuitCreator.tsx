import { Exercise, GetAvaliableExercises } from "../interfaces/Exercise";
import { Equipment} from "../interfaces/Equipment";
import { DefaultExercises, DefaultEquipment } from "../interfaces/Defaults";

import LocalStorage, { Keys } from "../interfaces/Storage";

const CircuitCreator: React.FC = () => {
    const [exercises] = LocalStorage<Exercise[]>(Keys.Exercises, DefaultExercises);
    const [equipment] = LocalStorage<Equipment[]>(Keys.Equipment, DefaultEquipment);

    return (
        <div className="circuit-creator">

            <h2>Circuit Creator</h2>

            <div className="flex">

                <select>
                    <option value="0">Select Exercise</option>
                    {
                        GetAvaliableExercises(exercises, equipment).map((exercise, index) => {
                            return (
                                <option key={index} value={index}>
                                    {exercise}
                                </option>
                            );
                        })
                    };
                </select>

                <input type="number" placeholder="Sets"

                />

            </div>

            <button onClick={() => { }}>
                Add Exercise
            </button>

            <div className="flex">
                <button onClick={() => { }}>
                    Add to Circuit
                </button>

                <button onClick={() => { }}>
                    Reset Inputs
                </button>
            </div>
        </div>
    );
};

export default CircuitCreator;

