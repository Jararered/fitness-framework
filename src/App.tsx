import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoutineBuilder from './components/RoutineBuilder';
import WorkoutLog from './components/WorkoutLog';
import './App.css';

const App: React.FC = () => {
    const [view, setView] = useState('dashboard');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const renderContent = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard />;
            case 'routine':
                return <RoutineBuilder />;
            case 'log':
                return <WorkoutLog />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="App">
            <Sidebar onNavigate={setView} isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
            <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                {renderContent()}
            </div>
        </div>
    );
};

export default App;
