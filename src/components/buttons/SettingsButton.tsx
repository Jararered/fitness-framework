import React from 'react';
import { FaCog } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const SettingsButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaCog;
    return (
        <div className="button" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Settings </>}
        </div>
    );
};

export default SettingsButton;
