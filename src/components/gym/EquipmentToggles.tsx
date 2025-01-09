import { useEffect, useState, useCallback } from "react";
import { FaCheck } from "react-icons/fa";

import { DefaultEquipment, Equipment, GetIconForEquipment } from "../../interfaces/Equipment"
import { Keys } from "../../interfaces/Storage";

const EquipmentToggles: React.FC = () => {

    const localEquipment = localStorage.getItem(Keys.Equipment);
    const [equipmentState, setEquipmentState] = useState<Equipment[]>(
        localEquipment ? JSON.parse(localEquipment) : DefaultEquipment
    );

    useEffect(() => {
        localStorage.setItem(Keys.Equipment, JSON.stringify(equipmentState));
    }, [equipmentState]);

    const handleEquipmentToggle = useCallback((name: string) => {
        const newEquipmentState = equipmentState.map(equipment => {
            if (equipment.name === name) {
                equipment.config.enabled = !equipment.config.enabled;
            }
            return equipment;
        });
        setEquipmentState(newEquipmentState);
    }, [equipmentState]);

    return (
        <div className="equipment-toggles">

            <h2>Equipment Toggles</h2>

            <div className="flexible-container">
                {equipmentState?.map(equipment => (
                    <div className={`small-card ${equipment.config.enabled ? "enabled" : ""}`}
                        key={equipment.name}
                        onClick={() => handleEquipmentToggle(equipment.name)}
                    >
                        <div className="equipment-icon">{GetIconForEquipment(equipment.name)}</div>
                        <div className="small-card-name">{equipment.name}</div>
                        <div className="checkmark-icon">{equipment.config.enabled && <FaCheck size={24} />}</div>

                    </div>
                ))}
            </div>

            <button className="bad-button" onClick={() => setEquipmentState(DefaultEquipment)}>
                Reset Equipment
            </button>

        </div>
    );
}

export default EquipmentToggles;