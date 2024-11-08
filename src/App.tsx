import React, { useState, useEffect } from 'react';

// Navigation Menu
import NavigationMenu from './components/NavigationMenu';

// Pages / Views / pages
import WorkoutOverview from './components/Home';
import WorkoutBuilder from './components/Workout';
import Equipment from './components/GymEquipment';
import WorkoutProfile from './components/Profile';
import Settings from './components/Settings';

// Workout In Progress
import WorkoutInProgress from './components/WorkoutInProgress';

// Styles
import './App.css';
import './components/buttons/ButtonColors.css';

const App: React.FC = () => {
    const [isNavigationBarCollapsed, setNavigationBarCollapsed] = useState(true);
    const [currentView, setCurrentView] = useState('workout-overview');
    const [gym, setGym] = useState<string | null>(null);

    useEffect(() => {
        const lastLoadedGymKey = localStorage.getItem('lastLoadedGym');
        if (lastLoadedGymKey) {
            const gymName = lastLoadedGymKey.replace('equipment_', '');
            setGym(gymName);
        }
    }, []);

    const toggleNavigationBar = () => {
        setNavigationBarCollapsed((prev) => !prev);
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
            case 'workout-profile':
                return <WorkoutProfile />;
            default:
                return <WorkoutOverview gym={gym} onOpenWorkout={() => setCurrentView('workout-in-progress')} />;
        }
    };

    return (
        <div className="App">
            <NavigationMenu
                onNavigate={setCurrentView}
                isCollapsed={isNavigationBarCollapsed}
                onToggle={toggleNavigationBar}
            />
            {renderContent()}
        </div>
    );
};

export default App;
