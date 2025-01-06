import React from 'react';

import HomeButton from '../buttons/HomeButton';
import WorkoutButton from '../buttons/WorkoutCreatorButton';
import GymButton from '../buttons/GymButton';
import ProfileButton from '../buttons/ProfileButton';
import SettingsButton from '../buttons/SettingsButton';

import './SideBar.css';

interface SideBarProps {
    onNavigate: (view: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onNavigate, isCollapsed, onToggle }) => {
    const handleNavigate = (view: string) => {
        onNavigate(view);
        if (!isCollapsed) {
            onToggle();
        }
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="expand-button" onClick={onToggle}>
                {isCollapsed ? '☰' : '✕'}
            </button>

            <HomeButton onClick={() => handleNavigate('home')} isCollapsed={isCollapsed} />
            <WorkoutButton onClick={() => handleNavigate('workout-creator')} isCollapsed={isCollapsed} />
            <GymButton onClick={() => handleNavigate('equipment')} isCollapsed={isCollapsed} />
            <ProfileButton onClick={() => handleNavigate('profile')} isCollapsed={isCollapsed} />
            <SettingsButton onClick={() => handleNavigate('settings')} isCollapsed={isCollapsed} />
        </div>
    );
};

export default SideBar;
