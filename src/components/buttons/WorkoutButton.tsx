import React from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const WorkoutButton: React.FC<ClickableButtonProps> = ({ onClick, isCollapsed }) => {
    const Icon: IconType = FaDumbbell;
    return (
        <div className="button" onClick={onClick}>
            {isCollapsed ? <Icon size={24} /> : <> <Icon size={24} /> Workout </>}
        </div>
    );
};

export default WorkoutButton;
