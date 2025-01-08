import { useEffect, useState, useCallback } from "react";
import { FaCheck } from "react-icons/fa";

import { DefaultEquipment, Equipment, GetIconForEquipment } from "../../interfaces/Equipment"
import { DefaultExercises, Exercise } from "../../interfaces/Exercise";

const EquipmentToggles: React.FC = () => {
    const localEquipment = localStorage.getItem("equipment");
    const [equipmentState, setEquipmentState] = useState<Equipment[]>(
        localEquipment ? JSON.parse(localEquipment) : DefaultEquipment
    );

    const localExercises = localStorage.getItem("exercises");
    const [exerciseState, setExerciseState] = useState<Exercise[]>(
        localExercises ? JSON.parse(localExercises) : DefaultExercises
    );

    // Load equipment state from local storage or use default values
    useEffect(() => {
        localStorage.setItem("equipment", JSON.stringify(equipmentState));
    }, [equipmentState]);

    // Save equipment state to local storage
    const saveEquipmentLocal = useCallback((equipment: Equipment[]) => {
        localStorage.setItem("equipment", JSON.stringify(equipment));
    }, []);

    // Handle toggling equipment
    const handleEquipmentToggle = useCallback((name: string) => {
        setEquipmentState(prev => {
            if (!prev) return prev;
            const updatedEquipment = prev.map(equipment => {
                if (equipment.name === name) {
                    return equipment.config ? { ...equipment, config: { ...equipment.config, enabled: !equipment.config.enabled } } : equipment;
                }
                return equipment;
            });
            saveEquipmentLocal(updatedEquipment);
            return updatedEquipment;
        });
    } , [saveEquipmentLocal]);

    const handleResetEquipment = useCallback(() => {
        setEquipmentState(DefaultEquipment);
        saveEquipmentLocal(DefaultEquipment);
    }, [saveEquipmentLocal]);

    return (
        <div className="equipment-toggles">
            <h2>Equipment Toggles</h2>

            <div className="flexible-container">
                {equipmentState?.map(equipment => (
                    <div
                        className={`small-card ${equipment.config.enabled ? "enabled" : ""}`}
                        key={equipment.name}
                        onClick={() => handleEquipmentToggle(equipment.name)}
                    >
                        <div className="equipment-icon">{GetIconForEquipment(equipment.name)}</div>
                        <div className="small-card-name">{equipment.name}</div>
                        <div className="checkmark-icon">{equipment.config.enabled && <FaCheck size={24} />}</div>

                    </div>
                ))}
            </div>

            <button className="bad-button" onClick={handleResetEquipment} >
                Reset Equipment
            </button>

        </div>
    );
}

export default EquipmentToggles;