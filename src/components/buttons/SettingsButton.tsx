import React from 'react';
import { FaCog } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';

const SettingsButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaCog;
    return (
        <li className="navigation-menu-item" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Settings </>}
        </li>
    );
};

export default SettingsButton;
