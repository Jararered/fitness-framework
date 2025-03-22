import React, { useEffect } from "react";
import { LuX } from "react-icons/lu";

import "../styles/components/ContainerPopup.css";
import { useContainer } from "../context/ContainerContext";

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
        <div className={`container-popup ${isOpen ? "open" : ""}${isPopupClosing ? "closing" : ""}`}>
            <div className="container-popup-content">{content}</div>
            <button
                className="container-popup-close-button icon caution"
                onClick={handleClose}
            >
                <LuX />
            </button>
        </div>
    );
};

export default ContainerPopup;
