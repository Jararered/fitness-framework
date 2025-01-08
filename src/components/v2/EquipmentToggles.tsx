import { useEffect, useState, useCallback } from "react";

import { DefaultEquipment, EquipmentList, GetIconForEquipment } from "../../interfaces/Equipment"
import { DefaultExercises, ExerciseList } from "../../interfaces/Exercises";
import { FaCheck } from 'react-icons/fa';

const EquipmentToggles: React.FC = () => {
    const [equipmentState, setEquipmentState] = useState<EquipmentList>(DefaultEquipment);
    const [, setExerciseState] = useState<ExerciseList>(DefaultExercises);

    // Load equipment state from local storage or use default values
    useEffect(() => {
        const equipment = localStorage.getItem('equipment');
        if (equipment) {
            setEquipmentState(JSON.parse(equipment));
        } else {
            setEquipmentState(DefaultEquipment);
            saveEquipmentLocal(DefaultEquipment);
        }

        const exercises = localStorage.getItem('exercises');
        if (exercises) {
            setExerciseState(JSON.parse(exercises));
        } else {
            setExerciseState(DefaultExercises);
        }
    }, []);

    // Save equipment state to local storage
    const saveEquipmentLocal = useCallback((equipment: EquipmentList) => {
        localStorage.setItem('equipment', JSON.stringify(equipment));
    }, []);

    // Handle toggling equipment
    const handleEquipmentToggle = useCallback((name: string) => {
        setEquipmentState(prev => {
            const updatedEquipment = prev.map(equipment => {
                if (equipment.name === name) {
                    return { ...equipment, enabled: !equipment.enabled };
                }
                return equipment;
            });
            saveEquipmentLocal(updatedEquipment);
            return updatedEquipment;
        });
    }, [saveEquipmentLocal]);

    const handleResetEquipment = useCallback(() => {
        setEquipmentState(DefaultEquipment);
        saveEquipmentLocal(DefaultEquipment);
    }, [saveEquipmentLocal]);

    return (
        <div className="equipment-toggles">
            <h2>Equipment Toggles</h2>

            <div className="flexible-container">
                {equipmentState.map(equipment => (
                    <div
                        className={`small-card ${equipment.enabled ? 'enabled' : ''}`}
                        key={equipment.name}
                        onClick={() => handleEquipmentToggle(equipment.name)}
                    >
                        <div className="equipment-icon">{GetIconForEquipment(equipment.name)}</div>
                        <div className="small-card-name">{equipment.name}</div>
                        <div className="checkmark-icon">{equipment.enabled && <FaCheck size={24} />}</div>

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