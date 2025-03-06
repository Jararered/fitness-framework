import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaDumbbell, FaMapPin, FaUser, FaCog } from "react-icons/fa";

import "../styles/components/DockBar.css";
import "../styles/components/IconButton.css";

const DockBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dockbar">
            <div className="icon-button" onClick={() => navigate("/")}>
                <FaHome size={24} />
            </div>
            <div className="icon-button" onClick={() => navigate("/equipment")}>
                <FaMapPin size={24} />
            </div>
            <div className="icon-button" onClick={() => navigate("/create")}>
                <FaDumbbell size={24} />
            </div>
            <div className="icon-button" onClick={() => navigate("/profile")}>
                <FaUser size={24} />
            </div>
            <div className="icon-button" onClick={() => navigate("/settings")}>
                <FaCog size={24} />
            </div>
        </div>
    );
};

export default DockBar;