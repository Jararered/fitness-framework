import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const ProfileButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaUser;
    return (
        <div className="button" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Profile </>}
        </div>
    );
};

export default ProfileButton;