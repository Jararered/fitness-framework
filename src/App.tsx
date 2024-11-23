import React, { useState } from 'react';

// Navigation
import SideBar from './components/navigation/SideBar';
import DockBar from './components/navigation/DockBar';

// Components
import Home from './components/Home';
import Workout from './components/WorkoutCreator';
import GymEquipment from './components/GymEquipment';
import Profile from './components/Profile';
import Preferences from './components/Preferences';
import WorkoutInProgress from './components/WorkoutActive';

// Styles
import './App.css';
import './styles/ButtonColors.css';
import './styles/Card.css';
import './styles/Input.css';

const App: React.FC = () => {
    const [isSideBarCollapsed, setSideBarCollapsed] = useState(true);
    const [content, setContent] = useState('home');
    const [, setPrevContent] = useState('');

    const toggleSideBar = () => {
        setSideBarCollapsed((prev) => !prev);
    };

    const handleWorkoutComplete = () => {
        setContent('home');
    };

    const handleNavigate = (newContent: string) => {
        setPrevContent(content);
        setContent(newContent);
    };

    const renderMainContent = () => {
        switch (content) {

            case 'home':
                return <Home onOpenWorkout={() => setContent('workout-in-progress')} />;
            case 'workout-creator':
                return <Workout />;
            case 'gym-equipment':
                return <GymEquipment />;
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Preferences />;

            case 'workout-in-progress':
                return <WorkoutInProgress onCompleteWorkout={handleWorkoutComplete} />;

            default:
                return <Home onOpenWorkout={() => setContent('workout-in-progress')} />;
        }
    };

    return (
        <div className="App">

            <SideBar
                onNavigate={handleNavigate}
                isCollapsed={isSideBarCollapsed}
                onToggle={toggleSideBar}
            />

            {
                <div className="main-content">
                    {renderMainContent()}
                </div>
            }

            <DockBar
                onNavigate={handleNavigate}
            />
        </div>
    );
};

export default App;
