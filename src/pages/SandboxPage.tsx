import React from "react";

// This is a file for testing and developing new features
// It is not used in the production build
// It is also not included in the production build

// Import the ContainerPopup component
import { useContainer } from "../context/ContainerContext.tsx";

const SandboxPage: React.FC = () => {
    const { showPopup, showFooterCard, addToast } = useContainer();

    const ToastExample = "Test Toast";
    const ToastType = "success";

    const ContentPopupExample = () => {
        return (
            <div className="card-content">
                <h1>Popup</h1>
                <p style={{ fontStyle: "italic" }}>This is a popup which is a card that slides up from the bottom of the screen</p>
                <p style={{ fontStyle: "italic" }}>It has a close button which is a circle with an X in the center</p>
                <p style={{ fontStyle: "italic" }}>It has a content area which is the main content of the page</p>
                <p style={{ fontStyle: "italic" }}>It has a button to add a toast</p>
                <button onClick={() => addToast(ToastExample, ToastType)}>Add Toast</button>
            </div>
        );
    };

    const ContentFooterExample = () => {
        return (
            <div className="card-content">
                <h1>Footer</h1>
                <p style={{ fontStyle: "italic" }}>This is a footer which is a card that slides up from the bottom of the screen</p>
                <p style={{ fontStyle: "italic" }}>It has a close button which is a circle with an X in the center</p>
                <p style={{ fontStyle: "italic" }}>It has a content area which is the main content of the page</p>
                <p style={{ fontStyle: "italic" }}>It has a button to add a toast</p>
                <button onClick={() => addToast(ToastExample, ToastType)}>Add Toast</button>
            </div>
        );
    };

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
