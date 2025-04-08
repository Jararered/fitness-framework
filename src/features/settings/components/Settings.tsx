import React from "react";

import { UserSettings } from "./UserSettings";
import { AppSettings } from "./AppSettings";
import { AboutApp } from "./About";

export const Settings: React.FC = () => {
    return (
        <div className="settings-page flex-column flex-grow">
            <h1>Settings</h1>
            <UserSettings />
            <AppSettings />
            <AboutApp />
        </div>
    );
};
