import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WorkoutOverview from './components/WorkoutOverview';
import WorkoutBuilder from './components/WorkoutBuilder';
import Equipment from './components/Equipment';
import Settings from './components/Settings';
import WorkoutInProgress from './components/WorkoutInProgress';

import './App.css';

const App: React.FC = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [currentView, setCurrentView] = useState('workout-overview'); // Default to 'workout-overview'
    const [gym, setGym] = useState<string | null>(null);

    useEffect(() => {
        const lastLoadedGymKey = localStorage.getItem('lastLoadedGym');
        if (lastLoadedGymKey) {
            const gymName = lastLoadedGymKey.replace('equipment_', '');
            setGym(gymName);
        }
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const handleWorkoutComplete = () => {
        setCurrentView('workout-overview');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'workout-overview':
                return <WorkoutOverview gym={gym} onOpenWorkout={() => setCurrentView('workout-in-progress')} />;
            case 'workout-builder':
                return <WorkoutBuilder />;
            case 'equipment':
                return <Equipment />;
            case 'settings':
                return <Settings />;
            case 'workout-in-progress':
                return <WorkoutInProgress onCompleteWorkout={handleWorkoutComplete} />;

            default:
                return <WorkoutOverview gym={gym} onOpenWorkout={() => setCurrentView('workout-in-progress')} />;
        }
    };

    return (
        <div className="App">
            <Sidebar
                onNavigate={setCurrentView}
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
            />
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;
