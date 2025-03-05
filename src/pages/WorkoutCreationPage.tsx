import React, { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

interface ExercisePlanDraft {
    exercise: string;
    reps: number[];
}

const WorkoutCreationPage: React.FC = () => {
    const { exercises, workoutPlans, setWorkoutPlans, setWorkoutState } = useWorkout();
    const [plan, setPlan] = useState<ExercisePlanDraft[]>([
        { exercise: "", reps: [10, 10, 10] },
    ]);
    const navigate = useNavigate();

    const updateReps = (exerciseIndex: number, repIndex: number, value: number) => {
        const newPlan = [...plan];
        newPlan[exerciseIndex].reps[repIndex] = Math.max(1, value);
        setPlan(newPlan);
    };

    const addSet = (exerciseIndex: number) => {
        const newPlan = [...plan];
        newPlan[exerciseIndex].reps.push(10);
        setPlan(newPlan);
    };

    const removeSet = (exerciseIndex: number) => {
        const newPlan = [...plan];
        if (newPlan[exerciseIndex].reps.length > 1) {
            newPlan[exerciseIndex].reps.pop();
            setPlan(newPlan);
        }
    };

    const addExercise = () => {
        setPlan([...plan, { exercise: "", reps: [10, 10, 10] }]);
    };

    const saveWorkout = () => {
        const validPlan = plan
            .filter((p) => p.exercise && p.reps.every((r) => r > 0))
            .map((p) => ({ exercise: p.exercise, reps: p.reps }));
        if (validPlan.length > 0) {
            setWorkoutPlans([...workoutPlans, { exercises: validPlan }]);
            setWorkoutState({
                currentPlan: { exercises: validPlan },
                isStarted: false,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
            navigate("/");
        }
    };

    return (
        <div className="workout-creation-page">
            <h1>Create Workout</h1>
            <div className="card">
                <h1>Create Workout</h1>
                {plan.map((p, exerciseIndex) => (
                    <div key={exerciseIndex} className="card">
                        <select
                            value={p.exercise}
                            onChange={(e) => {
                                const newPlan = [...plan];
                                newPlan[exerciseIndex].exercise = e.target.value;
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
                        <h2>Sets</h2>
                        {p.reps.map((rep, repIndex) => (
                            <div key={repIndex}>
                                <label>Set {repIndex + 1}</label>
                                <input
                                    type="number"
                                    value={rep}
                                    onChange={(e) => updateReps(exerciseIndex, repIndex, Number(e.target.value))}
                                    min="1"
                                />
                            </div>
                        ))}
                        <div>
                            <button className="set-adjust" onClick={() => removeSet(exerciseIndex)}>-</button>
                            <button className="set-adjust" onClick={() => addSet(exerciseIndex)}>+</button>
                        </div>
                    </div>
                ))}
                <button onClick={addExercise}>Add Exercise</button>
                <button onClick={saveWorkout}>Save Workout</button>
            </div>
        </div>
    );
};

export default WorkoutCreationPage;