import React, { useState } from "react";

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



const SideBar: React.FC<NavigateProps> = ({ setContent }) => {
    const [expanded, setExpanded] = useState(false);

    const handleNavigate = (view: string) => {
        if (view === "") {
            setExpanded(!expanded);
        } else {
            setContent(view);
            setExpanded(false);
        }
    };

    return (
        <div className={`sidebar ${expanded ? "expanded" : ""}`}>
            <button className="expand-button" onClick={() => handleNavigate("")}>
                {expanded ? "✕" : "☰"}
            </button>

            <div className="icon-button" onClick={() => handleNavigate("home")}>
                <FaHome size={24} />
                <h2>{expanded && "Home"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("workout")}>
                <FaDumbbell size={24} />
                <h2>{expanded && "Workout"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("gym")}>
                <FaMapPin size={24} />
                <h2>{expanded && "Gym"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("profile")}>
                <FaUser size={24} />
                <h2>{expanded && "Profile"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("settings")}>
                <FaCog size={24} />
                <h2>{expanded && "Settings"}</h2>
            </div>
        </div>
    );
};

export { SideBar, DockBar };
