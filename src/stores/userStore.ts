import { create } from "zustand";
import { persist, devtools, StorageValue } from "zustand/middleware";
import { z } from "zod";

// Zod validation schema
const SettingsSchema = z.object({
    name: z.string(),
    weight: z.number().min(0),
    height: z.number().min(0),
    unit: z.enum(["imperial", "metric"]),
    weightUnit: z.enum(["lbs", "kg"]),
    darkMode: z.boolean(),
    quoteMode: z.enum(["gentle", "moderate", "hardcore", "xxx"]),
});

export type Settings = z.infer<typeof SettingsSchema>;

interface UserStore {
    settings: Settings;
    setSettings: (settings: Settings | ((prev: Settings) => Settings)) => void;
}

const isDevelopment = import.meta.env.MODE === "development";

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                settings: {
                    name: "",
                    weight: 0,
                    height: 0,
                    unit: "imperial",
                    weightUnit: "lbs",
                    darkMode: true,
                    quoteMode: "moderate",
                },
                setSettings: (settings) =>
                    set((state) => ({
                        settings: typeof settings === "function" ? settings(state.settings) : settings,
                    })),
            }),
            {
                name: "fitness-user-store",
                storage: {
                    getItem: (name): StorageValue<UserStore> | null => {
                        const str = localStorage.getItem(name);
                        if (!str) return null;

                        try {
                            const parsed = JSON.parse(str);
                            // Validate with Zod
                            SettingsSchema.parse(parsed.state.settings);
                            return parsed;
                        } catch (error) {
                            console.error("Invalid user settings in localStorage:", error);
                            
                            // Show toast notification if in browser
                            if (typeof window !== "undefined") {
                                console.warn("User settings have been reset due to invalid data");
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
            name: "UserStore",
            enabled: isDevelopment,
        }
    )
);
