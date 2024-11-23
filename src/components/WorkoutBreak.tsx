import React, { useState, useEffect } from 'react';

const WorkoutBreak: React.FC<{ onBreakEnd: () => void, onSkip: () => void }> = ({ onBreakEnd, onSkip }) => {
    const [duration, setDuration] = useState<number>(60);
    const [timeLeft, setTimeLeft] = useState<number>(60);

    useEffect(() => {
        const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');
        const normalRest = preferences.normalRest || 60;
        setDuration(normalRest);
        setTimeLeft(normalRest);

        let breakStartTime = Number(localStorage.getItem('breakStartTime'));
        if (!breakStartTime) {
            breakStartTime = Date.now();
            localStorage.setItem('breakStartTime', breakStartTime.toString());
        }

        let rafId: number;
        const updateTimeLeft = () => {
            const now = Date.now();
            const elapsed = (now - breakStartTime) / 1000;
            const remaining = normalRest - elapsed;
            if (remaining > 0) {
                setTimeLeft(remaining);
                rafId = requestAnimationFrame(updateTimeLeft);
            } else {
                localStorage.removeItem('breakStartTime');
                onBreakEnd();
            }
        };
        updateTimeLeft();
        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [onBreakEnd]);

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
    const adjustedProgress = Math.max(0, Math.min(progress, circumference));

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
                                strokeDashoffset={circumference - adjustedProgress}
                            />
                            <text
                                x={cradius}
                                y={cradius + 10}
                                textAnchor="middle"
                                fontSize={radius / 2}
                            >
                                {Math.ceil(timeLeft)}
                            </text>
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
