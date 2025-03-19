import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "../styles/components/FooterCard.css";

interface FooterCardProps {
    isVisible: boolean;
    content: React.ReactNode;
    onClose?: () => void;
}

const FooterCard: React.FC<FooterCardProps> = ({ isVisible, content, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="footer-card">
            <div className="footer-card-inner">
                {onClose && <IoMdCloseCircle className="footer-card-close-icon" size={24} onClick={onClose} />}
                <div className="footer-card-content">{content}</div>
            </div>
        </div>
    );
};

export default FooterCard;
