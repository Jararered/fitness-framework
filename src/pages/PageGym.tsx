import EquipmentToggles from "../components/v2/EquipmentToggles";
import ExerciseToggles from "../components/v2/ExerciseToggles";

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