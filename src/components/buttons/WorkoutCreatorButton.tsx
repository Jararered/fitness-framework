import React from 'react';
import { FaDumbbell } from 'react-icons/fa';
import IconButton from './IconButton';
import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const WorkoutCreatorButton: React.FC<ClickableButtonProps> = (props) => {
    return <IconButton {...props} icon={FaDumbbell} label="Workout Creator" />;
};

export default WorkoutCreatorButton;
