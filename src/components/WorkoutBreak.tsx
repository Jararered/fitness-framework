import React, { useState, useEffect } from 'react';

const WorkoutBreak: React.FC<{ duration: number, onBreakEnd: () => void, onSkip: () => void }> = ({ duration, onBreakEnd, onSkip }) => {
    const [timeLeft, setTimeLeft] = useState<number>(duration);

    useEffect(() => {
        let breakStartTime = Number(localStorage.getItem('breakStartTime'));
        if (!breakStartTime) {
            breakStartTime = Date.now();
            localStorage.setItem('breakStartTime', breakStartTime.toString());
        }
        const updateTimeLeft = () => {
            const elapsed = Math.floor((Date.now() - breakStartTime) / 1000);
            const remaining = duration - elapsed;
            if (remaining > 0) {
                setTimeLeft(remaining);
            } else {
                localStorage.removeItem('breakStartTime');
                onBreakEnd();
            }
        };
        updateTimeLeft();
        const timer = setInterval(updateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [duration, onBreakEnd]);

    const handleSkip = () => {
        localStorage.removeItem('breakStartTime');
        onSkip();
    };

    const radius = 80;
    const cradius = radius + 10;
    const length = radius * 2 + 20;
    const thickness = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / duration) * circumference;

    return (
        <div className="break-timer">
            <div className='vertical'>
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
                            <text x={cradius} y={cradius + 10} textAnchor="middle" fontSize={radius / 2}>{timeLeft}</text>
                        </svg>
                    </div>
                    <button className="bad-button" onClick={handleSkip}>
                        Skip Break
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutBreak;
