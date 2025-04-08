import React from "react";

import "./PillToggle.css";

interface PillToggleProps {
    value: boolean;
    onChange: () => void;
}

const PillToggle: React.FC<PillToggleProps> = ({ value, onChange }) => {
    return (
        <button className={`pill-toggle ${value ? "active" : ""}`} onClick={onChange}>
            <span className="pill-circle"></span>
        </button>
    );
};

export { PillToggle };
