import React from 'react';
import { FaCog } from 'react-icons/fa';
import IconButton from './IconButton';
import { ClickableButtonProps } from './ButtonProps';
import './Button.css';

const SettingsButton: React.FC<ClickableButtonProps> = (props) => {
    return <IconButton {...props} icon={FaCog} label="Settings" />;
};

export default SettingsButton;
