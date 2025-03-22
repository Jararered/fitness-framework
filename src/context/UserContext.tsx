import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Settings {
    name: string;
    weight: number;
    height: number;
    unit: "imperial" | "metric";
    weightUnit: "lbs" | "kg";
    darkMode: boolean;
    quoteMode: "gentle" | "moderate" | "hardcore" | "xxx";
}

interface UserContextType {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem("user-context");
        return saved
            ? JSON.parse(saved)
            : {
                  name: "",
                  weight: 0,
                  height: 0,
                  unit: "imperial",
                  weightUnit: "lbs",
                  darkMode: true,
                  quoteMode: "moderate",
              };
    });

    useEffect(() => {
        localStorage.setItem("user-context", JSON.stringify(settings));
    }, [settings]);

    return (
        <UserContext.Provider
            value={{
                settings,
                setSettings,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
