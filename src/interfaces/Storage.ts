import { useState, useEffect } from "react";

export const Keys = {
    Equipment: "equipment",
    Exercises: "exercises",
    TimingSettings: "timing-settings",
    UserSettings: "user-settings",
    Workout: "workout",
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