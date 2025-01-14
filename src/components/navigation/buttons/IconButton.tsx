import React from "react";
import { IconType } from "react-icons";

import "./Button.css";

export interface IconButtonProps {
    onClick: () => void;
    isCollapsed: boolean;
    icon: IconType;
    label: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, isCollapsed, icon: Icon, label }) => {
    return (
        <div className="button" onClick={onClick}>
            <Icon size={24} />
            {!isCollapsed && label}
        </div>
    );
};

export default IconButton;