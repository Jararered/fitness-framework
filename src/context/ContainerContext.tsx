import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
    duration?: number; // in milliseconds
    isExiting?: boolean;
}

interface ContainerContextType {
    isFooterOpen: boolean;
    isPopupOpen: boolean;
    contentFooter: ReactNode;
    contentPopup: ReactNode;
    contentToast: Toast[];
    isFooterClosing: boolean;
    isPopupClosing: boolean;
    showFooterCard: (content: ReactNode) => void;
    hideFooterCard: () => void;
    showPopup: (content: ReactNode) => void;
    hidePopup: () => void;
    addToast: (message: string, type: "success" | "error" | "info", duration?: number) => void;
    showToast: (message: string, type: "success" | "error" | "info") => void;
    hideToast: () => void;
}

const ContainerContext = createContext<ContainerContextType | undefined>(undefined);

export const useContainer = () => {
    const context = useContext(ContainerContext);
    if (!context) {
        throw new Error("useContainer must be used within a ContainerProvider");
    }
    return context;
};

export const ContainerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isFooterOpen, setIsFooterOpen] = useState(false);
    const [isFooterClosing, setIsFooterClosing] = useState(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupClosing, setIsPopupClosing] = useState(false);

    const [contentFooter, setContentFooter] = useState<ReactNode>(null);
    const [contentPopup, setContentPopup] = useState<ReactNode>(null);
    const [contentToast, setContentToast] = useState<Toast[]>([]);

    // Reset closing state when popup is fully closed
    // useEffect(() => {
    //     if (isPopupClosing) {
    //         const timer = setTimeout(() => {
    //             setIsPopupClosing(false);
    //         }, 250);
    //         return () => clearTimeout(timer);
    //     }
    // }, [isPopupClosing]);

    // Reset closing state when footer is fully closed
    useEffect(() => {
        if (isFooterClosing) {
            const timer = setTimeout(() => {
                setIsFooterClosing(false);
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [isFooterClosing]);

    const showFooterCard = (content: ReactNode) => {
        setContentFooter(content);
        setIsFooterOpen(true);
        setIsFooterClosing(false);
    };

    const hideFooterCard = () => {
        setIsFooterClosing(true);
        setTimeout(() => {
            setIsFooterOpen(false);
        }, 250);
    };

    const showPopup = (content: ReactNode) => {
        setContentPopup(content);
        setIsPopupOpen(true);
        setIsPopupClosing(false);
    };

    const hidePopup = () => {
        setIsPopupClosing(true);
        setTimeout(() => {
            setIsPopupOpen(false);
        }, 250);
    };

    const showToast = (message: string, type: "success" | "error" | "info") => {
        setContentToast((prev) => [...prev, { id: Date.now(), message, type }]);
    };

    const hideToast = () => {
        setContentToast([]);
    };

    const addToast = (message: string, type: "success" | "error" | "info", duration = 3000) => {
        const id = Date.now();
        setContentToast((prev) => [...prev, { id, message, type, duration }]);

        // Start the exit animation after the duration
        setTimeout(() => startToastExit(id), duration);
    };

    const startToastExit = (id: number) => {
        // Mark the toast as exiting to trigger animation
        setContentToast((prev) => prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast)));

        // Remove the toast after animation completes
        setTimeout(() => {
            removeToast(id);
        }, 500); // Match this with the CSS animation duration
    };

    const removeToast = (id: number) => {
        setContentToast((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ContainerContext.Provider
            value={{
                isFooterOpen,
                isFooterClosing,
                isPopupOpen,
                isPopupClosing,
                contentFooter,
                contentPopup,
                contentToast,
                showFooterCard,
                hideFooterCard,
                showPopup,
                hidePopup,
                addToast,
                showToast,
                hideToast,
            }}
        >
            {children}
        </ContainerContext.Provider>
    );
};
