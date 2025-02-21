import EquipmentToggles from "../components/EquipmentToggles";
// import ExerciseToggles from "../components/ExerciseToggles";

const PageGym = () => {
    return (
        <div className="page-gym">

            <h1>Gym</h1>

            <div className="card">
                <EquipmentToggles />
            </div>

            {/* <div className="card">
                <ExerciseToggles />
            </div> */}

        </div>
    );
};

export default PageGym;