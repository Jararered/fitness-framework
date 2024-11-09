import React, { useState, useEffect } from 'react';

// Navigation Menu
import SideBar from './components/navigation/SideBar';
import DockBar from './components/navigation/DockBar';

// Pages
import Home from './components/Home';
import Workout from './components/Workout';
import GymEquipment from './components/GymEquipment';
import Profile from './components/Profile';
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
        const gymName = localStorage.getItem('lastLoadedGym');
        if (gymName) {
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
                return <Home gym={gym} onOpenWorkout={() => setContent('workout-in-progress')} />;
            case 'workout':
                return <Workout />;
            case 'gym-equipment':
                return <GymEquipment />;
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Settings />;

            case 'workout-in-progress':
                return <WorkoutInProgress onCompleteWorkout={handleWorkoutComplete} />;

            default:
                return <Home gym={gym} onOpenWorkout={() => setContent('workout-in-progress')} />;
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
