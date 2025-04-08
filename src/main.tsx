import React from "react";
import ReactDOM from "react-dom/client";

import { ContainerProvider } from "./context/ContainerContext.tsx";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ContainerProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContainerProvider>
    </React.StrictMode>
);
