import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface TimerCircularProps {
    duration: number; // Duration in seconds
    size?: number; // Size of the circle in pixels
    color?: string; // Color of the circle
    storageKey?: string; // Storage key (default: "timer-start-time")
    reset?: boolean; // If true, will clear the timer
    onComplete?: () => void; // Callback that fires when timer reaches zero
}

export const TimerCircular: React.FC<TimerCircularProps> = ({
    duration,
    size = 100,
    color = "#007bff",
    storageKey = "timer-start-time",
    reset = false,
    onComplete,
}) => {
    // Get initial time left from localStorage if available
    const [timeLeft, setTimeLeft] = useState(() => {
        const storedTime = localStorage.getItem(storageKey);
        if (storedTime) {
            const elapsed = (Date.now() - new Date(storedTime).getTime()) / 1000;
            return Math.max(0, duration - Math.floor(elapsed));
        }
        return duration;
    });

    // Track if we've already fired the completion callback
    const [callbackFired, setCallbackFired] = useState(false);

    // Handle reset prop
    useEffect(() => {
        if (reset) {
            localStorage.removeItem(storageKey);
            setCallbackFired(false); // Reset the callback flag
        }
    }, [reset, storageKey]);

    // Set start time if not already set
    useEffect(() => {
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, new Date().toISOString());
        }
    }, [storageKey]);

    // Handle completion callback
    useEffect(() => {
        // Only fire callback if:
        // 1. Timer just reached zero
        // 2. We have a callback function
        // 3. We haven't already fired the callback
        if (timeLeft === 0 && onComplete && !callbackFired) {
            // Use setTimeout to ensure this doesn't happen during render
            setTimeout(() => {
                onComplete();
                setCallbackFired(true);
            }, 0);
        }
    }, [timeLeft, onComplete, callbackFired]);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            const startTime = new Date(localStorage.getItem(storageKey) || Date.now()).getTime();
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, duration - Math.floor(elapsed));

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
                localStorage.removeItem(storageKey);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [duration, storageKey, timeLeft]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (reset || timeLeft <= 0) {
                localStorage.removeItem(storageKey);
            }
        };
    }, [reset, timeLeft, storageKey]);

    // Calculate stroke offset for circle animation
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference * (1 - timeLeft / duration);

    return (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#e9ecef"
                    strokeWidth={strokeWidth}
                />

                {/* Timer circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: "stroke-dashoffset 0.3s linear" }}
                />
            </svg>

            {/* Timer display */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: `${size / 4}px`,
                    fontWeight: "bold",
                    color: color,
                }}
            >
                {timeLeft > 0 ? timeLeft : <FaCheck />}
            </div>
        </div>
    );
};
