import React from "react";
import "../styles/components/Toast.css";
import { useToast } from "../context/ToastContext";

interface ToastProps {
    toast: {
        id: number;
        message: string;
        type: "success" | "error" | "info";
        isExiting?: boolean;
    };
    removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, removeToast }) => {
    const { startToastExit } = useToast();

    const handleRemove = () => {
        startToastExit(toast.id);
    };

    return (
        <div className={`toast toast-${toast.type} ${toast.isExiting ? 'toast-exiting' : ''}`}>
            <span>{toast.message}</span>
            <button className="toast-close" onClick={handleRemove}>
                ×
            </button>
        </div>
    );
};

export default Toast;