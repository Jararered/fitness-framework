import React from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';

const WorkoutButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaDumbbell;
    return (
        <li className="navigation-menu-item" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Workout </>}
        </li>
    );
};

export default WorkoutButton;
