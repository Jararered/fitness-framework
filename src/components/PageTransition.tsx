import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../styles/components/PageTransition.css";

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [transitionState, setTransitionState] = useState("visible");
    const [prevPath, setPrevPath] = useState(location.pathname);

    useEffect(() => {
        // Only trigger transition if the path actually changed
        if (location.pathname !== prevPath) {
            // Step 1: Start fade out
            setTransitionState("fadeOut");

            // Step 2: After fade out completes, update children and prepare for fade in
            const switchContentTimeout = setTimeout(() => {
                // Update the displayed content while component is invisible
                setDisplayChildren(children);
                // Prepare for fade in
                setTransitionState("fadeIn");
                setPrevPath(location.pathname);
            }, 300); // This should match your CSS fadeOut duration

            return () => clearTimeout(switchContentTimeout);
        } else {
            // Update children without transition if only state/search params changed
            setDisplayChildren(children);
        }
    }, [location, children, prevPath]);

    return <div className={`page-transition ${transitionState}`}>{displayChildren}</div>;
};

export default PageTransition;
