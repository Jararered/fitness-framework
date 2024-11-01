import React, { useState, useEffect } from 'react';

interface Exercise {
    name: string;
    sets: number;
    reps: number;
}

interface TodaysWorkoutProps {
    gym: string | null; // Accept gym name as a prop
}

const TodaysWorkout: React.FC<TodaysWorkoutProps> = ({ gym }) => {
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

            {/* Display selected gym name */}
            <section>
                <h2>Selected Gym</h2>
                {gym ? (
                    <p>Gym: {gym}</p>
                ) : (
                    <p>No gym selected.</p>
                )}
            </section>

            {/* Display the current workout routine */}
            {currentRoutine.length === 0 ? (
                <p>No routine set for today. Please create or load a routine in the Workout Builder.</p>
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
