import React, { useState, useEffect } from 'react';
import './CommonStyles.css';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

const TodaysWorkout: React.FC = () => {
    const [currentRoutine, setCurrentRoutine] = useState<Exercise[]>([]);

    useEffect(() => {
        const savedRoutine = localStorage.getItem('currentRoutine');
        if (savedRoutine) {
            setCurrentRoutine(JSON.parse(savedRoutine));
        }
    }, []);

    return (
        <div className="page-container">
            <h1>Today's Workout</h1>
            {currentRoutine.length === 0 ? (
                <p>No routine set for today. Please create or load a routine in the Routine Builder.</p>
            ) : (
                <ul>
                    {currentRoutine.map((exercise, index) => (
                        <li key={index}>
                            <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodaysWorkout;
