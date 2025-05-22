import { create } from "zustand";

import { useEquipmentStore } from "../../equipment/hooks/useEquipmentStore";

import { EXERCISES, Exercise } from "../types/exercise.types";

interface ExerciseStore {
  exercises: Exercise[];
  availableExercises: Exercise[];
}

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: EXERCISES,
  availableExercises: [],
}));
