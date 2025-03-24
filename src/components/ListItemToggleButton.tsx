import React from "react";

import { LuSquare, LuSquareCheckBig } from "react-icons/lu";

import "../styles/components/ListItemToggleButton.css";

interface ListItemToggleButtonProps {
    icon: React.ReactNode;
    name: string;
    enabled: boolean;
    handleToggle: (name: string) => void;
}

const ListItemToggleButton: React.FC<ListItemToggleButtonProps> = ({
    icon,
    name,
    enabled,
    handleToggle,
}) => {
    return (
        <button
            className={`list-item-toggle-button ${enabled ? "enabled" : "disabled"}`}
            onClick={() => handleToggle(name)}
        >
            <div className="icon"> {icon} </div>
            <strong className="name">{name}</strong>
            <div className="check-box">{enabled ? <LuSquareCheckBig /> : <LuSquare />}</div>
        </button>
    );
};

export { ListItemToggleButton };
