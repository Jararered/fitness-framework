import React from "react";
import { FaHome } from "react-icons/fa";
import IconButton from "./IconButton";
import { ClickableButtonProps } from "./ButtonProps";
import "./Button.css";

const HomeButton: React.FC<ClickableButtonProps> = (props) => {
    return <IconButton {...props} icon={FaHome} label="Home" />;
};

export default HomeButton;
