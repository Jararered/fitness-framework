import React from "react";

import { FaHome } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

import "./DockBar.css";

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
                <FaHome size={24} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("workout")}>
                <FaDumbbell size={24} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("gym")}>
                <FaMapPin size={24} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("profile")}>
                <FaUser size={24} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("settings")}>
                <FaCog size={24} />
            </div>
        </div>
    );
};

export default DockBar;