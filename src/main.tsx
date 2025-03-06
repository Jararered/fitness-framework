import ReactDOM from "react-dom/client";
import React from "react";
import { WorkoutProvider } from "./context/WorkoutContext.tsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import "./styles/global.css";
import "./styles/utilities.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WorkoutProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </WorkoutProvider>
    </React.StrictMode>
);