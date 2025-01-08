import React from 'react';
import { FaDumbbell } from 'react-icons/fa';
import IconButton from './IconButton';
import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const WorkoutButton: React.FC<ClickableButtonProps> = (props) => (
    <IconButton {...props} icon={FaDumbbell} label="Workout" />
);

export default WorkoutButton;
