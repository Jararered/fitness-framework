import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface TimerCircularProps {
    duration: number; // Duration in seconds
    size?: number; // Size of the circle in pixels
    strokeWidth?: number; // Width of the circle border
    color?: string; // Color of the circle
}

export const TimerCircular: React.FC<TimerCircularProps> = ({ duration, size = 100, strokeWidth = 4, color = "#007bff" }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    // Reset timer when duration changes
    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = ((duration - timeLeft) / duration) * circumference;

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <div className="timer-circular" style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
                {/* Background circle */}
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e9ecef" strokeWidth={strokeWidth} />

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
                    style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
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
