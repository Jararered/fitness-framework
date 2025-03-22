import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useContainer } from "../context/ContainerContext";

import "../styles/components/ContainerFooter.css";

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

    return (
        <div className={`container-footer ${isOpen ? "open" : ""} ${isFooterClosing ? "closing" : ""}`}>
            <div className="container-footer-inner">
                {onClose && (
                    <IoMdCloseCircle
                        className="container-footer-close-icon"
                        size={24}
                        onClick={handleClose}
                    />
                )}
                <div className="container-footer-content">{content}</div>
            </div>
        </div>
    );
};

export default ContainerFooter;
