import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuChartNoAxesColumnDecreasing, LuAlignJustify } from "react-icons/lu";
import { LuPlus, LuMinus } from "react-icons/lu";

import { useUser } from "../context/UserContext.tsx";
import { useWorkout } from "../context/WorkoutContext.tsx";

import ThreeSpaceDiv from "../components/DividerSpaced.tsx";
import { SearchableSelector } from "../components/SearchableSelector.tsx";

import "../styles/pages/WorkoutCreationPage.css";

interface WorkoutPlan {
    exercise: string;
    reps: number[];
    baseReps: number;
    sets: number;
    style: "drop" | "flat";
}

const WorkoutCreationPage: React.FC = () => {
    const { exercises, workoutPlans, setWorkoutPlans, workoutState, setWorkoutState, } = useWorkout();
    const { equipmentConfigs, equipmentLast } = useUser();
    const navigate = useNavigate();

    const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan[]>([{
        exercise: "",
        reps: [10, 10, 10],
        baseReps: 10,
        sets: 3,
        style: "flat"
    }]);
    const [workoutName, setWorkoutName] = useState<string>("");
    const [loadedWorkout, setLoadedWorkout] = useState<string | null>(null);

    const repsChange = 2;

    const selectedEquipment =
        equipmentLast && equipmentConfigs.length > 0
            ? equipmentConfigs.find((config) => config.name === equipmentLast)?.equipment || []
            : [];

    const availableExercises = exercises.filter((exercise) =>
        exercise.required_equipment.every((equipment) => selectedEquipment.includes(equipment))
    );

    const avaliableExerciseNames = availableExercises.map((exercise) => exercise.exercise_name);

    // Load temporary workout plan from local storage
    useEffect(() => {
        const savedPlan = localStorage.getItem("temp-workout-plan");
        if (savedPlan) {
            setWorkoutPlan(JSON.parse(savedPlan));
        }
    }, []);

    // Save temporary workout plan to local storage if workoutPlan has changed
    useEffect(() => {
        localStorage.setItem("temp-workout-plan", JSON.stringify(workoutPlan));
    }, [workoutPlan]);

    const handleFormatReps = (reps: number[]) => {
        return reps.join(", ");
    };

    const handleSetsChange = (exerciseIndex: number, change: string) => {
        const newPlan = [...workoutPlan];
        let newSets = newPlan[exerciseIndex].sets;
        
        if (change === "increase") {
            newSets = newPlan[exerciseIndex].sets + 1;
        } else if (change === "decrease") {
            if (newPlan[exerciseIndex].sets > 1) {
                newSets = newPlan[exerciseIndex].sets - 1;
            } else {
                return;
            }
        }

        newPlan[exerciseIndex].sets = newSets;
        handleCalculateNewRepsArray(exerciseIndex);
        setWorkoutPlan(newPlan);
    };

    const handleChangeBaseReps = (exerciseIndex: number, change: string) => {
        const newPlan = [...workoutPlan];
        let newBaseReps = newPlan[exerciseIndex].baseReps;
        
        if (change === "increase") {
            newBaseReps = newPlan[exerciseIndex].baseReps + repsChange;
        } else if (change === "decrease") {
            if (newPlan[exerciseIndex].baseReps > 2) {
                newBaseReps = newPlan[exerciseIndex].baseReps - repsChange;
            } else {
                return;
            }
        }

        newPlan[exerciseIndex].baseReps = newBaseReps;
        handleCalculateNewRepsArray(exerciseIndex);
        setWorkoutPlan(newPlan);
    };

    const handleSetStyle = (exerciseIndex: number, newStyle: "drop" | "flat") => {
        const newPlan = [...workoutPlan];
        newPlan[exerciseIndex].style = newStyle;
        handleCalculateNewRepsArray(exerciseIndex);
        setWorkoutPlan(newPlan);
    };

    const handleCalculateNewRepsArray = (exerciseIndex: number) => {
        const newPlan = [...workoutPlan];
        const exercise = newPlan[exerciseIndex];

        if (exercise.style === "drop") {
            const dropSet = [exercise.baseReps];
            for (let i = 1; i < exercise.sets; i++) {
                dropSet.push(dropSet[i - 1] - repsChange);
            }
            exercise.reps = dropSet;
        } else if (exercise.style === "flat") {
            exercise.reps = Array(exercise.sets).fill(exercise.baseReps);
        }

        setWorkoutPlan(newPlan);
    };

    const handleAddExercise = () => {
        setWorkoutPlan([...workoutPlan, {
            exercise: "",
            reps: [10, 10, 10],
            baseReps: 10,
            sets: 3,
            style: "flat"
        }]);
        setLoadedWorkout(null);
    };

    const handleRemoveExercise = () => {
        if (workoutPlan.length > 1) {
            setWorkoutPlan(workoutPlan.slice(0, workoutPlan.length - 1));
            setLoadedWorkout(null);
        }
    };

    const handleSaveWorkout = (startWorkout: boolean = false) => {
        const validPlan = workoutPlan
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
        setWorkoutPlan(
            newPlan.map((p) => ({
                exercise: p.exercise,
                reps: p.reps,
                baseReps: p.reps[0],
                sets: p.reps.length,
                style: "flat"
            }))
        );
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
        const validPlan = workoutPlan
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
                {workoutPlan.map((p, exerciseIndex) => (
                    <div key={exerciseIndex}>
                        <h2>Exercise {exerciseIndex + 1}</h2>

                        <SearchableSelector
                            options={avaliableExerciseNames}
                            value={p.exercise}
                            getOptionLabel={(option) => option}
                            onChange={(value) => {
                                const newPlan = [...workoutPlan];
                                newPlan[exerciseIndex].exercise = value || "";
                                setWorkoutPlan(newPlan);
                                setLoadedWorkout(null);
                            }}
                        />

                        <div className="reps-container">
                            <p>{handleFormatReps(p.reps)} reps</p>
                        </div>

                        <ThreeSpaceDiv
                            left={<h3>Set Count</h3>}
                            right={
                                <span>
                                    <button className="adjust" onClick={() => handleSetsChange(exerciseIndex, "decrease")}>
                                        <LuMinus />
                                    </button>
                                    <button className="adjust" onClick={() => handleSetsChange(exerciseIndex, "increase")}>
                                        <LuPlus />
                                    </button>
                                </span>
                            }
                        />

                        <ThreeSpaceDiv
                            left={<h3>Rep Count</h3>}
                            right={
                                <span>
                                    <button className="adjust" onClick={() => handleChangeBaseReps(exerciseIndex, "decrease")}>
                                        <LuMinus />
                                    </button>
                                    <button className="adjust" onClick={() => handleChangeBaseReps(exerciseIndex, "increase")}>
                                        <LuPlus />
                                    </button>
                                </span>
                            }
                        />

                        <ThreeSpaceDiv
                            left={<h3>Set Style</h3>}
                            right={
                                <span>
                                    <button className="adjust" onClick={() => handleSetStyle(exerciseIndex, "flat")}>
                                        <LuAlignJustify className="flat-set-icon" />
                                    </button>
                                    <button className="adjust" onClick={() => handleSetStyle(exerciseIndex, "drop")}>
                                        <LuChartNoAxesColumnDecreasing className="drop-set-icon" />
                                    </button>
                                </span>
                            }
                        />

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
                                {exercise.exercise}: {handleFormatReps(exercise.reps)} reps
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