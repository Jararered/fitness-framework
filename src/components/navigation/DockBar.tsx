import React from "react";

import { FaHome } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

import "./DockBar.css";
import IconButton from "./IconButton";

interface DockBarProps {
    setContent: (view: string) => void;
}

const DockBar: React.FC<DockBarProps> = ({ setContent: setContent }) => {
    const handleNavigate = (view: string) => {
        setContent(view);
    };

    return (
        <div className="dockbar">
            <div className="icon-button" onClick={() => handleNavigate("home")}>
                <IconButton icon={FaHome} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("workout")}>
                <IconButton icon={FaDumbbell} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("gym")}>
                <IconButton icon={FaMapPin} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("profile")}>
                <IconButton icon={FaUser} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("settings")}>
                <IconButton icon={FaCog} />
            </div>
        </div>
    );
};

export default DockBar;