import { create } from "zustand";
import { persist, devtools, StorageValue } from "zustand/middleware";
import { z } from "zod";
import { Equipment } from "../data/types";

// Zod validation schema with strict Equipment enum
const EquipmentEnum = z.enum([
    "Barbell",
    "Cable Machine",
    "Chest Press Machine",
    "Dumbbells",
    "EZ Bar",
    "Decline Bench",
    "Incline Bench",
    "Flat Bench",
    "Lat Pulldown Machine",
    "Leg Curl Machine",
    "Leg Extension Machine",
    "Leg Press Machine",
    "Pullup Bar",
    "Smith Machine",
]);

const EquipmentConfigSchema = z.object({
    name: z.string(),
    equipment: z.array(EquipmentEnum),
});

const EquipmentStoreSchema = z.object({
    equipmentState: EquipmentConfigSchema,
    equipmentConfigs: z.array(EquipmentConfigSchema),
    equipmentLast: z.string(),
});

export type EquipmentConfig = {
    name: string;
    equipment: Equipment[];
};

interface EquipmentStore {
    equipmentState: EquipmentConfig;
    equipmentConfigs: EquipmentConfig[];
    equipmentLast: string;

    setEquipmentState: (state: EquipmentConfig) => void;
    setEquipmentConfigs: (configs: EquipmentConfig[]) => void;
    setEquipmentLast: (last: string) => void;
}

const isDevelopment = import.meta.env.MODE === "development";

export const useEquipmentStore = create<EquipmentStore>()(
    devtools(
        persist(
            (set) => ({
                equipmentState: { name: "", equipment: [] },
                equipmentConfigs: [],
                equipmentLast: "",

                setEquipmentState: (state) => set({ equipmentState: state }),
                setEquipmentConfigs: (configs) => set({ equipmentConfigs: configs }),
                setEquipmentLast: (last) => set({ equipmentLast: last }),
            }),
            {
                name: "fitness-equipment-store",
                storage: {
                    getItem: (name): StorageValue<EquipmentStore> | null => {
                        const str = localStorage.getItem(name);
                        if (!str) return null;

                        try {
                            const parsed = JSON.parse(str);
                            // Validate with Zod
                            EquipmentStoreSchema.parse(parsed.state);
                            return parsed;
                        } catch (error) {
                            console.error("Invalid equipment data in localStorage:", error);
                            
                            // Show toast and log
                            if (typeof window !== "undefined") {
                                console.warn("Equipment configuration has been reset due to invalid data");
                            }
                            
                            localStorage.removeItem(name);
                            return null;
                        }
                    },
                    setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
                    removeItem: (name) => localStorage.removeItem(name),
                },
            }
        ),
        {
            name: "EquipmentStore",
            enabled: isDevelopment,
        }
    )
);
