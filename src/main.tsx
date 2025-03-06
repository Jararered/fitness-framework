import ReactDOM from "react-dom/client";
import React from "react";
import { WorkoutProvider } from "./context/WorkoutContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WorkoutProvider>
            <ToastProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ToastProvider>
        </WorkoutProvider>
    </React.StrictMode>
);