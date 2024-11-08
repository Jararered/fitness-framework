import React from 'react';
import { FaMapPin } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';

const GymButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaMapPin;
    return (
        <li className="navigation-menu-item" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Gym Equipment </>}
        </li>
    );
};

export default GymButton;
