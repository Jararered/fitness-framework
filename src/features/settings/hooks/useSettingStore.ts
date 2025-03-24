import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsStore {
    name: string;
    setName: (name: string) => void;
    weight: number;
    setWeight: (weight: number) => void;
    height: number;
    setHeight: (height: number) => void;
    unit: "imperial" | "metric";
    setUnit: (unit: "imperial" | "metric") => void;
    weightUnit: "lbs" | "kg";
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    quoteMode: "gentle" | "moderate" | "hardcore" | "xxx";
    setQuoteMode: (quoteMode: "gentle" | "moderate" | "hardcore" | "xxx") => void;
}

export const useSettingStore = create<SettingsStore>()(
    persist(
        (set) => ({
            name: "",
            setName: (name: string) => set({ name }),
            weight: 0,
            setWeight: (weight: number) => set({ weight }),
            height: 0,
            setHeight: (height: number) => set({ height }),
            unit: "imperial",
            setUnit: (unit: "imperial" | "metric") => {
                set({ unit });
                set({ weightUnit: unit === "imperial" ? "lbs" : "kg" });
            },
            weightUnit: "lbs",
            darkMode: true,
            setDarkMode: (darkMode: boolean) => set({ darkMode }),
            quoteMode: "moderate",
            setQuoteMode: (quoteMode: "gentle" | "moderate" | "hardcore" | "xxx") => set({ quoteMode }),
        }),
        {
            name: "settings-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
