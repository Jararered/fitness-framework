import React, { ReactNode } from 'react';

import "../styles/components/DividerSpaced.css";

interface SpacedDividerProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
}

const DividerSpaced: React.FC<SpacedDividerProps> = ({ left, center, right }) => {
    return (
        <div className="divider-spaced-container">
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

export default DividerSpaced;
