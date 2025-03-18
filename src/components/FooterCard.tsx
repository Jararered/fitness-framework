import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IoMdCloseCircle } from "react-icons/io";

import "../styles/components/FooterCard.css";

interface FooterCardProps {
    isVisible: boolean;
    content: React.ReactNode;
    onClose?: () => void;
}

const FooterCard: React.FC<FooterCardProps> = ({
    isVisible,
    content,
    onClose,
}) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            in={isVisible}
            timeout={300}
            classNames="footer-card"
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                className={`footer-card`}
            >
                <div className={`footer-card-inner`}>
                    <div className="footer-card-content">
                        {content}
                    </div>

                    {onClose && (
                        <IoMdCloseCircle className="footer-card-close" size={24} onClick={onClose} />
                    )}
                </div>
            </div>
        </CSSTransition>
    );
};

export default FooterCard; 