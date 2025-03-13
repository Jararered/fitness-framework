import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/components/PageTransition.css';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState('fadeIn');

    useEffect(() => {
        // When children change (due to route change), start fade out
        if (location.key) {  // Ensure we have a valid location
            setTransitionStage('fadeOut');

            // Wait for fade out animation to complete before updating children
            const timeout = setTimeout(() => {
                setDisplayChildren(children);
                setTransitionStage('fadeIn');
            }, 300); // Duration should match CSS transition time

            return () => clearTimeout(timeout);
        } else {
            // Initial load - just set the children and fade in
            setDisplayChildren(children);
            setTransitionStage('fadeIn');
        }
    }, [location, children]);

    return (
        <div className={`page-transition ${transitionStage}`}>
            {displayChildren}
        </div>
    );
};

export default PageTransition;