import { useCallback } from "react";
import { FaCheck } from "react-icons/fa";

import { Equipment, GetIconForEquipment } from "../interfaces/Equipment"
import LocalStorage, { Keys } from "../interfaces/Storage";
import { DefaultEquipment } from "../interfaces/Defaults";

import "./EquipmentToggle.css"

const EquipmentToggle = ({ equipment, handleEquipmentToggle }: { equipment: Equipment, handleEquipmentToggle: (name: string) => void }) => {
    return (
        <div className={`equipment-toggle ${equipment.config.enabled ? "enabled" : ""}`}
            onClick={() => handleEquipmentToggle(equipment.name)}
        >
            <div className="icon">{GetIconForEquipment(equipment.name)}</div>
            <div className="name">{equipment.name}</div>
            <div className="check">{equipment.config.enabled && <FaCheck size={18} />}</div>
        </div>
    );
}

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

            <div className="flex">
                {equipment.map((equipment, index) => (
                    <EquipmentToggle key={index} equipment={equipment} handleEquipmentToggle={handleEquipmentToggle} />
                ))}
            </div>

            <button className="bad" onClick={() => setEquipment(DefaultEquipment)}>
                Reset Equipment
            </button>

        </div>
    );
}

export default EquipmentToggles;