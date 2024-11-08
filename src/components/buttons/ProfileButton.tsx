import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';

const ProfileButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaUser;
    return (
        <li className="navigation-menu-item" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Profile </>}
        </li>
    );
};

export default ProfileButton;