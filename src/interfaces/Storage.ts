import { useState, useEffect } from "react";

export const Keys = {
    Equipment: "equipment", // All Equipment toggles
    Exercises: "exercises", // All exercises and their equipment requirements
    TimingSettings: "timing-settings", // Rest times
    UserSettings: "user-settings", // User name, weight, units
    Workout: "workout", // Active loaded workout
    WorkoutPlan: "workout-plan", // Active workout plan
    WorkoutLog: "workout-log", // Completed workouts
    SavedWorkouts: "saved-workouts", // Saved workouts
    SavedGyms: "saved-gyms", // Saved gyms
    Theme: "theme", // Dark or Light theme
}

function LocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default LocalStorage;