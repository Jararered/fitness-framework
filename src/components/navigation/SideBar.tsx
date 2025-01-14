import React, { useState } from "react";

import HomeButton from "./buttons/HomeButton";
import WorkoutButton from "./buttons/WorkoutButton";
import GymButton from "./buttons/GymButton";
import ProfileButton from "./buttons/ProfileButton";
import SettingsButton from "./buttons/SettingsButton";

import "./SideBar.css";

interface SideBarProps {
    onNavigate: (view: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onNavigate }) => {

    const [expanded, setExpanded] = useState(false);

    const handleNavigate = (view: string) => {
        if (view === "") {
            setExpanded(!expanded);
        } else {
            onNavigate(view);
            setExpanded(false);
        }
    };

    return (
        <div className={`sidebar ${expanded ? "expanded" : ""}`}>
            <button className="expand-button" onClick={() => handleNavigate("")}>
                {expanded ? "✕" : "☰"}
            </button>

            <HomeButton onClick={() => handleNavigate("home")} isCollapsed={!expanded} />
            <WorkoutButton onClick={() => handleNavigate("workout")} isCollapsed={!expanded} />
            <GymButton onClick={() => handleNavigate("gym")} isCollapsed={!expanded} />
            <ProfileButton onClick={() => handleNavigate("profile")} isCollapsed={!expanded} />
            <SettingsButton onClick={() => handleNavigate("settings")} isCollapsed={!expanded} />
        </div>
    );
};

export default SideBar;
