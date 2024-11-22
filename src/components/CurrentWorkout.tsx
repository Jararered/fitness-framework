import React from 'react';

import { Exercise } from './Exercise';

const CurrentWorkout: React.FC<{ currentWorkout: Exercise[] }> = ({ currentWorkout }) => {
    return (
        <div>
            <h2>Current Workout</h2>
            <ul>
                {currentWorkout.length === 0 ?
                    (<p>No exercises added yet.</p>
                    ) : (
                        currentWorkout.map((exercise, index) => (
                            <div>
                                <h4>{exercise.name}</h4>
                                <li key={index}>
                                    {exercise.sets.map((set, setIndex) => (
                                        <span key={setIndex}>{set.reps} reps{setIndex < exercise.sets.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </li>
                            </div>
                        ))
                    )}
            </ul>
        </div>
    );
};

export default CurrentWorkout;
