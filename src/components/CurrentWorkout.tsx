import React from 'react';

import { Exercise } from './Exercise';

const CurrentWorkout: React.FC<{ currentWorkout: Exercise[] }> = ({ currentWorkout }) => {
    return (
        <div>
            <h2>Current Workout</h2>
            <ul className="workout-list">
                {currentWorkout.length === 0 ? (
                    <p>No exercises added yet.</p>
                ) : (
                    currentWorkout.map((exercise, index) => (
                        <li key={index} className="workout-item">
                            <strong>{exercise.name}</strong>: {exercise.sets.map((set, setIndex) => (
                                <span key={setIndex}>{set.reps} reps{setIndex < exercise.sets.length - 1 ? ', ' : ''}</span>
                            ))}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CurrentWorkout;
