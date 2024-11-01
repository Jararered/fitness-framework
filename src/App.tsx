import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TodaysWorkout from './components/TodaysWorkout';
import WorkoutBuilder from './components/WorkoutBuilder';
import Equipment from './components/Equipment';
import Settings from './components/Settings'; // Import the new Settings component

import './App.css';

const App: React.FC = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [currentView, setCurrentView] = useState('workout-builder'); // Default view

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'todays-workout':
                return <TodaysWorkout />;
            case 'workout-builder':
                return <WorkoutBuilder />;
            case 'equipment':
                return <Equipment />;
            case 'settings': // Add case for Settings
                return <Settings />;
            default:
                return <TodaysWorkout />;
        }
    };

    return (
        <div className="App">
            <Sidebar
                onNavigate={setCurrentView}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
            />
            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                {renderContent()}
            </div>
        </div>
    );
};

export default App;
