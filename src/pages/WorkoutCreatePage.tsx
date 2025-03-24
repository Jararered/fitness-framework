import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuChartNoAxesColumnDecreasing, LuAlignJustify, LuPencil, LuSave } from "react-icons/lu";
import { LuPlus, LuMinus, LuTrash } from "react-icons/lu";
import { LuDumbbell, LuArrowDown } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";

import { useContainer } from "../context/ContainerContext.tsx";
// import { useWorkout } from "../context/WorkoutContext.tsx";

import { ContainerCard } from "../components/ContainerCard.tsx";
import { SelectorSearchable } from "../components/SelectorSearchable.tsx";

import { ExercisePlan, CircuitPlan, WorkoutPlan, MuscleGroup } from "../data/types.ts";
import { generateRandomWorkout } from "../data/generator.ts";

import "../styles/components/WorkoutOverview.css";
import "../styles/pages/WorkoutCreatePage.css";

import { useWorkoutStore } from "../features/workouts/hooks/useWorkoutStore.ts";
import { useEquipmentStore } from "../features/equipment/hooks/useEquipmentStore.ts";
import { useExerciseStore } from "../features/exercises/hooks/useExerciseStore.ts";

const repsChangeAmount = 2;

interface EditExercisePopupProps {
    initialExercise: ExercisePlan;
    onClose: (updatedExercise: ExercisePlan) => void;
}

const EditExercisePopup = ({ initialExercise, onClose }: EditExercisePopupProps) => {
    const { selectedEquipment } = useEquipmentStore();
    const { exercises } = useExerciseStore();

    const { hidePopup } = useContainer();

    const [exercise, setExercise] = useState<ExercisePlan>(initialExercise);
    // Null check for exercise, create exercise if it is not set
    useEffect(() => {
        if (initialExercise.exercise === "") {
            setExercise({ ...initialExercise, exercise: "", sets: 3, reps: [10, 10, 10], baseReps: 10 });
        }
    }, [initialExercise]);

    useEffect(() => {
        setExercise(initialExercise);
    }, [initialExercise]);

    useEffect(() => {
        console.log("Initial exercise", JSON.stringify(initialExercise));
    }, [initialExercise]);

    useEffect(() => {
        console.log("Exercise", JSON.stringify(exercise));
    }, [exercise]);

    useEffect(() => {
        // Calculate reps array whenever sets, baseReps, or style changes
        let newReps: number[] = [];
        if (exercise.style === "drop") {
            newReps = [exercise.baseReps];
            for (let i = 1; i < exercise.sets; i++) {
                const nextRep = Math.max(newReps[i - 1] - repsChangeAmount, 1);
                newReps.push(nextRep);
            }
        } else if (exercise.style === "flat") {
            newReps = Array(exercise.sets).fill(exercise.baseReps);
        }

        // Apply minimum reps check
        newReps = newReps.map((rep) => Math.max(rep, 1));

        // Only update if reps array has actually changed
        if (JSON.stringify(newReps) !== JSON.stringify(exercise.reps)) {
            setExercise((prevExercise) => ({ ...prevExercise, reps: newReps }));
        }
    }, [exercise.sets, exercise.baseReps, exercise.style]);

    const availableExercises = exercises.filter((exercise) =>
        exercise.required_equipment.every((equipment) => selectedEquipment.includes(equipment))
    );
    const avaliableExerciseNames = availableExercises.map((exercise) => exercise.exercise_name);

    const handleSetsChange = (change: string) => {
        let newSets = exercise.sets;

        if (change === "increase") {
            newSets = exercise.sets + 1;
        } else if (change === "decrease") {
            if (exercise.sets > 1) {
                newSets = exercise.sets - 1;
            } else {
                newSets = 1;
            }
        }

        setExercise({ ...exercise, sets: newSets });
    };

    const handleChangeBaseReps = (change: string) => {
        let newBaseReps = exercise.baseReps;

        if (change === "increase") {
            newBaseReps = exercise.baseReps + repsChangeAmount;
        } else if (change === "decrease") {
            if (exercise.baseReps > repsChangeAmount) {
                newBaseReps = exercise.baseReps - repsChangeAmount;
            } else {
                newBaseReps = 2;
            }
        }

        setExercise({ ...exercise, baseReps: newBaseReps });
    };

    const handleSetStyle = (newStyle: "drop" | "flat") => {
        setExercise({ ...exercise, style: newStyle });
    };

    const handleClose = () => {
        hidePopup();
        onClose(exercise);
    };

    return (
        <div className="edit-exercise-popup">
            <div className="card-header">
                <h2>Edit Exercise</h2>
                <p>Select an exercise and edit the amount of reps, sets, and style</p>
            </div>

            <div className="card-content">
                <span className="card-row expanding">
                    <SelectorSearchable
                        options={avaliableExerciseNames}
                        onChange={(exerciseName) => {
                            const newExerciseName = availableExercises.find((e) => e.exercise_name === exerciseName);
                            if (newExerciseName) {
                                setExercise({ ...exercise, exercise: newExerciseName.exercise_name });
                            }
                        }}
                        value={exercise.exercise}
                        getOptionLabel={(option) => option}
                    />
                </span>

                <div className="reps-display">
                    <p>{exercise.reps.join(", ")} reps</p>
                </div>

                <span className="card-row">
                    <label className="left">Set Count</label>
                    <button
                        className="icon"
                        onClick={() => handleSetsChange("decrease")}
                    >
                        <LuMinus />
                    </button>
                    <button
                        className="icon"
                        onClick={() => handleSetsChange("increase")}
                    >
                        <LuPlus />
                    </button>
                </span>
                <span className="card-row">
                    <label className="left">Rep Count</label>
                    <button
                        className="icon"
                        onClick={() => handleChangeBaseReps("decrease")}
                    >
                        <LuMinus />
                    </button>
                    <button
                        className="icon"
                        onClick={() => handleChangeBaseReps("increase")}
                    >
                        <LuPlus />
                    </button>
                </span>

                <span className="card-row">
                    <label className="left">Set Style</label>
                    <button
                        className="icon"
                        onClick={() => handleSetStyle("flat")}
                    >
                        <LuAlignJustify style={{ transform: "rotate(90deg)" }} />
                    </button>
                    <button
                        className="icon"
                        onClick={() => handleSetStyle("drop")}
                    >
                        <LuChartNoAxesColumnDecreasing />
                    </button>
                </span>

                <button
                    className="save-exercise-button"
                    onClick={handleClose}
                >
                    Save <LuSave />
                </button>
            </div>
        </div>
    );
};

const WorkoutCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { addToast, showPopup } = useContainer();

    const { selectedEquipment } = useEquipmentStore();
    const { workoutState, setWorkoutState } = useWorkoutStore();
    const { workoutPlan, setWorkoutPlan } = useWorkoutStore();
    const { workoutPlans, setWorkoutPlans } = useWorkoutStore();

    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("Legs");

    const handleRepTag = (circuitIndex: number) => {
        // Returns the number of exercises in the circuit
        // Ex: "2 Rounds" if there are 2 exercises in the circuit
        return <React.Fragment>{workoutPlan.circuits[circuitIndex].exercises.length} Rounds</React.Fragment>;
    };

    const handleSaveWorkout = () => {
        // Prompt user for workout name if it is not already set
        if (!workoutPlan.name) {
            const name = prompt("Enter a name for the workout");
            if (name) {
                setWorkoutPlan({ ...workoutPlan, name });
            }
        }

        const validPlan: CircuitPlan[] = workoutPlan.circuits.map((c) => ({
            exercises: c.exercises.filter((e) => e.exercise && e.reps.every((r) => r > 0)),
        }));

        if (validPlan.length > 0) {
            const newWorkout: WorkoutPlan = {
                name: workoutPlan.name || `Workout ${workoutPlans.length + 1}`,
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

            setWorkoutPlan({ ...workoutPlan, name: "" });
            setWorkoutState({
                ...workoutState,
                currentPlan: newWorkout,
                isStarted: false,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
        }

        addToast(`Workout saved: ${workoutPlan.name}`, "success");
    };

    const handleLoadWorkout = (workout: WorkoutPlan) => {
        setWorkoutPlan(workout);
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
        const validPlan = workoutPlan.circuits.map((circuit) =>
            circuit.exercises.filter((exercise) => exercise.exercise && exercise.reps.every((rep) => rep > 0))
        );

        if (validPlan.length > 0) {
            setWorkoutState({
                currentPlan: workoutPlan,
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
        setWorkoutPlan({
            ...workoutPlan,
            circuits: [
                ...workoutPlan.circuits,
                { exercises: [{ exercise: "", reps: [10, 10, 10], sets: 3, style: "flat", baseReps: 10 }] },
            ],
        });
    };

    const handleDeleteCircuit = (circuitIndex: number) => {
        setWorkoutPlan({
            ...workoutPlan,
            circuits: workoutPlan.circuits.filter((_, i) => i !== circuitIndex),
        });
    };

    const handleAddExerciseToCircuit = (circuitIndex: number) => {
        const newExercise: ExercisePlan = { exercise: "", reps: [10, 10, 10], sets: 3, style: "flat", baseReps: 10 };

        const newCircuit = workoutPlan.circuits[circuitIndex];
        const newExercises = [...newCircuit.exercises, newExercise];

        // Append a new exercise to the circuit at the given index
        setWorkoutPlan({
            ...workoutPlan,
            circuits: workoutPlan.circuits.map((circuit, index) =>
                index === circuitIndex
                    ? {
                          ...circuit,
                          exercises: newExercises,
                      }
                    : circuit
            ),
        });

        // Immediately open the new circuit for editing
        setTimeout(() => {
            showPopup(
                <EditExercisePopup
                    initialExercise={newExercises[newExercises.length - 1]}
                    onClose={(updatedExercise) => {
                        setWorkoutPlan({
                            ...workoutPlan,
                            circuits: workoutPlan.circuits.map((circuit, index) =>
                                index === circuitIndex ? { ...circuit, exercises: newExercises } : circuit
                            ),
                        });
                    }}
                />
            );
        }, 0);
    };

    const handleDeleteExerciseFromCircuit = (circuitIndex: number, exerciseIndex: number) => {
        setWorkoutPlan({
            ...workoutPlan,
            circuits: workoutPlan.circuits.map((circuit, index) =>
                index === circuitIndex
                    ? { ...circuit, exercises: circuit.exercises.filter((_, i) => i !== exerciseIndex) }
                    : circuit
            ),
        });
    };

    const handleOpenEditExercise = (circuitIndex: number, exerciseIndex: number) => {
        showPopup(
            <EditExercisePopup
                initialExercise={workoutPlan.circuits[circuitIndex].exercises[exerciseIndex]}
                onClose={(updatedExercise) => handleCloseEditExercise(circuitIndex, exerciseIndex, updatedExercise)}
            />
        );
    };

    const handleCloseEditExercise = (circuitIndex: number, exerciseIndex: number, updatedExercise: ExercisePlan) => {
        setWorkoutPlan({
            ...workoutPlan,
            circuits: workoutPlan.circuits.map((circuit, index) =>
                index === circuitIndex
                    ? {
                          ...circuit,
                          exercises: circuit.exercises.map((exercise, i) =>
                              i === exerciseIndex
                                  ? {
                                        ...exercise,
                                        ...updatedExercise,
                                    }
                                  : exercise
                          ),
                      }
                    : circuit
            ),
        });
    };

    return (
        <div className="workout-create-page page-container">
            <h1>Create Workout</h1>

            <ContainerCard
                title="Generate Workout"
                description="Select a muscle group to generate a random workout"
                content={
                    <span className="card-row">
                        <select
                            className="left expanding"
                            onChange={(e) => {
                                setSelectedMuscleGroup(e.target.value);
                            }}
                            value={selectedMuscleGroup}
                        >
                            <option value="Back">Back</option>
                            <option value="Biceps">Biceps</option>
                            <option value="Chest">Chest</option>
                            <option value="Legs">Legs</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Triceps">Triceps</option>
                            <option value="Abs">Abs</option>
                            <option value="Obliques">Obliques</option>
                        </select>
                        <button
                            className="right"
                            onClick={() => {
                                const randomWorkout = generateRandomWorkout(
                                    selectedMuscleGroup as MuscleGroup,
                                    selectedEquipment
                                );
                                // Set the workout plan state to the random workout
                                setWorkoutPlan(randomWorkout);
                            }}
                        >
                            Generate
                            <LuSparkles />
                        </button>
                    </span>
                }
            />

            <h1> Workout Preview </h1>

            <div className="card-content">
                <div className="workout-preview-container">
                    {/* Iterate over each circuit */}
                    {workoutPlan.circuits.map((circuit, circuitIndex) => (
                        <React.Fragment key={circuitIndex}>
                            <div className="circuit-container">
                                <div className="circuit-header">
                                    Circuit {circuitIndex + 1}
                                    <button
                                        className="exercise-delete-button icon caution"
                                        onClick={() => handleDeleteCircuit(circuitIndex)}
                                    >
                                        <LuTrash />
                                    </button>
                                </div>
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
                                                        {exercise.exercise ? exercise.exercise : "No exercise selected"}
                                                    </div>
                                                    <div className="exercise-reps">
                                                        {exercise.reps.length > 0
                                                            ? `${exercise.reps.join(", ")} Reps`
                                                            : "No reps selected"}
                                                    </div>
                                                </div>
                                                <span className="exercise-edit-buttons">
                                                    <button
                                                        className="exercise-edit-button icon"
                                                        onClick={() =>
                                                            handleOpenEditExercise(circuitIndex, exerciseIndex)
                                                        }
                                                    >
                                                        <LuPencil />
                                                    </button>
                                                    <button
                                                        className="exercise-delete-button icon caution"
                                                        onClick={() =>
                                                            handleDeleteExerciseFromCircuit(circuitIndex, exerciseIndex)
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
                                        className="icon"
                                        onClick={() => handleAddExerciseToCircuit(circuitIndex)}
                                    >
                                        <LuPlus />
                                    </button>
                                </div>
                                <div className="circuit-rep-index">{handleRepTag(circuitIndex)}</div>
                            </div>

                            {circuitIndex < workoutPlan.circuits.length - 1 && (
                                <div className="circuit-divider">
                                    <div className="circuit-divider-text">Move to next circuit</div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    <div className="add-circuit-button-container">
                        <button
                            className="add-circuit-button"
                            onClick={handleAddCircuit}
                        >
                            Add Circuit <LuPlus />
                        </button>
                    </div>
                </div>
            </div>

            <h1>Manage Workouts</h1>
            <div className="card">
                <div className="card-header">
                    <h2>Save Current Plan</h2>
                    <p>Save your workout</p>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCreatePage;
