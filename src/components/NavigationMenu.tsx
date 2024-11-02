import React from 'react';
import { FaDumbbell, FaCog, FaMapPin, FaHome, FaUser } from 'react-icons/fa';

import './NavigationMenu.css';

interface SidebarProps {
    onNavigate: (view: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isCollapsed, onToggle }) => {
    const handleNavigate = (view: string) => {
        onNavigate(view);
        if (!isCollapsed) {
            onToggle();
        }
    };

    return (
        <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="expand-button" onClick={onToggle}>
                {isCollapsed ? '☰' : '✕'}
            </button>

            <ul className="navigation-menu">
                <li className="navigation-menu-item" onClick={() => handleNavigate('todays-workout')}>
                    {isCollapsed ? <FaHome size={24} /> : <> <FaHome size={24} /> Today's Workout </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('workout-builder')}>
                    {isCollapsed ? <FaDumbbell size={24} /> : <> <FaDumbbell size={24} /> Workout Builder </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('equipment')}>
                    {isCollapsed ? <FaMapPin size={24} /> : <> <FaMapPin size={24} /> Equipment </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('workout-profile')}>
                    {isCollapsed ? <FaUser size={24} /> : <> <FaUser size={24} /> Workout Profile </>}
                </li>
                <li className="navigation-menu-item" onClick={() => handleNavigate('settings')}>
                    {isCollapsed ? <FaCog size={24} /> : <> <FaCog size={24} /> Settings </>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
