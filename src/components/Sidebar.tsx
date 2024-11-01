import React from 'react';
import { FaDumbbell, FaCog, FaMapPin, FaHome } from 'react-icons/fa'; // Import icons from react-icons
import './Sidebar.css';

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
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button onClick={onToggle} className="toggle-button">
                {isCollapsed ? '☰' : '✕'}
            </button>
            <ul className="menu">
                <li className="menu-item" onClick={() => handleNavigate('todays-workout')}>
                    {isCollapsed ? <FaHome size={24} /> : <> <FaHome size={24} /> Today's Workout </>}
                </li>
                <li className="menu-item" onClick={() => handleNavigate('workout-builder')}>
                    {isCollapsed ? <FaDumbbell size={24} /> : <> <FaDumbbell size={24} /> Workout Builder </>}
                </li>
                <li className="menu-item" onClick={() => handleNavigate('equipment')}>
                    {isCollapsed ? <FaMapPin size={24} /> : <> <FaMapPin size={24} /> Equipment </>}
                </li>
                <li className="menu-item" onClick={() => handleNavigate('settings')}>
                    {isCollapsed ? <FaCog size={24} /> : <> <FaCog size={24} /> Settings </>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
