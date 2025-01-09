import { useState, useEffect } from 'react';

export const Keys = {
    UserSettings: "user-settings",
    TimingSettings: "timing-settings",
    Exercises: "exercises",
    Equipment: "equipment",
    Workout: "workout",
}

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;