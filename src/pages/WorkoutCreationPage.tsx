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

    const handleUpdateReps = (exerciseIndex: number, repIndex: number, value: number) => {
        const newPlan = [...plan];
        newPlan[exerciseIndex].reps[repIndex] = Math.max(1, value);
        setPlan(newPlan);
    };

    const handleIncreaseSets = (exerciseIndex: number) => {
        const newPlan = [...plan];
        newPlan[exerciseIndex].reps.push(10);
        setPlan(newPlan);
    };

    const handleDecreaseSets = (exerciseIndex: number) => {
        const newPlan = [...plan];
        if (newPlan[exerciseIndex].reps.length > 1) {
            newPlan[exerciseIndex].reps.pop();
            setPlan(newPlan);
        }
    };

    const handleAddExercise = () => {
        setPlan([...plan, { exercise: "", reps: [10, 10, 10] }]);
    };

    const handleRemoveExercise = () => {
        if (plan.length > 1) {
            setPlan(plan.slice(0, plan.length - 1));
        }
    }

    const handleSaveWorkout = () => {
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
                <h2>Create Workout</h2>
                {plan.map((p, exerciseIndex) => (
                    <div key={exerciseIndex} >
                        <h2>Exercise {exerciseIndex + 1}</h2>
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
                        <span>
                            <button className="adjust" onClick={() => handleDecreaseSets(exerciseIndex)}>-</button>
                            <h2>Sets</h2>
                            <button className="adjust" onClick={() => handleIncreaseSets(exerciseIndex)}>+</button>
                        </span>
                        {p.reps.map((rep, repIndex) => (
                            <span key={repIndex}>
                                <label>Set {repIndex + 1}</label>
                                <input
                                    type="number"
                                    value={rep}
                                    onChange={(e) => handleUpdateReps(exerciseIndex, repIndex, Number(e.target.value))}
                                    min="1"
                                    step="1"
                                />
                            </span>
                        ))}
                    </div>
                ))}
                <span>
                    <button onClick={handleAddExercise}>Add Exercise</button>
                    <button className="caution" onClick={handleRemoveExercise}>Remove Exercise</button>
                </span>
                <button onClick={handleSaveWorkout}>Save Workout</button>
            </div>
        </div>
    );
};

export default WorkoutCreationPage;