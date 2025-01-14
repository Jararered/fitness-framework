import React from "react";
import { FaMapPin } from "react-icons/fa";

import IconButton, { IconButtonProps } from "./IconButton";
import "./Button.css";

const GymButton: React.FC<IconButtonProps> = (props) => {
    return <IconButton {...props} icon={FaMapPin} label="Gym" />;
};

export default GymButton;
