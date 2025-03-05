import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaDumbbell, FaMapPin, FaUser, FaCog } from "react-icons/fa";
import "./DockBar.css";

const DockBar: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (view: string) => {
        switch (view) {
            case "home":
                navigate("/");
                break;
            case "workout":
                navigate("/create");
                break;
            case "gym":
                navigate("/equipment");
                break;
            case "profile":
                navigate("/profile");
                break;
            case "settings":
                navigate("/settings");
                break;
            default:
                navigate("/");
        }
    };

    return (
        <div className="dockbar">
            <div className="icon-button" onClick={() => handleNavigate("home")}>
                <FaHome size={24} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("gym")}>
                <FaMapPin size={24} />
            </div>
            <div className="icon-button" onClick={() => handleNavigate("workout")}>
                <FaDumbbell size={24} />
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