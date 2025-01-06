import React from 'react';

import HomeButton from '../buttons/HomeButton';
import WorkoutButton from '../buttons/WorkoutCreatorButton';
import GymButton from '../buttons/GymButton';
import ProfileButton from '../buttons/ProfileButton';
import SettingsButton from '../buttons/SettingsButton';

import './DockBar.css';

interface DockBarProps {
    onNavigate: (view: string) => void;
}

const DockBar: React.FC<DockBarProps> = ({ onNavigate }) => {
    const handleNavigate = (view: string) => {
        onNavigate(view);
    };

    return (
        <div className="dockbar">
            <HomeButton onClick={() => handleNavigate('home')} isCollapsed={true} />
            <WorkoutButton onClick={() => handleNavigate('workout-creator')} isCollapsed={true} />
            <GymButton onClick={() => handleNavigate('equipment')} isCollapsed={true} />
            <ProfileButton onClick={() => handleNavigate('profile')} isCollapsed={true} />
            <SettingsButton onClick={() => handleNavigate('settings')} isCollapsed={true} />
        </div>
    );
};

export default DockBar;