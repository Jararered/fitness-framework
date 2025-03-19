import React from "react";
import { LuCheck, LuDumbbell } from "react-icons/lu";

import "../styles/components/EquipmentToggle.css";

interface EquipmentToggleProps {
    equipment: string;
    enabled: boolean;
    handleEquipmentToggle: (name: string) => void;
}

const EquipmentToggleListItem: React.FC<EquipmentToggleProps> = ({ equipment, enabled, handleEquipmentToggle }) => {
    return (
        <span className={`equipment-toggle ${enabled ? "enabled" : ""}`} onClick={() => handleEquipmentToggle(equipment)}>
            <div className="icon"> {<LuDumbbell />} </div>
            <div className="name">{equipment}</div>
            <div className="check-box">{enabled && <LuCheck />}</div>
        </span>
    );
};

export { EquipmentToggleListItem };
