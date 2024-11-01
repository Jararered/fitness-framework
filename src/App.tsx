import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TodaysWorkout from './components/TodaysWorkout';
import WorkoutBuilder from './components/WorkoutBuilder';
import Equipment from './components/Equipment';
import Settings from './components/Settings';

import './App.css';

const App: React.FC = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true); // Set to true for collapsed by default
    const [currentView, setCurrentView] = useState('workout-builder');
    const [gym, setGym] = useState<string | null>(null); // State to hold the gym name

    useEffect(() => {
        const lastLoadedGymKey = localStorage.getItem('lastLoadedEquipmentList');
        if (lastLoadedGymKey) {
            const gymName = lastLoadedGymKey.replace('equipment_', ''); // Remove prefix for display
            setGym(gymName);
        }
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'todays-workout':
                return <TodaysWorkout gym={gym} />;
            case 'workout-builder':
                return <WorkoutBuilder />;
            case 'equipment':
                return <Equipment gym={gym} />; // Pass gym to Equipment
            case 'settings':
                return <Settings />;
            default:
                return <TodaysWorkout gym={gym} />;
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
