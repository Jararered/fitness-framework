import React from "react";
import { FaMapPin } from "react-icons/fa";
import IconButton from "./IconButton";
import { ClickableButtonProps } from "./ButtonProps";
import "./Button.css";

const GymButton: React.FC<ClickableButtonProps> = (props) => {
    return <IconButton {...props} icon={FaMapPin} label="Gym" />;
};

export default GymButton;
