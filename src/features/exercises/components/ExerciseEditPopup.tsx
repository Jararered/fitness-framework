import { useEffect, useState } from "react";

import { LuSave, LuMinus, LuChartNoAxesColumnDecreasing, LuAlignJustify, LuPlus } from "react-icons/lu";

import { SelectorSearchable } from "../../layout/components/SelectorSearchable";

import { useContainer } from "../../../context/ContainerContext";

import { useEquipmentStore } from "../../equipment/hooks/useEquipmentStore";
import { useExerciseStore } from "../hooks/useExerciseStore";

import { ExercisePlan } from "../../../data/types";

const REPS_STEP = 2;

interface ExercisePlanEditPopupProps {
    exercisePlan: ExercisePlan;
    onClose: (updatedExercise: ExercisePlan) => void;
}

const ExercisePlanEditPopup = ({ exercisePlan: initialExercise, onClose }: ExercisePlanEditPopupProps) => {
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
                const nextRep = Math.max(newReps[i - 1] - REPS_STEP, 1);
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
            newBaseReps = exercise.baseReps + REPS_STEP;
        } else if (change === "decrease") {
            if (exercise.baseReps > REPS_STEP) {
                newBaseReps = exercise.baseReps - REPS_STEP;
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
                        <LuMinus size={20} />
                    </button>
                    <button
                        className="icon"
                        onClick={() => handleSetsChange("increase")}
                    >
                        <LuPlus size={20} />
                    </button>
                </span>
                <span className="card-row">
                    <label className="left">Rep Count</label>
                    <button
                        className="icon"
                        onClick={() => handleChangeBaseReps("decrease")}
                    >
                        <LuMinus size={20} />
                    </button>
                    <button
                        className="icon"
                        onClick={() => handleChangeBaseReps("increase")}
                    >
                        <LuPlus size={20} />
                    </button>
                </span>

                <span className="card-row">
                    <label className="left">Set Style</label>
                    <button
                        className="icon"
                        onClick={() => handleSetStyle("flat")}
                    >
                        <LuAlignJustify
                            size={20}
                            style={{ transform: "rotate(90deg)" }}
                        />
                    </button>
                    <button
                        className="icon"
                        onClick={() => handleSetStyle("drop")}
                    >
                        <LuChartNoAxesColumnDecreasing size={20} />
                    </button>
                </span>

                <button
                    className="save-exercise-button"
                    onClick={handleClose}
                >
                    Save <LuSave size={20} />
                </button>
            </div>
        </div>
    );
};

export { ExercisePlanEditPopup };
