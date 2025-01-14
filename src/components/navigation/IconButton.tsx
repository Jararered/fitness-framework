import React from "react";
import { IconType } from "react-icons";

export interface IconButtonProps {
    icon: IconType;
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon }) => {
    return (
        <div className="icon-button">
            <Icon size={24} />
        </div>
    );
};

export default IconButton;