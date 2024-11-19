import React from 'react';
import { IconType } from 'react-icons';
import './IconButton.css';

interface IconButtonProps {
    onClick: () => void;
    isCollapsed: boolean;
    icon: IconType;
    label: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, isCollapsed, icon: Icon, label }) => {
    return (
        <div className="icon-button" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> {label} </>}
        </div>
    );
};

export default IconButton;