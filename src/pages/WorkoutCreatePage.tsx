import React, { useEffect, useState } from "react";
import { LuChartNoAxesColumnDecreasing, LuAlignJustify, LuRepeat, LuPlay } from "react-icons/lu";
import { LuPlus, LuMinus, LuSave, LuTrash } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import { EquipmentProvider, useEquipment } from "../context/EquipmentContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import { SelectorSearchable } from "../components/SelectorSearchable.tsx";

interface WorkoutPlan {
    exercise: string;
    reps: number[];
    baseReps: number;
    sets: number;
    style: "drop" | "flat";
}

const WorkoutCreatePage: React.FC = () => {
    const { exercises, workoutPlans, setWorkoutPlans, workoutState, setWorkoutState } = useWorkout();
    const { equipmentConfigs, equipmentLast } = useEquipment();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [workoutPlanState, setWorkoutPlanState] = useState<WorkoutPlan[]>(() => {
        const savedPlan = localStorage.getItem("temp-workout-plan");
        if (savedPlan) {
            return JSON.parse(savedPlan);
        }
        return [
            {
                exercise: "",
                reps: [10, 10, 10],
                baseReps: 10,
                sets: 3,
                style: "flat",
            },
        ];
    });
    const [workoutNameState, setWorkoutNameState] = useState<string>("");
    const [loadedWorkoutState, setLoadedWorkoutState] = useState<string | null>(null);

    const repsChangeAmount = 2;

    const selectedEquipment =
        equipmentLast && equipmentConfigs.length > 0
            ? equipmentConfigs.find((config) => config.name === equipmentLast)?.equipment || []
            : [];

    const availableExercises = exercises.filter((exercise) =>
        exercise.required_equipment.every((equipment) => selectedEquipment.includes(equipment))
    );

    const avaliableExerciseNames = availableExercises.map((exercise) => exercise.exercise_name);

    // Save temporary workout plan to local storage if workoutPlan has changed
    useEffect(() => {
        localStorage.setItem("temp-workout-plan", JSON.stringify(workoutPlanState));
    }, [workoutPlanState]);

    const handleFormatReps = (reps: number[]) => {
        return reps.join(", ");
    };

    const handleSetsChange = (exerciseIndex: number, change: string) => {
        const newWorkoutPlan = [...workoutPlanState];
        let newSets = newWorkoutPlan[exerciseIndex].sets;

        if (change === "increase") {
            newSets = newWorkoutPlan[exerciseIndex].sets + 1;
        } else if (change === "decrease") {
            if (newWorkoutPlan[exerciseIndex].sets > 1) {
                newSets = newWorkoutPlan[exerciseIndex].sets - 1;
            } else {
                newSets = 1;
            }
        }

        newWorkoutPlan[exerciseIndex].sets = newSets;
        handleCalculateNewRepsArray(exerciseIndex);
    };

    const handleChangeBaseReps = (exerciseIndex: number, change: string) => {
        const newWorkoutPlan = [...workoutPlanState];
        let newBaseReps = newWorkoutPlan[exerciseIndex].baseReps;

        if (change === "increase") {
            newBaseReps = newWorkoutPlan[exerciseIndex].baseReps + repsChangeAmount;
        } else if (change === "decrease") {
            if (newWorkoutPlan[exerciseIndex].baseReps > repsChangeAmount) {
                newBaseReps = newWorkoutPlan[exerciseIndex].baseReps - repsChangeAmount;
            } else {
                newBaseReps = 2;
            }
        }

        newWorkoutPlan[exerciseIndex].baseReps = newBaseReps;
        handleCalculateNewRepsArray(exerciseIndex);
    };

    const handleSetStyle = (exerciseIndex: number, newStyle: "drop" | "flat") => {
        const newWorkoutPlan = [...workoutPlanState];
        newWorkoutPlan[exerciseIndex].style = newStyle;
        handleCalculateNewRepsArray(exerciseIndex);
    };

    const handleCalculateNewRepsArray = (exerciseIndex: number) => {
        const newWorkoutPlan = [...workoutPlanState];
        const exercise = newWorkoutPlan[exerciseIndex];

        if (exercise.style === "drop") {
            const dropSet = [exercise.baseReps];
            for (let i = 1; i < exercise.sets; i++) {
                const nextRep = Math.max(dropSet[i - 1] - repsChangeAmount, 1);
                dropSet.push(nextRep);
            }
            exercise.reps = dropSet;
        } else if (exercise.style === "flat") {
            exercise.reps = Array(exercise.sets).fill(exercise.baseReps);
        }

        // Apply the minimum reps check before setting the state
        newWorkoutPlan[exerciseIndex].reps = exercise.reps.map((rep) => Math.max(rep, 1));

        setWorkoutPlanState(newWorkoutPlan);
    };

    const handleAddExercise = () => {
        setWorkoutPlanState([
            ...workoutPlanState,
            {
                exercise: "",
                reps: [10, 10, 10],
                baseReps: 10,
                sets: 3,
                style: "flat",
            },
        ]);
        setLoadedWorkoutState(null);
    };

    const handleRemoveExercise = () => {
        if (workoutPlanState.length > 1) {
            setWorkoutPlanState(workoutPlanState.slice(0, workoutPlanState.length - 1));
            setLoadedWorkoutState(null);
        }
    };

    const handleSaveWorkout = (startWorkout: boolean = false) => {
        const validPlan = workoutPlanState
            .filter((p) => p.exercise && p.reps.every((r) => r > 0))
            .map((p) => ({ exercise: p.exercise, reps: p.reps }));
        if (validPlan.length > 0) {
            const newWorkout = { name: workoutNameState || `Workout ${workoutPlans.length + 1}`, exercises: validPlan };

            // Find and update existing workout if it exists
            const existingWorkoutIndex = workoutPlans.findIndex((w) => w.name === loadedWorkoutState);
            if (existingWorkoutIndex !== -1) {
                const updatedWorkoutPlans = [...workoutPlans];
                updatedWorkoutPlans[existingWorkoutIndex] = newWorkout;
                setWorkoutPlans(updatedWorkoutPlans);
            } else {
                setWorkoutPlans([...workoutPlans, newWorkout]);
            }

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
                setWorkoutNameState("");
                setLoadedWorkoutState(newWorkout.name);
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

        addToast(`Workout saved: ${workoutNameState}`, "success");
    };

    const handleLoadWorkout = (workout: { name?: string; exercises: { exercise: string; reps: number[] }[] }) => {
        const newPlan = workout.exercises.map((ex) => ({ exercise: ex.exercise, reps: [...ex.reps] }));
        setWorkoutPlanState(
            newPlan.map((p) => ({
                exercise: p.exercise,
                reps: p.reps,
                baseReps: p.reps[0],
                sets: p.reps.length,
                style: "flat",
            }))
        );
        setWorkoutNameState(workout.name || "");
        setLoadedWorkoutState(workout.name || `Workout ${workoutPlans.indexOf(workout) + 1}`);
        setWorkoutState((prevState) => ({
            ...prevState,
            currentPlan: { name: workout.name, exercises: newPlan },
            isStarted: false,
            currentExerciseIndex: 0,
            currentSetIndex: 0,
            repsCompleted: [],
            weightsUsed: [],
        }));

        addToast(`Workout loaded: ${workout.name}`, "success");
    };

    const handleStartWorkout = () => {
        const validPlan = workoutPlanState
            .filter((p) => p.exercise && p.reps.every((r) => r > 0))
            .map((p) => ({ exercise: p.exercise, reps: p.reps }));

        if (validPlan.length > 0) {
            setWorkoutState({
                currentPlan: { name: workoutNameState || loadedWorkoutState || "Unnamed", exercises: validPlan },
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
        <div className="workout-create-page page-container">
            <h1>Create Workout</h1>

            <EquipmentProvider>
                <div className="card">
                    {workoutPlanState.map((p, index) => (
                        <React.Fragment key={index}>
                            <div className="card-header">
                                <h2>Exercise {index + 1}</h2>
                                <p>Select an exercise to add to the workout</p>
                            </div>

                            <div className="card-content">
                                <SelectorSearchable
                                    options={avaliableExerciseNames}
                                    value={p.exercise}
                                    getOptionLabel={(option) => option}
                                    onChange={(value) => {
                                        const newPlan = [...workoutPlanState];
                                        newPlan[index].exercise = value || "";
                                        setWorkoutPlanState(newPlan);
                                        setLoadedWorkoutState(null);
                                    }}
                                    placeholder="Search for an exercise"
                                />

                                <div className="reps-display">
                                    <strong>{handleFormatReps(p.reps)} reps</strong>
                                </div>

                                <span className="card-row">
                                    <label>Set Count</label>
                                    <button
                                        className="icon"
                                        onClick={() => handleSetsChange(index, "decrease")}
                                    >
                                        <LuMinus />
                                    </button>
                                    <button
                                        className="icon"
                                        onClick={() => handleSetsChange(index, "increase")}
                                    >
                                        <LuPlus />
                                    </button>
                                </span>
                                <span className="card-row">
                                    <label>Rep Count</label>
                                    <button
                                        className="icon"
                                        onClick={() => handleChangeBaseReps(index, "decrease")}
                                    >
                                        <LuMinus />
                                    </button>
                                    <button
                                        className="icon"
                                        onClick={() => handleChangeBaseReps(index, "increase")}
                                    >
                                        <LuPlus />
                                    </button>
                                </span>

                                <span className="card-row">
                                    <label>Set Style</label>
                                    <button
                                        className="icon"
                                        onClick={() => handleSetStyle(index, "flat")}
                                    >
                                        <LuAlignJustify style={{ transform: "rotate(90deg)" }} />
                                    </button>
                                    <button
                                        className="icon"
                                        onClick={() => handleSetStyle(index, "drop")}
                                    >
                                        <LuChartNoAxesColumnDecreasing />
                                    </button>
                                </span>
                                {index < workoutPlanState.length - 1 && <hr />}
                            </div>
                        </React.Fragment>
                    ))}

                    <span className="card-row">
                        <button onClick={handleAddExercise}>
                            Add Exercise
                            <LuPlus />
                        </button>
                        <button
                            className="icon caution"
                            onClick={handleRemoveExercise}
                        >
                            <LuTrash />
                        </button>
                    </span>
                </div>
            </EquipmentProvider>

            <div className="card">
                <div className="card-header">
                    <h2>Save Workout</h2>
                    <p>Save the current workout plan to your saved workouts</p>
                </div>
                <div className="card-content">
                    <input
                        type="text"
                        value={workoutNameState}
                        onChange={(e) => setWorkoutNameState(e.target.value)}
                        placeholder="Workout Name"
                    />
                    <button
                        className="save-button"
                        onClick={() => handleSaveWorkout(false)}
                    >
                        Save
                        <LuSave />
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>Load Workout</h2>
                    <p>Select a workout to load into the current plan</p>
                </div>
                <div className="card-content">
                    {workoutPlans.length > 0 ? (
                        workoutPlans.map((workout, index) => (
                            <button
                                key={index}
                                className="load-button"
                                onClick={() => handleLoadWorkout(workout)}
                            >
                                {workout.name || `Workout ${index + 1}`}
                                <LuRepeat />
                            </button>
                        ))
                    ) : (
                        <strong>No saved workouts yet.</strong>
                    )}
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>Workout Preview</h2>
                    <p>Preview the current workout plan</p>
                </div>
                <div className="card-content">
                    {workoutState.currentPlan && workoutState.currentPlan.exercises.length > 0 ? (
                        <>
                            <p>{workoutState.currentPlan.name || workoutNameState || "Unnamed Workout"}</p>
                            {workoutState.currentPlan.exercises.map((exercise, index) => (
                                <p key={index}>
                                    {exercise.exercise}: {handleFormatReps(exercise.reps)} reps
                                </p>
                            ))}
                            <button onClick={handleStartWorkout}>
                                Start Workout
                                <LuPlay />
                            </button>
                        </>
                    ) : (
                        <strong>No workout loaded into current plan yet.</strong>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkoutCreatePage;
