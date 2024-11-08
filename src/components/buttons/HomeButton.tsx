import React from 'react';
import { FaHome } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';

const HomeButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaHome;
    return (
        <li className="navigation-menu-item" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Home </>}
        </li>
    );
};

export default HomeButton;
