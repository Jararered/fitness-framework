import React, { createContext, useContext, useState, ReactNode } from "react";

interface FooterCardContextType {
    isVisible: boolean;
    content: ReactNode;
    showFooterCard: (content: ReactNode) => void;
    hideFooterCard: () => void;
}

const FooterCardContext = createContext<FooterCardContextType | undefined>(undefined);

export const useFooterCard = () => {
    const context = useContext(FooterCardContext);
    if (!context) {
        throw new Error("useFooterCard must be used within a FooterCardProvider");
    }
    return context;
};

export const FooterCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);

    const showFooterCard = (content: ReactNode) => {
        setContent(content);
        setIsVisible(true);
    };

    const hideFooterCard = () => {
        setIsVisible(false);
    };

    return (
        <FooterCardContext.Provider
            value={{
                isVisible,
                content,
                showFooterCard,
                hideFooterCard,
            }}
        >
            {children}
        </FooterCardContext.Provider>
    );
};
