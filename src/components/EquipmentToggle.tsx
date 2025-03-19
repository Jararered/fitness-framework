import React from "react";
import { FaCheck, FaDumbbell } from "react-icons/fa";

import "../styles/components/EquipmentToggle.css";

interface EquipmentToggleProps {
    equipment: string;
    enabled: boolean;
    handleEquipmentToggle: (name: string) => void;
}

const EquipmentToggleListItem: React.FC<EquipmentToggleProps> = ({ equipment, enabled, handleEquipmentToggle }) => {
    return (
        <span className={`equipment-toggle ${enabled ? "enabled" : ""}`} onClick={() => handleEquipmentToggle(equipment)}>
            <div className="icon"> {<FaDumbbell size={30} />} </div>
            <div className="name">{equipment}</div>
            <div className="check">{enabled && <FaCheck size={20} />}</div>
        </span>
    );
};

export { EquipmentToggleListItem };
