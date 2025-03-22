import React from "react";

// This is a file for testing and developing new features
// It is not used in the production build
// It is also not included in the production build

// Import the ContainerPopup component
import { useContainer } from "../context/ContainerContext.tsx";

const ToastExample = "Test Toast";
const ToastType = "success";

const ContentPopupExample = () => {
    return (
        <div>
            <h1>Popup</h1>
        </div>
    );
};

const ContentFooterExample = () => {
    return (
        <div>
            <h1>Footer</h1>
        </div>
    );
};

const SandboxPage: React.FC = () => {
    const { showPopup, showFooterCard, addToast } = useContainer();

    return (
        <div className="sandbox-page">
            <div className="card">
                <div className="card-header">
                    <h1>Sandbox</h1>
                </div>
                <div className="card-content">
                    <button onClick={() => showPopup(<ContentPopupExample />)}>Show Popup</button>
                    <button onClick={() => showFooterCard(<ContentFooterExample />)}>Show Footer Card</button>
                    <button onClick={() => addToast(ToastExample, ToastType)}>Add Toast</button>
                </div>
            </div>
        </div>
    );
};

export default SandboxPage;
