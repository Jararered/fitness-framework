import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuHouse, LuDumbbell, LuMapPin, LuUser, LuCog } from "react-icons/lu";

import { useWorkoutStore } from "../../workouts/hooks/useWorkoutStore";

import "./DockBar.css";

const DockBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { workoutState } = useWorkoutStore();

    return (
        <span className={`dockbar ${workoutState.isStarted ? "hidden" : ""}`}>
            <div
                className={`icon-button ${location.pathname === "/" ? "active" : ""}`}
                onClick={() => navigate("/")}
            >
                <LuHouse />
            </div>
            <div
                className={`icon-button ${location.pathname === "/equipment" ? "active" : ""}`}
                onClick={() => navigate("/equipment")}
            >
                <LuMapPin />
            </div>
            <div
                className={`icon-button ${location.pathname === "/create" ? "active" : ""}`}
                onClick={() => navigate("/create")}
            >
                <LuDumbbell />
            </div>
            <div
                className={`icon-button ${location.pathname === "/profile" ? "active" : ""}`}
                onClick={() => navigate("/profile")}
            >
                <LuUser />
            </div>
            <div
                className={`icon-button ${location.pathname === "/settings" ? "active" : ""}`}
                onClick={() => navigate("/settings")}
            >
                <LuCog />
            </div>
        </span>
    );
};

export default DockBar;
