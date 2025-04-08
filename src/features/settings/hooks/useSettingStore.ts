import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { QuoteMode } from "../../quotes/types/quotes.types";

export enum UnitSystem {
    Imperial = "imperial",
    Metric = "metric",
}

export enum WeightUnit {
    Lbs = "lbs",
    Kg = "kg",
}

interface SettingsStore {
    name: string;
    setName: (name: string) => void;
    weightInGrams: number;
    setWeightInGrams: (weightInGrams: number) => void;
    height: number;
    setHeight: (height: number) => void;
    unit: UnitSystem;
    setUnit: (unit: UnitSystem) => void;
    weightUnit: WeightUnit;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
    quoteMode: QuoteMode;
    setQuoteMode: (quoteMode: QuoteMode) => void;
}

export const useSettingStore = create<SettingsStore>()(
    persist(
        (set) => ({
            name: "",
            setName: (name: string) => set({ name }),
            weightInGrams: 0,
            setWeightInGrams: (weightInGrams: number) => set({ weightInGrams }),
            height: 0,
            setHeight: (height: number) => set({ height }),
            unit: UnitSystem.Imperial,
            setUnit: (unit: UnitSystem) => {
                set({ unit });
                set({ weightUnit: unit === UnitSystem.Imperial ? WeightUnit.Lbs : WeightUnit.Kg });
            },
            weightUnit: WeightUnit.Lbs,
            darkMode: true,
            setDarkMode: (darkMode: boolean) => set({ darkMode }),
            quoteMode: QuoteMode.MODERATE,
            setQuoteMode: (quoteMode: QuoteMode) => set({ quoteMode }),
        }),
        {
            name: "settings-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
