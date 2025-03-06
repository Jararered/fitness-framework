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
    if (children !== displayChildren) {
      setTransitionStage('fadeOut');
      
      // After the animation completes, update the children and fade in
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
      }, 300); // This should match the CSS animation duration
      
      return () => clearTimeout(timeout);
    }
  }, [children, displayChildren]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {displayChildren}
    </div>
  );
};

export default PageTransition;