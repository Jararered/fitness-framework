import EquipmentToggles from "../components/gym/EquipmentToggles";
import ExerciseToggles from "../components/gym/ExerciseToggles";

const PageGym = () => {
    return (
        <div className="page-gym">

            <h1>Gym</h1>

            <div className="card">
                <EquipmentToggles />
            </div>

            <div className="card">
                <ExerciseToggles />
            </div>

        </div>
    );
};

export default PageGym;