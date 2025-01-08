import React from "react";
import { FaUser } from "react-icons/fa";
import IconButton from "./IconButton";
import { ClickableButtonProps } from "./ButtonProps";
import "./Button.css";

const ProfileButton: React.FC<ClickableButtonProps> = (props) => {
    return <IconButton {...props} icon={FaUser} label="Profile" />;
};

export default ProfileButton;