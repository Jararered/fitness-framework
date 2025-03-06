import React, { ReactNode } from 'react';

import "../styles/components/ThreeSpaceDiv.css";

interface ThreeSpaceDivProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
}

const ThreeSpaceDiv: React.FC<ThreeSpaceDivProps> = ({ left, center, right }) => {
    return (
        <div className={"three-space-container"}>
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
