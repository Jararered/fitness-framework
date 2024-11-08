// src/storage.ts

// Define the keys we'll use for localStorage
const LOCAL_STORAGE_KEYS = {
    RECENT_WORKOUTS: 'recentWorkouts',
    WORKOUT: 'workout',
};

// Save data to localStorage
export function saveToLocalStorage<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving data to localStorage key "${key}":`, error);
    }
}

// Load data from localStorage
export function loadFromLocalStorage<T>(key: string): T | null {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error loading data from localStorage key "${key}":`, error);
        return null;
    }
}

// Remove data from localStorage
export function removeFromLocalStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing data from localStorage key "${key}":`, error);
    }
}

// Specific functions for MuscleMe app data
export function saveRecentWorkouts(workouts: any[]): void {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.RECENT_WORKOUTS, workouts);
}

export function loadRecentWorkouts(): any[] | null {
    return loadFromLocalStorage<any[]>(LOCAL_STORAGE_KEYS.RECENT_WORKOUTS);
}

export function saveRoutine(workout: any[]): void {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.WORKOUT, workout);
}

export function loadRoutine(): any[] | null {
    return loadFromLocalStorage<any[]>(LOCAL_STORAGE_KEYS.WORKOUT);
}
