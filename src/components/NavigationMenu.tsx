import React from 'react';

import HomeButton from './buttons/HomeButton';
import WorkoutButton from './buttons/WorkoutButton';
import GymButton from './buttons/GymButton';
import ProfileButton from './buttons/ProfileButton';
import SettingsButton from './buttons/SettingsButton';

import './NavigationMenu.css';

interface NavigationBarProps {
    onNavigate: (view: string) => void;
    isCollapsed: boolean;
    onToggle: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onNavigate, isCollapsed, onToggle }) => {
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
                <HomeButton
                    onClick={() => handleNavigate('todays-workout')}
                    isCollapsed={isCollapsed}
                />
                <WorkoutButton
                    onClick={() => handleNavigate('workout-builder')}
                    isCollapsed={isCollapsed}
                />
                <GymButton
                    onClick={() => handleNavigate('equipment')}
                    isCollapsed={isCollapsed}
                />
                <ProfileButton
                    onClick={() => handleNavigate('workout-profile')}
                    isCollapsed={isCollapsed}
                />
                <SettingsButton
                    onClick={() => handleNavigate('settings')}
                    isCollapsed={isCollapsed}
                />
            </ul>
        </div>
    );
};

export default NavigationBar;
