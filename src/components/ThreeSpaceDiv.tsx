import React, { ReactNode } from 'react';

import "../styles/components/ThreeSpaceDiv.css";

interface ThreeSpaceDivProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    className?: string;
}

/**
 * ThreeSpaceDiv - A component that arranges content in three sections:
 * left-aligned, center-aligned, and right-aligned
 */
const ThreeSpaceDiv: React.FC<ThreeSpaceDivProps> = ({ left, center, right, className = '' }) => {
    return (
        <div className={`three-space-container ${className}`}>
            <div className="left-section">
                {left}
            </div>
            <div className="center-section">
                {center}
            </div>
            <div className="right-section">
                {right}
            </div>
        </div>
    );
};

export default ThreeSpaceDiv;
