import React from "react";

import { FaHome, FaDumbbell, FaMapPin, FaUser, FaCog } from "react-icons/fa";

import "./Navigation.css";

interface NavigateProps {
    setContent: (view: string) => void;
}

const DockBar: React.FC<NavigateProps> = ({ setContent: setContent }) => {
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

export { DockBar };
