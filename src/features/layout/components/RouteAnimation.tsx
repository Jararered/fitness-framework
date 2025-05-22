import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./RouteAnimation.css";

interface RouteAnimationProps {
  children: React.ReactNode;
}

const RouteAnimation: React.FC<RouteAnimationProps> = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [state, setAnimation] = useState("visible");
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setAnimation("exiting");

      const switchContentTimeout = setTimeout(() => {
        setDisplayChildren(children);
        setAnimation("entering");
        setPrevPath(location.pathname);
      }, 200);

      return () => clearTimeout(switchContentTimeout);
    } else {
      setDisplayChildren(children);
    }
  }, [location, children, prevPath]);

  return <div className={`route-animation ${state}`}>{displayChildren}</div>;
};

export default RouteAnimation;
