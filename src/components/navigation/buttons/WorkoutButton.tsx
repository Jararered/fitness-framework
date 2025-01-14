import React from "react";
import { FaDumbbell } from "react-icons/fa";

import IconButton, { IconButtonProps } from "./IconButton";
import "./Button.css";

const WorkoutButton: React.FC<IconButtonProps> = (props) => (
    <IconButton {...props} icon={FaDumbbell} label="Workout" />
);

export default WorkoutButton;
