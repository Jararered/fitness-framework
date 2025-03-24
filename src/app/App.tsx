import PageTransition from "../components/PageTransition.tsx";
import { useContainer } from "../context/ContainerContext.tsx";

import ContainerPopup from "../components/ContainerPopup.tsx";
import ContainerFooter from "../components/ContainerFooter.tsx";
import ContainerToast from "../components/ContainerToast.tsx";

import AppRoutes from "./routes/index.tsx";

import DockBar from "../features/layout/components/DockBar.tsx";

import { useSettingStore } from "../features/settings/hooks/useSettingStore.ts";

import "./App.css";

const App = () => {
    const { darkMode } = useSettingStore();
    const { isFooterOpen, contentFooter, hideFooterCard } = useContainer();
    const { isPopupOpen, contentPopup, hidePopup } = useContainer();
    const { dimRequested } = useContainer();

    return (
        <div className={`App ${dimRequested ? "dimmed" : ""} ${darkMode ? "dark-mode" : ""}`}>
            <ContainerPopup
                isOpen={isPopupOpen}
                content={contentPopup}
                onClose={hidePopup}
            />
            <ContainerToast />

            <div className={`app-content ${dimRequested ? "dimmed" : ""}`}>
                <PageTransition children={<AppRoutes />} />
            </div>

            <div className={dimRequested ? "dimmed" : ""}>
                <DockBar />
            </div>

            <ContainerFooter
                isOpen={isFooterOpen}
                content={contentFooter}
                onClose={hideFooterCard}
            />
        </div>
    );
};

export default App;
