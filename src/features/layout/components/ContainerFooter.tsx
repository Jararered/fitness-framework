import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { useContainer } from "../../../context/ContainerContext.tsx";

import "./ContainerFooter.css";

interface ContainerFooterProps {
    isOpen: boolean;
    content: React.ReactNode;
    onClose?: () => void;
}

const ContainerFooter: React.FC<ContainerFooterProps> = ({ isOpen, content, onClose }) => {
    const { isFooterClosing } = useContainer();

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    // If neither open nor closing, don't render to improve performance
    if (!isOpen && !isFooterClosing) {
        return null;
    }

    return (
        <div className={`footer-container ${isOpen ? "open" : ""} ${isFooterClosing ? "closing" : ""}`}>
            <div className="footer-container-inner">
                {onClose && (
                    <IoMdCloseCircle
                        className="footer-container-close-icon"
                        size={24}
                        onClick={handleClose}
                    />
                )}
                <div className="footer-container-content">{content}</div>
            </div>
        </div>
    );
};

export default ContainerFooter;
