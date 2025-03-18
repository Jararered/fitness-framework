import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { WorkoutProvider } from "./context/WorkoutContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { EquipmentProvider } from "./context/EquipmentContext.tsx";

import App from "./App.tsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WorkoutProvider>
            <EquipmentProvider>
                <ToastProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ToastProvider>
            </EquipmentProvider>
        </WorkoutProvider>
    </React.StrictMode>
);