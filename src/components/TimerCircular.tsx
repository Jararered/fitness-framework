import React, { useEffect, useState, useMemo } from "react";
import { FaCheck } from "react-icons/fa";

interface TimerCircularProps {
    duration: number; // Duration in seconds
    size?: number; // Size of the circle in pixels
    strokeWidth?: number; // Width of the circle border
    color?: string; // Color of the circle
    onTimeUpdate?: (timeLeft: number) => void; // Callback to update parent component
}

export const TimerCircular: React.FC<TimerCircularProps> = ({
    duration,
    size = 100,
    strokeWidth = 4,
    color = "#007bff",
    onTimeUpdate,
}) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    // Store the initial duration as a ref to avoid dependency issues
    const initialDuration = useMemo(() => duration, []);

    // Reset timer when duration prop changes
    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Use useMemo to recalculate strokeDashoffset whenever timeLeft changes
    const strokeDashoffset = useMemo(() => {
        // Always use the initial duration for calculation
        const fillPercentage = timeLeft / initialDuration;
        return circumference * (1 - fillPercentage);
    }, [timeLeft, circumference, initialDuration]);

    // Notify parent on initial render
    useEffect(() => {
        if (onTimeUpdate) {
            onTimeUpdate(timeLeft);
        }
    }, []);

    // Timer effect
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime <= 1 ? 0 : prevTime - 1;
                if (prevTime <= 1) {
                    clearInterval(timer);
                }
                // Notify parent component about time update
                if (onTimeUpdate) {
                    onTimeUpdate(newTime);
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUpdate]);

    return (
        <div
            className="timer-circular"
            style={{ position: "relative", width: size, height: size }}
        >
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

            {/* Timer text or check icon */}
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
