import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Equipment } from "../types/equipment.types";
import { EXERCISES } from "../../exercises/types/exercise.types";

interface EquipmentConfig {
    name: string;
    equipment: Equipment[];
}

interface EquipmentStore {
    selectedEquipment: Equipment[];
    setSelectedEquipment: (selectedEquipment: Equipment[]) => void;
    equipmentConfigs: EquipmentConfig[];
    setEquipmentConfigs: (equipmentConfigs: EquipmentConfig[]) => void;
    allEquipment: Equipment[];
    toggleEquipment: (equipment: Equipment) => void;
}

export const useEquipmentStore = create<EquipmentStore>()(
    persist(
        (set) => ({
            selectedEquipment: [],
            setSelectedEquipment: (selectedEquipment: Equipment[]) => set({ selectedEquipment }),
            equipmentConfigs: [],
            setEquipmentConfigs: (equipmentConfigs: EquipmentConfig[]) => set({ equipmentConfigs }),

            allEquipment: [...new Set(EXERCISES.flatMap((ex) => ex.required_equipment))].sort(),
            toggleEquipment: (equipment: Equipment) =>
                set((state) => ({
                    selectedEquipment: state.selectedEquipment.includes(equipment)
                        ? state.selectedEquipment.filter((item) => item !== equipment)
                        : [...state.selectedEquipment, equipment],
                })),
        }),
        { name: "equipment-store" }
    )
);
