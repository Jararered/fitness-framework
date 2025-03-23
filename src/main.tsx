import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { WorkoutProvider } from "./context/WorkoutContext.tsx";
import { EquipmentProvider } from "./context/EquipmentContext.tsx";
import { ContainerProvider } from "./context/ContainerContext.tsx";

import App from "./App.tsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ContainerProvider>
            <WorkoutProvider>
                <EquipmentProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </EquipmentProvider>
            </WorkoutProvider>
        </ContainerProvider>
    </React.StrictMode>
);
