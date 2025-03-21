import React, { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";

interface PopupContainerProps {
    isOpen: boolean;
    content: React.ReactNode;
    onClose: () => void;
}

const PopupContainer = ({ isOpen, content, onClose }: PopupContainerProps) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                onClose();
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [isClosing, onClose]);

    const handleClose = () => {
        setIsClosing(true);
    };

    return (
        <div className={`popup-container ${isOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}>
            <div className="popup-content">{content}</div>
            <button
                className="popup-close-button icon caution"
                onClick={handleClose}
            >
                <LuX />
            </button>
        </div>
    );
};

export { PopupContainer };

const TestPage: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="test-page">
            <div className="card">
                <div className="card-header">
                    <h1>Test Page</h1>
                </div>

                <div className="card-content">
                    <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>

                    {isPopupOpen && (
                        <PopupContainer
                            isOpen={isPopupOpen}
                            content={<div>Popup Content</div>}
                            onClose={() => setIsPopupOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestPage;
