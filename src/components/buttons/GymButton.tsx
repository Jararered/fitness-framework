import React from 'react';
import { FaMapPin } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const GymButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaMapPin;
    return (
        <div className="button" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Gym Equipment </>}
        </div>
    );
};

export default GymButton;
