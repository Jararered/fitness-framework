import { useContainer } from "../context/ContainerContext.tsx";

import ContainerPopup from "../features/layout/components/ContainerPopup.tsx";
import ContainerFooter from "../features/layout/components/ContainerFooter.tsx";
import ContainerToast from "../features/layout/components/ContainerToast.tsx";

import { AppRoutes } from "./routes/index.tsx";

import { DockBar } from "../features/layout/components/DockBar.tsx";

import { useSettingStore } from "../features/settings/hooks/useSettingStore.ts";

import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const { darkMode } = useSettingStore();

  const { isFooterOpen, contentFooter, hideFooterCard } = useContainer();
  const { isPopupOpen, contentPopup, hidePopup } = useContainer();
  const { dimRequested } = useContainer();

  const [shouldHideDockBar, setShouldHideDockBar] = useState(false);

  useEffect(() => {
    setShouldHideDockBar(location.pathname === "/exercise" || location.pathname === "/preview-exercise");
  }, [location.pathname]);

  return (
    <div className={`app flex-column ${dimRequested ? "dimmed" : ""} ${darkMode ? "dark-mode" : ""}`}>
      <div className={`app-content flex-column ${dimRequested ? "dimmed" : ""}`}>
        <AppRoutes />
      </div>

      <ContainerToast />

      <ContainerPopup
        isOpen={isPopupOpen}
        content={contentPopup}
        onClose={hidePopup}
      />

      <ContainerFooter
        isOpen={isFooterOpen}
        content={contentFooter}
        onClose={hideFooterCard}
      />

      {!shouldHideDockBar && <div className="dockbar-padding" />}

      <div className={dimRequested ? "dimmed" : ""}>
        <DockBar shouldHideDockBar={shouldHideDockBar} />
      </div>
    </div>
  );
}

export default App;
