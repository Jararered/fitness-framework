import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ReactNode } from "react";

interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
    duration?: number;
    isExiting?: boolean;
}

interface ContainerStore {
    // State
    dimRequested: boolean;
    isFooterOpen: boolean;
    isPopupOpen: boolean;
    contentFooter: ReactNode;
    contentPopup: ReactNode;
    contentToast: Toast[];
    isFooterClosing: boolean;
    isPopupClosing: boolean;

    // Actions
    showFooterCard: (content: ReactNode) => void;
    hideFooterCard: () => void;
    showPopup: (content: ReactNode) => void;
    hidePopup: () => void;
    addToast: (message: string, type: Toast["type"], duration?: number) => void;
    showToast: (message: string, type: Toast["type"]) => void;
    hideToast: () => void;
}

const isDevelopment = import.meta.env.MODE === "development";

export const useContainerStore = create<ContainerStore>()(
    devtools(
        (set) => ({
            // Initial state
            dimRequested: false,
            isFooterOpen: false,
            isFooterClosing: false,
            isPopupOpen: false,
            isPopupClosing: false,
            contentFooter: null,
            contentPopup: null,
            contentToast: [],

            // Footer actions
            showFooterCard: (content) =>
                set({
                    contentFooter: content,
                    isFooterOpen: true,
                    isFooterClosing: false,
                }),

            hideFooterCard: () => {
                set({ isFooterClosing: true });
                setTimeout(() => {
                    set({ isFooterOpen: false, isFooterClosing: false });
                }, 250);
            },

            // Popup actions
            showPopup: (content) =>
                set({
                    contentPopup: content,
                    isPopupOpen: true,
                    isPopupClosing: false,
                }),

            hidePopup: () => {
                set({ isPopupClosing: true });
                setTimeout(() => {
                    set({ isPopupOpen: false, isPopupClosing: false });
                }, 250);
            },

            // Toast actions
            showToast: (message, type) => {
                const id = Date.now();
                set((state) => ({
                    contentToast: [...state.contentToast, { id, message, type }],
                }));
            },

            hideToast: () => set({ contentToast: [] }),

            addToast: (message, type, duration = 3000) => {
                const id = Date.now();
                set((state) => ({
                    contentToast: [...state.contentToast, { id, message, type, duration }],
                }));

                // Start exit animation
                setTimeout(() => {
                    set((state) => ({
                        contentToast: state.contentToast.map((toast) =>
                            toast.id === id ? { ...toast, isExiting: true } : toast
                        ),
                    }));

                    // Remove after animation
                    setTimeout(() => {
                        set((state) => ({
                            contentToast: state.contentToast.filter((t) => t.id !== id),
                        }));
                    }, 500);
                }, duration);
            },
        }),
        {
            name: "ContainerStore",
            enabled: isDevelopment,
        }
    )
);
