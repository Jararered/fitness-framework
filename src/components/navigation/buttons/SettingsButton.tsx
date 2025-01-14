import React from "react";
import { FaCog } from "react-icons/fa";

import IconButton, { IconButtonProps } from "./IconButton";
import "./Button.css";

const SettingsButton: React.FC<IconButtonProps> = (props) => {
    return <IconButton {...props} icon={FaCog} label="Settings" />;
};

export default SettingsButton;
