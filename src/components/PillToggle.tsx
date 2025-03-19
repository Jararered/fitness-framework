import React from "react";

import "../styles/components/PillToggle.css";

interface PillToggleProps {
    isActive: boolean;
    onChange: () => void;
}

const PillToggle: React.FC<PillToggleProps> = ({ isActive, onChange }) => {
    return (
        <button className={`pill-toggle ${isActive ? "active" : ""}`} onClick={onChange}>
            <span className="pill-circle"></span>
        </button>
    );
};

export { PillToggle };
