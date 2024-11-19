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

    const radius = 80;
    const cradius = radius + 10;
    const length = radius * 2 + 20;
    const thickness = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / duration) * circumference;

    return (
        <div className="break-timer">
            <div className='vertical-section'>
                <div className='card'>
                    <h2>Break Time</h2>
                    <div>
                        <svg width={length} height={length} className="countdown-circle">
                            <circle
                                stroke="#eeeeee"
                                fill="transparent"
                                strokeWidth={thickness}
                                r={radius}
                                cx={cradius}
                                cy={cradius}
                            />
                            <circle
                                stroke="#007aff"
                                fill="transparent"
                                strokeWidth={thickness}
                                r={radius}
                                cx={cradius}
                                cy={cradius}
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - progress}
                            />
                            <text x={cradius} y={cradius + 10} textAnchor="middle" fontSize={radius / 2} fill="black">{timeLeft}</text>
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
