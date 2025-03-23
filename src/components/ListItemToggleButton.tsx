import React from "react";

import { LuSquare, LuSquareCheckBig } from "react-icons/lu";

import "../styles/components/ListItemToggleButton.css";

interface ListItemToggleButtonProps {
    icon: React.ReactNode;
    equipment: string;
    enabled: boolean;
    handleEquipmentToggle: (name: string) => void;
}

const ListItemToggleButton: React.FC<ListItemToggleButtonProps> = ({
    icon,
    equipment,
    enabled,
    handleEquipmentToggle,
}) => {
    return (
        <button
            className={`list-item-toggle-button ${enabled ? "enabled" : "disabled"}`}
            onClick={() => handleEquipmentToggle(equipment)}
        >
            <div className="icon"> {icon} </div>
            <strong className="name">{equipment}</strong>
            <div className="check-box">{enabled ? <LuSquareCheckBig /> : <LuSquare />}</div>
        </button>
    );
};

export { ListItemToggleButton };
