import React from 'react';

import { Exercise } from '../interfaces/Workout';

const CurrentWorkout: React.FC<{ currentWorkout: Exercise[] }> = ({ currentWorkout }) => {
    return (
        <div className='current-workout'>
            <h2>Current Workout</h2>
            <ul>
                {(() => {
                    if (currentWorkout.length === 0) {
                        return <p>No exercises added yet.</p>;
                    } else {
                        return currentWorkout.map((exercise, index) => {
                            return (
                                <div key={index}>
                                    <h4>{exercise.name}</h4>
                                    <li>
                                        {exercise.sets.map((set, setIndex) => {
                                            return (
                                                <span key={setIndex}>
                                                    {set.reps} reps{setIndex < exercise.sets.length - 1 ? ', ' : ''}
                                                </span>
                                            );
                                        })}
                                    </li>
                                </div>
                            );
                        });
                    }
                })()}
            </ul>
        </div>
    );
};

export default CurrentWorkout;
