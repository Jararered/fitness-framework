import { EXERCISES_BY_MUSCLE_GROUP } from "../features/exercises/types/exercise.types.ts";

import { CircuitPlan, ExercisePlan, WorkoutPlan, MuscleGroup, Equipment } from "./types.ts";

const BACK_EQUIPMENT: Equipment[] = [
  "Barbell",
  "Cable Machine",
  "Dumbbells",
  "Lat Pulldown Machine",
  "Pullup Bar",
  "Smith Machine",
];

const BICEPS_EQUIPMENT: Equipment[] = ["Cable Machine", "Dumbbells", "EZ Bar"];

const CHEST_EQUIPMENT: Equipment[] = ["Barbell", "Cable Machine", "Chest Press Machine", "Dumbbells", "Smith Machine"];

const LEGS_EQUIPMENT: Equipment[] = [
  "Barbell",
  "Dumbbells",
  "Leg Curl Machine",
  "Leg Extension Machine",
  "Leg Press Machine",
  "Smith Machine",
];

const SHOULDERS_EQUIPMENT: Equipment[] = [
  "Barbell",
  "Cable Machine",
  "Chest Press Machine",
  "Dumbbells",
  "Smith Machine",
];

const TRICEPS_EQUIPMENT: Equipment[] = ["Barbell", "Cable Machine", "Dumbbells", "EZ Bar", "Smith Machine"];

const ABS_EQUIPMENT: Equipment[] = ["Cable Machine", "Dumbbells", "Pullup Bar", "Pullup Bar"];

const OBLIQUES_EQUIPMENT: Equipment[] = ["Cable Machine", "Dumbbells", "Pullup Bar"];

const EQUIPMENT_LIST: { [key in MuscleGroup]: { equipment: Equipment[] } } = {
  Back: {
    equipment: BACK_EQUIPMENT,
  },
  Biceps: {
    equipment: BICEPS_EQUIPMENT,
  },
  Chest: {
    equipment: CHEST_EQUIPMENT,
  },
  Legs: {
    equipment: LEGS_EQUIPMENT,
  },
  Shoulders: {
    equipment: SHOULDERS_EQUIPMENT,
  },
  Triceps: {
    equipment: TRICEPS_EQUIPMENT,
  },
  Abs: {
    equipment: ABS_EQUIPMENT,
  },
  Obliques: {
    equipment: OBLIQUES_EQUIPMENT,
  },
};

const repsChangeAmount = 2;

const calculateRepsArray = (sets: number, baseReps: number, style: "drop" | "flat"): number[] => {
  let newReps: number[] = [];

  // If the style is drop, make sure the baseReps is above 10
  if (style === "drop" && baseReps < 10) {
    baseReps = 10;
  }

  if (style === "flat") {
    newReps = Array(sets).fill(baseReps);
  } else if (style === "drop") {
    newReps = [baseReps];
    for (let i = 1; i < sets; i++) {
      const nextRep = Math.max(newReps[i - 1] - repsChangeAmount, 1);
      newReps.push(nextRep);
    }
  }

  return newReps;
};

const generateRandomEquipment = (muscleGroup: MuscleGroup, availableEquipment: Equipment[]): Equipment => {
  // Filter the available equipment by the muscle group
  const filteredEquipment = availableEquipment.filter((equipment) =>
    EQUIPMENT_LIST[muscleGroup].equipment.includes(equipment)
  );

  // Return a random equipment from the filtered equipment array
  return filteredEquipment[Math.floor(Math.random() * filteredEquipment.length)];
};

const generateRandomSetCount = (): number => {
  // Generate a random number between 3 and 5
  return Math.floor(Math.random() * 3) + 3;
};

const generateRandomExerciseCount = (): number => {
  // Generate a random number between 1 and 5
  return Math.floor(Math.random() * 4) + 1;
};

const generateRandomCircuitCount = (): number => {
  // Generate a random number between 3 and 5
  return Math.floor(Math.random() * 3) + 3;
};

export const generateRandomExercise = (
  muscleGroup: MuscleGroup,
  equipment: Equipment,
  setCount: number
): ExercisePlan => {
  // console.log("Muscle Group: ", muscleGroup);
  // console.log("Equipment: ", equipment);
  // Filter exercises by muscle group
  const filteredExercises = EXERCISES_BY_MUSCLE_GROUP[muscleGroup].filter(
    (exercise) => exercise.muscle_group.includes(muscleGroup) && exercise.required_equipment.includes(equipment)
  );
  // console.log("Filtered Exercises: ", JSON.stringify(filteredExercises));

  // Select a random exercise from the filtered list
  const randomExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];

  // Generate an even random number between 6 and 14
  let randomBaseReps = Math.floor(Math.random() * 8) + 6;
  if (randomBaseReps % 2 !== 0) {
    randomBaseReps += 1;
  }

  // Generate a random number between 0 and 1
  const randomStyle = Math.random() < 0.5 ? "drop" : "flat";

  const repsArray = calculateRepsArray(setCount, randomBaseReps, randomStyle);

  return {
    exercise: randomExercise.exercise_name,
    reps: repsArray,
    sets: setCount,
    style: randomStyle,
    baseReps: randomBaseReps,
  };
};

// Each circuit should use the same number of sets per exercise
export const generateRandomCircuit = (muscleGroup: MuscleGroup, availableEquipment: Equipment[]): CircuitPlan => {
  // Generate random equipment for the circuit
  const equipment = generateRandomEquipment(muscleGroup, availableEquipment);

  // Generate a random number of exercises
  const exerciseCount = generateRandomExerciseCount();

  // Generate a random number of sets per exercise
  const setCount = generateRandomSetCount();

  // Generate an array of exercises
  const exercises = Array.from({ length: exerciseCount }, () =>
    generateRandomExercise(muscleGroup, equipment, setCount)
  );

  // Remove duplicates from the exercises array
  const uniqueExercises = exercises.filter(
    (exercise, index, self) => self.findIndex((t) => t.exercise === exercise.exercise) === index
  );

  // Return the circuit with the exercises
  return {
    exercises: uniqueExercises,
  };
};

export const generateRandomWorkout = (muscleGroup: MuscleGroup, availableEquipment: Equipment[]): WorkoutPlan => {
  // Generate a random number of circuits
  const circuitCount = generateRandomCircuitCount();

  const equipmentForMuscleGroup = EQUIPMENT_LIST[muscleGroup].equipment;

  const avaliableExercises = EXERCISES_BY_MUSCLE_GROUP[muscleGroup];
  // Filter the exercises by equipment for each exercise
  const avaliableExercisesWithEquipment = avaliableExercises.filter((exercise) =>
    exercise.required_equipment.some((equipment) => equipmentForMuscleGroup.includes(equipment as Equipment))
  );
  const avaliableExerciseCount = avaliableExercisesWithEquipment.length;

  console.log("Number of available exercises: ", avaliableExerciseCount);
  console.log("Available exercises: ", JSON.stringify(avaliableExercisesWithEquipment));

  return {
    circuits: Array.from({ length: circuitCount }, () => generateRandomCircuit(muscleGroup, availableEquipment)),
  };
};
