import React, { useState, useEffect } from 'react';

// Navigation Menu
import SideBar from './components/navigation/SideBar';
import DockBar from './components/navigation/DockBar';

// Pages
import WorkoutOverview from './components/Home';
import WorkoutCreator from './components/Workout';
import Equipment from './components/GymEquipment';
import WorkoutProfile from './components/Profile';
import Settings from './components/Settings';

// Workout In Progress
import WorkoutInProgress from './components/WorkoutInProgress';

// Styles
import './App.css';
import './components/buttons/ButtonColors.css';

const App: React.FC = () => {
    const [isSideBarCollapsed, setSideBarCollapsed] = useState(true);
    const [content, setContent] = useState('home');
    const [gym, setGym] = useState<string | null>(null);

    useEffect(() => {
        const lastLoadedGymKey = localStorage.getItem('lastLoadedGym');
        if (lastLoadedGymKey) {
            const gymName = lastLoadedGymKey.replace('equipment_', '');
            setGym(gymName);
        }
    }, []);

    const toggleSideBar = () => {
        setSideBarCollapsed((prev) => !prev);
    };

    const handleWorkoutComplete = () => {
        setContent('home');
    };

    const renderContent = () => {
        switch (content) {

            case 'home':
                return <WorkoutOverview gym={gym} onOpenWorkout={() => setContent('workout-in-progress')} />;
            case 'workout':
                return <WorkoutCreator />;
            case 'gym-equipment':
                return <Equipment />;
            case 'profile':
                return <WorkoutProfile />;
            case 'settings':
                return <Settings />;

            case 'workout-in-progress':
                return <WorkoutInProgress onCompleteWorkout={handleWorkoutComplete} />;

            default:
                return <WorkoutOverview gym={gym} onOpenWorkout={() => setContent('workout-in-progress')} />;
        }
    };

    return (
        <div className="App">

            <SideBar
                onNavigate={setContent}
                isCollapsed={isSideBarCollapsed}
                onToggle={toggleSideBar}
            />

            <DockBar
                onNavigate={setContent}
            />

            {renderContent()}
        </div>
    );
};

export default App;
