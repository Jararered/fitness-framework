import React, { useEffect, useState } from "react";

import { LuCirclePlus, LuCircleMinus } from "react-icons/lu";

// This is a file for testing and developing new features
// It is not used in the production build
// It is also not included in the production build

// Import the ContainerPopup component
import { useContainerStore } from "../stores/containerStore";

const ToastExample = "Test Toast";
const ToastType = "success";

const ContentPopupExample = () => {
    const { addToast } = useContainerStore();

    return (
        <div className="card-content">
            <h1>Popup</h1>
            <p style={{ fontStyle: "italic" }}>
                This is a popup which is a card that slides up from the bottom of the screen
            </p>
            <p style={{ fontStyle: "italic" }}>It has a close button which is a circle with an X in the center</p>
            <p style={{ fontStyle: "italic" }}>It has a content area which is the main content of the page</p>
            <p style={{ fontStyle: "italic" }}>It has a button to add a toast</p>
            <button onClick={() => addToast(ToastExample, ToastType)}>Add Toast</button>
        </div>
    );
};

const ContentFooterExample = () => {
    const { addToast } = useContainerStore();

    return (
        <div className="card-content">
            <h1>Footer</h1>
            <p style={{ fontStyle: "italic" }}>
                This is a footer which is a card that slides up from the bottom of the screen
            </p>
            <p style={{ fontStyle: "italic" }}>It has a close button which is a circle with an X in the center</p>
            <p style={{ fontStyle: "italic" }}>It has a content area which is the main content of the page</p>
            <p style={{ fontStyle: "italic" }}>It has a button to add a toast</p>
            <button onClick={() => addToast(ToastExample, ToastType)}>Add Toast</button>
        </div>
    );
};

const SandboxPage: React.FC = () => {
    const { showPopup, hidePopup, showFooterCard, addToast } = useContainerStore();

    const [number, setNumber] = useState(0);

    // Modified to handle popup closure with updated value
    const handleShowStatePopup = () => {
        // Create a close handler that will update the main page state
        const handleClose = (updatedNumber: number) => {
            setNumber(updatedNumber);
            hidePopup();
        };

        showPopup(
            <StatePopup
                initialNumber={number}
                onClose={handleClose}
            />
        );
    };

    return (
        <div className="sandbox-page">
            <h1>Sandbox</h1>
            <div className="card">
                <div className="card-header">
                    <h2>Container Tests</h2>
                    <p>This is a sandbox page for testing and developing new features</p>
                </div>
                <div className="card-content">
                    <button onClick={() => showPopup(<ContentPopupExample />)}>Show Popup</button>
                    <button onClick={() => showFooterCard(<ContentFooterExample />)}>Show Footer Card</button>
                    <button onClick={() => addToast(ToastExample, ToastType)}>Add Toast</button>
                </div>

                <hr />

                <div className="card-header">
                    <h2>State Test</h2>
                </div>

                <div className="card-content">
                    <span className="card-row">
                        <button
                            className="icon"
                            onClick={() => setNumber(number + 1)}
                        >
                            <LuCirclePlus />
                        </button>
                        <button
                            className="icon"
                            onClick={() => setNumber(number - 1)}
                        >
                            <LuCircleMinus />
                        </button>
                    </span>

                    <button onClick={handleShowStatePopup}>Show State Test</button>

                    <p>{number}</p>
                </div>
            </div>
        </div>
    );
};

type StatePopupProps = {
    initialNumber: number;
    onClose: (updatedNumber: number) => void;
};

// Modified StatePopup to have its own state and update parent on close
const StatePopup = ({ initialNumber, onClose }: StatePopupProps) => {
    const [number, setNumber] = useState<number>(initialNumber);

    console.log("Initial number");
    console.log(initialNumber);

    // Update the internal state when initialNumber prop changes
    useEffect(() => {
        setNumber(initialNumber);
    }, [initialNumber]);

    // Handler to close popup and update parent state
    const handleClose = () => {
        onClose(number);
    };

    return (
        <div className="card-content">
            <h2>State Test</h2>
            <p style={{ fontStyle: "italic" }}>This is a test of the state of the container</p>

            <p>
                The number is: <strong>{number}</strong>
            </p>

            <span className="card-row">
                <button
                    className="icon"
                    onClick={() => setNumber(number + 1)}
                >
                    <LuCirclePlus />
                </button>
                <button
                    className="icon"
                    onClick={() => setNumber(number - 1)}
                >
                    <LuCircleMinus />
                </button>
            </span>

            <button onClick={handleClose}>Save and Close</button>
        </div>
    );
};

export default SandboxPage;
