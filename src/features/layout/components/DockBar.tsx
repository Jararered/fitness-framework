import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuHouse, LuDumbbell, LuMapPin, LuUser, LuCog } from "react-icons/lu";

import "./DockBar.css";

interface DockBarProps {
  shouldHideDockBar: boolean;
}

export const DockBar: React.FC<DockBarProps> = ({ shouldHideDockBar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`dockbar ${shouldHideDockBar ? "hidden" : ""}`}>
      <div
        className={`icon-button ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <LuHouse size={28} />
      </div>
      <div
        className={`icon-button ${location.pathname === "/equipment" ? "active" : ""}`}
        onClick={() => navigate("/equipment")}
      >
        <LuMapPin size={28} />
      </div>
      <div
        className={`icon-button ${location.pathname === "/create" ? "active" : ""}`}
        onClick={() => navigate("/create")}
      >
        <LuDumbbell size={28} />
      </div>
      <div
        className={`icon-button ${location.pathname === "/profile" ? "active" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <LuUser size={28} />
      </div>
      <div
        className={`icon-button ${location.pathname === "/settings" ? "active" : ""}`}
        onClick={() => navigate("/settings")}
      >
        <LuCog size={28} />
      </div>
    </div>
  );
};
