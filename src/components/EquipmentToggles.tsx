import { useCallback } from "react";
import { FaCheck } from "react-icons/fa";

import { DefaultEquipment, Equipment, GetIconForEquipment } from "../interfaces/Equipment"
import LocalStorage, { Keys } from "../interfaces/Storage";

const EquipmentToggles: React.FC = () => {
    const [equipment, setEquipment] = LocalStorage<Equipment[]>(Keys.Equipment, DefaultEquipment);

    const handleEquipmentToggle = useCallback((name: string) => {
        const newEquipment = equipment.map(equipment => {
            if (equipment.name === name) {
                equipment.config.enabled = !equipment.config.enabled;
            }
            return equipment;
        });
        setEquipment(newEquipment);
    }, [equipment]);

    return (
        <div className="equipment-toggles">

            <h2>Equipment Toggles</h2>

            <div className="flexible-container">
                {equipment?.map(equipment => (
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

            <button className="bad-button" onClick={() => setEquipment(DefaultEquipment)}>
                Reset Equipment
            </button>

        </div>
    );
}

export default EquipmentToggles;