import React, { useState } from 'react';
import { FaDumbbell, FaCog, FaMapPin, FaHome, FaUser } from 'react-icons/fa';

import './NavigationMenu.css';

interface SidebarProps {
    onNavigate: (view: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isCollapsed, onToggle }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleNavigate = (view: string) => {
        onNavigate(view);
        if (!isCollapsed) {
            onToggle();
        }
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    const handleToggle = () => {
        setIsTransitioning(true);
        onToggle();
    };

    return (
        <div 
            className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} 
            onTransitionEnd={handleTransitionEnd}
        >
            <button className="expand-button" onClick={handleToggle}>
                {isCollapsed ? '☰' : '✕'}
            </button>

            <ul className="navigation-menu">
                <li className="navigation-menu-item" onClick={() => handleNavigate('todays-workout')}>
                    {isCollapsed || isTransitioning ? <FaHome size={24} /> : <> <FaHome size={24} /> Today's Workout </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('workout-builder')}>
                    {isCollapsed || isTransitioning ? <FaDumbbell size={24} /> : <> <FaDumbbell size={24} /> Workout Builder </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('equipment')}>
                    {isCollapsed || isTransitioning ? <FaMapPin size={24} /> : <> <FaMapPin size={24} /> Equipment </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('workout-profile')}>
                    {isCollapsed || isTransitioning ? <FaUser size={24} /> : <> <FaUser size={24} /> Workout Profile </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('settings')}>
                    {isCollapsed || isTransitioning ? <FaCog size={24} /> : <> <FaCog size={24} /> Settings </>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
