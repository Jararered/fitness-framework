import React from "react";
import { FaHome } from "react-icons/fa";

import IconButton, { IconButtonProps } from "./IconButton";
import "./Button.css";

const HomeButton: React.FC<IconButtonProps> = (props) => {
    return <IconButton {...props} icon={FaHome} label="Home" />;
};

export default HomeButton;
