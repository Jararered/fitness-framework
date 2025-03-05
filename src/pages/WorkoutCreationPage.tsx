import React, { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const WorkoutCreationPage: React.FC = () => {
    const { exercises, workoutPlans, setWorkoutPlans, setWorkoutState } = useWorkout();
    const [plan, setPlan] = useState<{ exercise: string; reps: number[] }[]>([
        { exercise: "", reps: [0, 0, 0] },
    ]);
    const navigate = useNavigate();

    const updateReps = (index: number, repIndex: number, value: number) => {
        const newPlan = [...plan];
        newPlan[index].reps[repIndex] = Math.max(1, value);
        setPlan(newPlan);
    };

    const addExercise = () => {
        setPlan([...plan, { exercise: "", reps: [0, 0, 0] }]);
    };

    const saveWorkout = () => {
        const validPlan = plan.filter((p) => p.exercise && p.reps.every((r) => r > 0));
        if (validPlan.length > 0) {
            setWorkoutPlans([...workoutPlans, { exercises: validPlan }]);
            setWorkoutState({
                currentPlan: { exercises: validPlan },
                isStarted: false,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
            });
            navigate("/");
        }
    };

    return (
        <div>
            <div className="card">
                <h1>Create Workout</h1>
                {plan.map((p, index) => (
                    <div key={index} className="card">
                        <select
                            value={p.exercise}
                            onChange={(e) => {
                                const newPlan = [...plan];
                                newPlan[index].exercise = e.target.value;
                                setPlan(newPlan);
                            }}
                        >
                            <option value="">Select Exercise</option>
                            {exercises.map((ex) => (
                                <option key={ex.exercise} value={ex.exercise}>
                                    {ex.exercise}
                                </option>
                            ))}
                        </select>
                        {p.reps.map((rep, repIndex) => (
                            <div key={repIndex}>
                                <label>Reps {repIndex + 1}</label>
                                <div>
                                    <button onClick={() => updateReps(index, repIndex, rep - 1)}>-</button>
                                    <input
                                        type="number"
                                        value={rep}
                                        onChange={(e) => updateReps(index, repIndex, Number(e.target.value))}
                                        min="1"
                                    />
                                    <button onClick={() => updateReps(index, repIndex, rep + 1)}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={addExercise}>Add Exercise</button>
                <button onClick={saveWorkout}>Save Workout</button>
            </div>
        </div>
    );
};

export default WorkoutCreationPage;