import React from 'react';
import { FaHome } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const HomeButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaHome;
    return (
        <div className="button" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Home </>}
        </div>
    );
};

export default HomeButton;
