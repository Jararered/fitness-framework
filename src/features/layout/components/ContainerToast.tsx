import React from "react";
import { LuCheck, LuX, LuInfo } from "react-icons/lu";

import { useContainer } from "../../../context/ContainerContext.tsx";

import "./ContainerToast.css";

interface ToastProps {
    toast: {
        id: number;
        message: string;
        type: "success" | "error" | "info";
        isExiting?: boolean;
    };
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
    return (
        <div className={`toast toast-${toast.type} ${toast.isExiting ? "toast-exiting" : ""}`}>
            <span>{toast.message}</span>
            <div className="toast-icon">
                {toast.type === "success" ? <LuCheck /> : toast.type === "error" ? <LuX /> : <LuInfo />}
            </div>
        </div>
    );
};

const ContainerToast: React.FC = () => {
    const { contentToast } = useContainer();

    return (
        <div className="toast-container">
            {contentToast.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                />
            ))}
        </div>
    );
};

export default ContainerToast;
