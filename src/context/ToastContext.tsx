// context/ToastContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
    duration?: number; // in milliseconds
    isExiting?: boolean;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type: "success" | "error" | "info", duration?: number) => void;
    removeToast: (id: number) => void;
    startToastExit: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: "success" | "error" | "info", duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);

        // Start the exit animation after the duration
        setTimeout(() => startToastExit(id), duration);
    };

    const startToastExit = (id: number) => {
        // Mark the toast as exiting to trigger animation
        setToasts(prev =>
            prev.map(toast =>
                toast.id === id ? { ...toast, isExiting: true } : toast
            )
        );

        // Remove the toast after animation completes
        setTimeout(() => {
            removeToast(id);
        }, 500); // Match this with the CSS animation duration
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, startToastExit }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};