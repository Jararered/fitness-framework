import React, { useState } from "react";

import { FaMapPin } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

import IconButton from "./IconButton";
import "./IconButton.css";

import "./SideBar.css";

interface SideBarProps {
    setContent: (view: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setContent }) => {

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
                <IconButton icon={FaHome} />
                <h2>{expanded && "Home"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("workout")}>
                <IconButton icon={FaDumbbell} />
                <h2>{expanded && "Workout"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("gym")}>
                <IconButton icon={FaMapPin} />
                <h2>{expanded && "Gym"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("profile")}>
                <IconButton icon={FaUser} />
                <h2>{expanded && "Profile"}</h2>
            </div>
            <div className="icon-button" onClick={() => handleNavigate("settings")}>
                <IconButton icon={FaCog} />
                <h2>{expanded && "Settings"}</h2>
            </div>
        </div>
    );
};

export default SideBar;
