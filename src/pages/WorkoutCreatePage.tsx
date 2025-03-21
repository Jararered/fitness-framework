import React, { useEffect, useState } from "react";
import { LuChartNoAxesColumnDecreasing, LuAlignJustify, LuRepeat, LuPlay, LuPencil } from "react-icons/lu";
import { LuPlus, LuMinus, LuSave, LuTrash } from "react-icons/lu";
import { LuDumbbell, LuArrowDown } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import { EquipmentProvider, useEquipment } from "../context/EquipmentContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import { PopupContainer } from "../components/PopupContainer.tsx";
import { SelectorSearchable } from "../components/SelectorSearchable.tsx";
import { CircuitPlan, ExercisePlan, WorkoutPlan } from "../data/types.ts";

import "../styles/pages/CircuitPreviewPage.css";
import "../styles/components/PopupContainer.css";
import "../styles/pages/WorkoutCreatePage.css";
const repsChangeAmount = 2;

const WorkoutCreatePage: React.FC = () => {
    const { exercises, workoutPlans, setWorkoutPlans, workoutState, setWorkoutState } = useWorkout();
    const { equipmentConfigs, equipmentLast } = useEquipment();
    const navigate = useNavigate();
    const { addToast } = useToast();

    // State for the workout plan
    const [workoutNameState, setWorkoutNameState] = useState<string>("");
    const [baseReps, setBaseReps] = useState<number>(10);
    const [reps, setReps] = useState<number[]>([10, 10, 10]);
    const [sets, setSets] = useState<number>(3);
    const [style, setStyle] = useState<"drop" | "flat">("flat");

    const [workoutPlanState, setWorkoutPlanState] = useState<WorkoutPlan>(() => {
        const savedPlan = localStorage.getItem("temp-workout-plan");
        if (savedPlan) {
            return JSON.parse(savedPlan);
        }
        return { circuits: [] };
    });

    const handleValidateWorkout = () => {
        if (workoutState.currentPlan?.circuits.length === 0) {
            return;
        }
    };

    const handleRepTag = (circuitIndex: number, exerciseIndex: number) => {
        // Returns the number of exercises in the circuit
        // Ex: "2 Rounds" if there are 2 exercises in the circuit
        return <React.Fragment>{workoutPlanState.circuits[circuitIndex].exercises.length} Rounds</React.Fragment>;
    };

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

    const handleSetsChange = (change: string) => {
        let newSets = sets;

        if (change === "increase") {
            newSets = sets + 1;
        } else if (change === "decrease") {
            if (sets > 1) {
                newSets = sets - 1;
            } else {
                newSets = 1;
            }
        }

        setSets(newSets);
        handleCalculateNewRepsArray();
    };

    const handleChangeBaseReps = (change: string) => {
        let newBaseReps = baseReps;

        if (change === "increase") {
            newBaseReps = baseReps + repsChangeAmount;
        } else if (change === "decrease") {
            if (baseReps > repsChangeAmount) {
                newBaseReps = baseReps - repsChangeAmount;
            } else {
                newBaseReps = 2;
            }
        }

        setBaseReps(newBaseReps);
        handleCalculateNewRepsArray();
    };

    const handleSetStyle = (newStyle: "drop" | "flat") => {
        setStyle(newStyle);
        handleCalculateNewRepsArray();
    };

    const handleCalculateNewRepsArray = () => {
        if (style === "drop") {
            const dropSet = [baseReps];
            for (let i = 1; i < sets; i++) {
                const nextRep = Math.max(dropSet[i - 1] - repsChangeAmount, 1);
                dropSet.push(nextRep);
            }
            setReps(dropSet);
        } else if (style === "flat") {
            setReps(Array(sets).fill(baseReps));
        }

        // Apply the minimum reps check before setting the state
        setReps(reps.map((rep) => Math.max(rep, 1)));
    };

    const handleSaveWorkout = (startWorkout: boolean = false) => {
        // Prompt user for workout name if it is not already set
        if (!workoutNameState) {
            const name = prompt("Enter a name for the workout");
            if (name) {
                setWorkoutNameState(name);
            }
        }

        const validPlan: CircuitPlan[] = workoutPlanState.circuits.map((c) => ({
            exercises: c.exercises.filter((e) => e.exercise && e.reps.every((r) => r > 0)),
        }));

        if (validPlan.length > 0) {
            const newWorkout: WorkoutPlan = {
                name: workoutNameState || `Workout ${workoutPlans.length + 1}`,
                circuits: validPlan,
            };

            // Find and update existing workout if it exists
            const existingWorkoutIndex = workoutPlans.findIndex((w) => w.name === newWorkout.name);
            if (existingWorkoutIndex !== -1) {
                const updatedWorkoutPlans = [...workoutPlans];
                updatedWorkoutPlans[existingWorkoutIndex] = newWorkout as WorkoutPlan;
                setWorkoutPlans(updatedWorkoutPlans);
            } else {
                setWorkoutPlans([...workoutPlans, newWorkout as WorkoutPlan]);
            }

            if (startWorkout) {
                setWorkoutState({
                    currentPlan: newWorkout,
                    isStarted: true,
                    currentCircuitIndex: 0,
                    currentExerciseIndex: 0,
                    currentSetIndex: 0,
                    repsCompleted: [],
                    weightsUsed: [],
                });
                navigate("/exercise");
            } else {
                setWorkoutNameState("");
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

    const handleLoadWorkout = (workout: WorkoutPlan) => {
        setWorkoutPlanState(workout);
        setWorkoutNameState(workout.name || "");
        setWorkoutState({
            currentPlan: workout,
            isStarted: false,
            currentCircuitIndex: 0,
            currentExerciseIndex: 0,
            currentSetIndex: 0,
            repsCompleted: [],
            weightsUsed: [],
        });

        addToast(`Workout loaded: ${workout.name}`, "success");
    };

    const handleStartWorkout = () => {
        const validPlan = workoutPlanState.circuits.map((circuit) =>
            circuit.exercises.filter((exercise) => exercise.exercise && exercise.reps.every((rep) => rep > 0))
        );

        if (validPlan.length > 0) {
            setWorkoutState({
                currentPlan: workoutPlanState,
                isStarted: false,
                currentCircuitIndex: 0,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
            navigate("/exercise");
        }
    };

    const handleAddCircuit = () => {
        // Append a new circuit to the workout plan
        setWorkoutPlanState({
            ...workoutPlanState,
            circuits: [...workoutPlanState.circuits, { exercises: [] }],
        });
    };

    const handleAddExerciseToCircuit = (circuitIndex: number) => {
        // Append a new exercise to the circuit at the given index
        setWorkoutPlanState({
            ...workoutPlanState,
            circuits: workoutPlanState.circuits.map((circuit, index) =>
                index === circuitIndex
                    ? { ...circuit, exercises: [...circuit.exercises, { exercise: "", reps: [] }] }
                    : circuit
            ),
        });
    };

    const handleDeleteExerciseFromCircuit = (circuitIndex: number, exerciseIndex: number) => {
        setWorkoutPlanState({
            ...workoutPlanState,
            circuits: workoutPlanState.circuits.map((circuit, index) =>
                index === circuitIndex
                    ? { ...circuit, exercises: circuit.exercises.filter((_, i) => i !== exerciseIndex) }
                    : circuit
            ),
        });
    };

    const handleEditExercise = (circuitIndex: number, exerciseIndex: number) => {};

    return (
        <div className="workout-create-page page-container">
            <div className="card-header">
                <h1>Create Workout</h1>
            </div>

            <EquipmentProvider>
                <div className="card-content">
                    <div className="workout-preview-container">
                        {/* Iterate over each circuit */}
                        {workoutPlanState.circuits.map((circuit, circuitIndex) => (
                            <React.Fragment key={circuitIndex}>
                                <div className="circuit-container">
                                    <div className="circuit-header">Circuit {circuitIndex + 1}</div>
                                    <hr />
                                    {/* Iterate over each exercise */}
                                    {circuit.exercises.map((exercise, exerciseIndex) => (
                                        <React.Fragment key={exerciseIndex}>
                                            <div
                                                className="circuit-preview-exercise"
                                                key={exerciseIndex}
                                            >
                                                <span className="exercise-preview-item">
                                                    <div className="exercise-icon">
                                                        <LuDumbbell />
                                                    </div>
                                                    <div className="exercise-details">
                                                        <div className="exercise-name">
                                                            {exercise.exercise
                                                                ? exercise.exercise
                                                                : "No exercise selected"}
                                                        </div>
                                                        <div className="exercise-reps">
                                                            {exercise.reps.length > 0
                                                                ? exercise.reps.join(", ")
                                                                : "No reps selected"}
                                                        </div>
                                                    </div>
                                                    <span className="exercise-edit-buttons">
                                                        <button
                                                            className="exercise-edit-button icon"
                                                            onClick={() =>
                                                                handleEditExercise(circuitIndex, exerciseIndex)
                                                            }
                                                        >
                                                            <LuPencil />
                                                        </button>
                                                        <button
                                                            className="exercise-delete-button icon caution"
                                                            onClick={() =>
                                                                handleDeleteExerciseFromCircuit(
                                                                    circuitIndex,
                                                                    exerciseIndex
                                                                )
                                                            }
                                                        >
                                                            <LuTrash />
                                                        </button>
                                                    </span>
                                                </span>
                                            </div>
                                            {exerciseIndex < circuit.exercises.length - 1 && (
                                                <span className="exercise-divider">
                                                    <p>1:00</p>
                                                    <LuArrowDown />
                                                </span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    <div className="add-exercise-button-container">
                                        <button
                                            className="add-exercise-button"
                                            onClick={() => handleAddExerciseToCircuit(circuitIndex)}
                                        >
                                            Add Exercise <LuPlus />
                                        </button>
                                    </div>
                                    <div className="circuit-rep-index">{handleRepTag(circuitIndex, 0)}</div>
                                </div>

                                {circuitIndex < workoutPlanState.circuits.length - 1 && (
                                    <div className="circuit-divider">
                                        <div className="circuit-divider-text">Move to next circuit</div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}

                        <div className="add-circuit-button-container">
                            <button
                                className="new-circuit-button"
                                onClick={handleAddCircuit}
                            >
                                New Circuit <LuPlus />
                            </button>
                        </div>
                    </div>
                </div>
            </EquipmentProvider>
        </div>
    );
};

export default WorkoutCreatePage;
