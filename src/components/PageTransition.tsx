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
    const [prevPath, setPrevPath] = useState(location.pathname);

    useEffect(() => {
        // Only trigger transition if the path actually changed
        if (location.pathname !== prevPath) {
            setTransitionStage('fadeOut');

            const timeout = setTimeout(() => {
                setDisplayChildren(children);
                setTransitionStage('fadeIn');
                setPrevPath(location.pathname);
            }, 300);

            return () => clearTimeout(timeout);
        } else {
            // Update children without transition if only state/search params changed
            setDisplayChildren(children);
        }
    }, [location, children, prevPath]);

    return (
        <div className={`page-transition ${transitionStage}`}>
            {displayChildren}
        </div>
    );
};

export default PageTransition;