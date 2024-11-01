import React from 'react';
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
            {!isCollapsed && (
                <>
                    <h2 className="app-title">MuscleMe</h2>
                    <ul className="menu">
                        <li className="menu-item" onClick={() => onNavigate('dashboard')}>Dashboard</li>
                        <li className="menu-item" onClick={() => onNavigate('routine')}>Routine Builder</li>
                        <li className="menu-item" onClick={() => onNavigate('log')}>Workout Log</li>
                    </ul>
                </>
            )}
        </div>
    );
};

export default Sidebar;
