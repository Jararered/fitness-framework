import React from "react";
import { LuX } from "react-icons/lu";

import { useContainer } from "../../../context/ContainerContext.tsx";

import "./ContainerPopup.css";

interface ContainerPopupProps {
    isOpen: boolean;
    content: React.ReactNode;
    onClose: () => void;
}

const ContainerPopup = ({ isOpen, content, onClose }: ContainerPopupProps) => {
    const { isPopupClosing } = useContainer();

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={`popup-container ${isOpen ? "visible" : "hidden"} ${isPopupClosing ? "hidden" : ""}`}>
            <div className="popup-container-content">{content}</div>
            <button
                className="popup-container-close-button icon caution"
                onClick={handleClose}
            >
                <LuX />
            </button>
        </div>
    );
};

export default ContainerPopup;
