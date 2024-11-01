import React from 'react';
import { FaDumbbell, FaList, FaCog, FaClipboard } from 'react-icons/fa'; // Import icons from react-icons
import './Sidebar.css';

interface SidebarProps {
    onNavigate: (view: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isCollapsed, onToggle }) => {
    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button onClick={onToggle} className="toggle-button">
                {isCollapsed ? '☰' : '✕'}
            </button>
            <ul className="menu">
                <li className="menu-item" onClick={() => onNavigate('todays-workout')}>
                    {isCollapsed ? <FaDumbbell size={24} /> : <> <FaDumbbell size={24} /> Today's Workout </>}
                </li>
                <li className="menu-item" onClick={() => onNavigate('workout-builder')}>
                    {isCollapsed ? <FaClipboard size={24} /> : <> <FaClipboard size={24} /> Workout Builder </>}
                </li>
                <li className="menu-item" onClick={() => onNavigate('equipment')}>
                    {isCollapsed ? <FaList size={24} /> : <> <FaList size={24} /> Equipment </>}
                </li>
                <li className="menu-item" onClick={() => onNavigate('settings')}>
                    {isCollapsed ? <FaCog size={24} /> : <> <FaCog size={24} /> Settings </>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
