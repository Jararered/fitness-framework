import React from "react";
import { FaUser } from "react-icons/fa";

import IconButton, { IconButtonProps } from "./IconButton";
import "./Button.css";

const ProfileButton: React.FC<IconButtonProps> = (props) => {
    return <IconButton {...props} icon={FaUser} label="Profile" />;
};

export default ProfileButton;