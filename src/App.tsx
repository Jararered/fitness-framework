import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Navigation Menu
import SideBar from './components/navigation/SideBar';
import DockBar from './components/navigation/DockBar';

// Pages
import Home from './components/Home';
import Workout from './components/WorkoutCreator';
import GymEquipment from './components/GymEquipment';
import Profile from './components/Profile';
import Preferences from './components/Preferences';

// Workout In Progress
import WorkoutInProgress from './components/WorkoutInProgress';

// Styles
import './App.css';
import './styles/BaseStyles.css'
import './styles/Transitions.css';

import './components/buttons/ButtonColors.css';
import './components/shared/Card.css';
import './components/shared/HorizontalSection.css';
import './components/shared/VerticalSection.css';

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

            <DockBar
                onNavigate={handleNavigate}
            />

            <TransitionGroup className="main-content">
                <CSSTransition
                    key={content}
                    timeout={250}
                    classNames="slide"
                >
                    {renderMainContent()}
                </CSSTransition>
            </TransitionGroup>

        </div>
    );
};

export default App;
