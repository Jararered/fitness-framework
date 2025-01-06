import React, { useState } from 'react';

// Navigation
import SideBar from './components/navigation/SideBar';
import DockBar from './components/navigation/DockBar';

// Components
import Profile from './components/Profile';
import WorkoutInProgress from './components/WorkoutActive';

// Pages (new)
import PageHome from './pages/PageHome';
import PageGym from './pages/PageGym';
import PagePreferences from './pages/PagePreferences';

// Styles
import './App.css';
import './styles/colors.css';
import './styles/card.css';

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
                return <PageHome />;

            case 'equipment':
                return <PageGym />;

            case 'profile':
                return <Profile />;

            case 'settings':
                return <PagePreferences />;

            case 'workout-in-progress':
                return <WorkoutInProgress onCompleteWorkout={handleWorkoutComplete} />;

            default:
                return <PageHome />;
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
