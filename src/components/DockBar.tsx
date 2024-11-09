
import React from 'react';

import HomeButton from './buttons/HomeButton';
import WorkoutButton from './buttons/WorkoutButton';
import GymButton from './buttons/GymButton';
import ProfileButton from './buttons/ProfileButton';
import SettingsButton from './buttons/SettingsButton';

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
            <ul>
                <HomeButton onClick={() => handleNavigate('todays-workout')} isCollapsed={true} />
                <WorkoutButton onClick={() => handleNavigate('workout-builder')} isCollapsed={true} />
                <GymButton onClick={() => handleNavigate('equipment')} isCollapsed={true} />
                <ProfileButton onClick={() => handleNavigate('workout-profile')} isCollapsed={true} />
                <SettingsButton onClick={() => handleNavigate('settings')} isCollapsed={true} />
            </ul>
        </div>
    );
};

export default DockBar;