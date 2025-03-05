import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { WorkoutProvider } from "./context/WorkoutContext.tsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WorkoutProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </WorkoutProvider>
    </React.StrictMode>
);