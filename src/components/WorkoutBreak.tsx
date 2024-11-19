import React, { useState, useEffect } from 'react';

const WorkoutBreak: React.FC<{ duration: number, onBreakEnd: () => void, onSkip: () => void }> = ({ duration, onBreakEnd, onSkip }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onBreakEnd();
        }
    }, [timeLeft, onBreakEnd]);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / duration) * circumference;

    return (
        <div className="break-timer">
            <div className='vertical-section'>
                <div className='card'>
                    <h2>Break Time</h2>
                    <div>
                        <svg width="120" height="120" className="countdown-circle">
                            <circle
                                stroke="#eeeeee"
                                fill="transparent"
                                strokeWidth="5"
                                r={radius}
                                cx="60"
                                cy="60"
                            />
                            <circle
                                stroke="#007aff"
                                fill="transparent"
                                strokeWidth="5"
                                r={radius}
                                cx="60"
                                cy="60"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - progress}
                            />
                            <text x="60" y="65" textAnchor="middle" fontSize="20" fill="black">{timeLeft}</text>
                        </svg>
                    </div>
                    <button className="bad-button" onClick={onSkip}>
                        Skip Break
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutBreak;
