import React, { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
interface ExercisePlanDraft {
    exercise: string;
    reps: number[];
}

const WorkoutCreationPage: React.FC = () => {
    const { exercises, workoutPlans, setWorkoutPlans, workoutState, setWorkoutState, } = useWorkout();
    const { equipmentConfigs, equipmentLast } = useUser();
    const [plan, setPlan] = useState<ExercisePlanDraft[]>([{ exercise: "", reps: [10, 10, 10] }]);
    const [workoutName, setWorkoutName] = useState<string>("");
    const [loadedWorkout, setLoadedWorkout] = useState<string | null>(null);
    const navigate = useNavigate();

    const selectedEquipment =
        equipmentLast && equipmentConfigs.length > 0
            ? equipmentConfigs.find((config) => config.name === equipmentLast)?.equipment || []
            : [];

    const availableExercises = exercises.filter((exercise) =>
        exercise.required_equipment.every((eq) => selectedEquipment.includes(eq))
    );

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
        setLoadedWorkout(null);
    };

    const handleRemoveExercise = () => {
        if (plan.length > 1) {
            setPlan(plan.slice(0, plan.length - 1));
            setLoadedWorkout(null);
        }
    };

    const handleSaveWorkout = (startWorkout: boolean = false) => {
        const validPlan = plan
            .filter((p) => p.exercise && p.reps.every((r) => r > 0))
            .map((p) => ({ exercise: p.exercise, reps: p.reps }));
        if (validPlan.length > 0) {
            const newWorkout = { name: workoutName || `Workout ${workoutPlans.length + 1}`, exercises: validPlan };
            setWorkoutPlans([...workoutPlans, newWorkout]);
            if (startWorkout) {
                setWorkoutState({
                    currentPlan: newWorkout,
                    isStarted: true,
                    currentExerciseIndex: 0,
                    currentSetIndex: 0,
                    repsCompleted: [],
                    weightsUsed: [],
                });
                navigate("/exercise");
            } else {
                setWorkoutName("");
                setLoadedWorkout(newWorkout.name);
                setWorkoutState((prevState) => ({
                    ...prevState,
                    currentPlan: newWorkout,
                    isStarted: false,
                    currentExerciseIndex: 0,
                    currentSetIndex: 0,
                    repsCompleted: [],
                    weightsUsed: [],
                }));
            }
        }
    };

    const handleLoadWorkout = (workout: { name?: string; exercises: { exercise: string; reps: number[] }[] }) => {
        const newPlan = workout.exercises.map((ex) => ({ exercise: ex.exercise, reps: [...ex.reps] }));
        setPlan(newPlan);
        setWorkoutName(workout.name || "");
        setLoadedWorkout(workout.name || `Workout ${workoutPlans.indexOf(workout) + 1}`);
        setWorkoutState((prevState) => ({
            ...prevState,
            currentPlan: { name: workout.name, exercises: newPlan },
            isStarted: false,
            currentExerciseIndex: 0,
            currentSetIndex: 0,
            repsCompleted: [],
            weightsUsed: [],
        }));
    };

    const handleStartWorkout = () => {
        const validPlan = plan
            .filter((p) => p.exercise && p.reps.every((r) => r > 0))
            .map((p) => ({ exercise: p.exercise, reps: p.reps }));
        if (validPlan.length > 0) {
            setWorkoutState({
                currentPlan: { name: workoutName || loadedWorkout || "Unnamed", exercises: validPlan },
                isStarted: true,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
            navigate("/exercise");
        }
    };

    return (
        <div className="workout-creation-page">
            <h1>Create Workout</h1>
            <div className="card">
                {plan.map((p, exerciseIndex) => (
                    <div key={exerciseIndex}>
                        <h2>Exercise {exerciseIndex + 1}</h2>
                        <select
                            value={p.exercise}
                            onChange={(e) => {
                                const newPlan = [...plan];
                                newPlan[exerciseIndex].exercise = e.target.value;
                                setPlan(newPlan);
                                setLoadedWorkout(null);
                            }}
                        >
                            <option value="">Select Exercise</option>
                            {availableExercises.map((ex) => (
                                <option key={ex.exercise_name} value={ex.exercise_name}>
                                    {ex.exercise_name}
                                </option>
                            ))}
                        </select>
                        <span>
                            <button className="adjust" onClick={() => handleDecreaseSets(exerciseIndex)}>
                                -
                            </button>
                            <h2>Sets</h2>
                            <button className="adjust" onClick={() => handleIncreaseSets(exerciseIndex)}>
                                +
                            </button>
                        </span>
                        {p.reps.map((rep, repIndex) => (
                            <span key={repIndex}>
                                <label>Set {repIndex + 1}</label>
                                <input
                                    type="number"
                                    value={rep}
                                    onChange={(e) =>
                                        handleUpdateReps(exerciseIndex, repIndex, Number(e.target.value))
                                    }
                                    min="1"
                                    step="1"
                                />
                            </span>
                        ))}
                    </div>
                ))}
                <span>
                    <button onClick={handleAddExercise}>Add Exercise</button>
                    <button className="caution" onClick={handleRemoveExercise}>
                        Remove Exercise
                    </button>
                </span>
            </div>
            <div className="card">
                <h2>Save Workout</h2>
                <span>
                    <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        placeholder="Workout Name"
                    />
                    <button onClick={() => handleSaveWorkout(false)}>Save</button>
                </span>
            </div>
            <div className="card">
                <h2>Load Workout</h2>
                <span>
                    {workoutPlans.map((workout, index) => (
                        <button key={index} onClick={() => handleLoadWorkout(workout)}>
                            {workout.name || `Workout ${index + 1}`}
                        </button>
                    ))}
                </span>
            </div>
            <div className="card">
                <h2>Workout Preview</h2>
                {workoutState.currentPlan && workoutState.currentPlan.exercises.length > 0 ? (
                    <>
                        <p>{workoutState.currentPlan.name || workoutName || "Unnamed Workout"}</p>
                        {workoutState.currentPlan.exercises.map((exercise, index) => (
                            <p key={index}>
                                {exercise.exercise}: {exercise.reps.join(", ")} reps
                            </p>
                        ))}
                        <button onClick={handleStartWorkout}>Start Workout</button>
                    </>
                ) : (
                    <p>No workout loaded into current plan yet.</p>
                )}
            </div>
        </div>
    );
};

export default WorkoutCreationPage;