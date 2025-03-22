import React, { useEffect } from "react";
import { LuX } from "react-icons/lu";

import { useContainer } from "../context/ContainerContext";

import "../styles/components/ContainerPopup.css";

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

    // useEffect(() => {
    //     if (isPopupClosing) {
    //         setTimeout(() => {
    //             onClose();
    //         }, 250);
    //     }
    // }, [isPopupClosing]);

    return (
        <div className={`container-popup ${isOpen ? "open" : ""} ${isPopupClosing ? "closing" : ""}`}>
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
