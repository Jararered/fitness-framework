import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuChartNoAxesColumnDecreasing, LuAlignJustify, LuRepeat } from "react-icons/lu";
import { LuPlus, LuMinus, LuSave, LuTrash } from "react-icons/lu";
import { LuPlay } from "react-icons/lu";

import { useToast } from "../context/ToastContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import { DividerSpaced } from "../components/DividerSpaced.tsx";
import { SelectorSearchable } from "../components/SelectorSearchable.tsx";

import "../styles/pages/WorkoutCreatePage.css";
import { EquipmentProvider, useEquipment } from "../context/EquipmentContext.tsx";

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

    const selectedEquipment = equipmentLast && equipmentConfigs.length > 0 ? equipmentConfigs.find((config) => config.name === equipmentLast)?.equipment || [] : [];

    const availableExercises = exercises.filter((exercise) => exercise.required_equipment.every((equipment) => selectedEquipment.includes(equipment)));

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
        const validPlan = workoutPlanState.filter((p) => p.exercise && p.reps.every((r) => r > 0)).map((p) => ({ exercise: p.exercise, reps: p.reps }));
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
        const validPlan = workoutPlanState.filter((p) => p.exercise && p.reps.every((r) => r > 0)).map((p) => ({ exercise: p.exercise, reps: p.reps }));

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
        <EquipmentProvider>
            <div className="workout-create-page">
                <h1>Create Workout</h1>
                <div className="card">
                    {workoutPlanState.map((p, exerciseIndex) => (
                        <div className="card-content" key={exerciseIndex}>
                            <h2>Exercise {exerciseIndex + 1}</h2>

                            <SelectorSearchable
                                options={avaliableExerciseNames}
                                value={p.exercise}
                                getOptionLabel={(option) => option}
                                onChange={(value) => {
                                    const newPlan = [...workoutPlanState];
                                    newPlan[exerciseIndex].exercise = value || "";
                                    setWorkoutPlanState(newPlan);
                                    setLoadedWorkoutState(null);
                                }}
                                placeholder="Search for an exercise"
                            />

                            <div className="reps-display">
                                <p>{handleFormatReps(p.reps)} reps</p>
                            </div>

                            <div className="exercise-adjustments">
                                <DividerSpaced
                                    left={<h3>Set Count</h3>}
                                    right={
                                        <span>
                                            <button className="adjust" onClick={() => handleSetsChange(exerciseIndex, "decrease")}>
                                                <LuMinus size={24} />
                                            </button>
                                            <button className="adjust" onClick={() => handleSetsChange(exerciseIndex, "increase")}>
                                                <LuPlus size={24} />
                                            </button>
                                        </span>
                                    }
                                />

                                <DividerSpaced
                                    left={<h3>Rep Count</h3>}
                                    right={
                                        <span>
                                            <button className="adjust" onClick={() => handleChangeBaseReps(exerciseIndex, "decrease")}>
                                                <LuMinus size={24} />
                                            </button>
                                            <button className="adjust" onClick={() => handleChangeBaseReps(exerciseIndex, "increase")}>
                                                <LuPlus size={24} />
                                            </button>
                                        </span>
                                    }
                                />

                                <DividerSpaced
                                    left={<h3>Set Style</h3>}
                                    right={
                                        <span>
                                            <button className="adjust" onClick={() => handleSetStyle(exerciseIndex, "flat")}>
                                                <LuAlignJustify className="flat-set-icon" size={24} />
                                            </button>
                                            <button className="adjust" onClick={() => handleSetStyle(exerciseIndex, "drop")}>
                                                <LuChartNoAxesColumnDecreasing className="drop-set-icon" size={24} />
                                            </button>
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    <div className="workout-modify-buttons">
                        <button className="add-exercise-button" onClick={handleAddExercise}>
                            Add Exercise
                            <LuPlus size={24} />
                        </button>
                        <button className="remove-exercise-button" onClick={handleRemoveExercise}>
                            Remove Exercise
                            <LuTrash size={24} />
                        </button>
                    </div>
                </div>

                <div className="card">
                    <h2>Save Workout</h2>
                    <p>Save the current workout plan to the workout library</p>
                    <div className="card-content">
                        <input type="text" value={workoutNameState} onChange={(e) => setWorkoutNameState(e.target.value)} placeholder="Workout Name" />
                        <button className="save-button" onClick={() => handleSaveWorkout(false)}>
                            Save
                            <LuSave />
                        </button>
                    </div>
                </div>

                <div className="card">
                    <h2>Load Workout</h2>
                    <p>Select a workout to load into the current plan</p>
                    <div className="card-content">
                        {workoutPlans.length > 0 ? (
                            workoutPlans.map((workout, index) => (
                                <button key={index} className="load-button" onClick={() => handleLoadWorkout(workout)}>
                                    {workout.name || `Workout ${index + 1}`}
                                    <LuRepeat />
                                </button>
                            ))
                        ) : (
                            <p>No saved workouts yet!</p>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h2>Workout Preview</h2>
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
                        <p>No workout loaded into current plan yet.</p>
                    )}
                </div>
            </div>
        </EquipmentProvider>
    );
};

export default WorkoutCreatePage;
