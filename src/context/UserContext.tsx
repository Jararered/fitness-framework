import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface Settings {
    name: string;
    weight: number;
    height: number;
    unit: "imperial" | "metric";
    darkMode: boolean;
}

interface EquipmentConfig {
    name: string;
    equipment: string[];
}

interface UserContextType {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    equipmentConfigs: EquipmentConfig[];
    setEquipmentConfigs: React.Dispatch<React.SetStateAction<EquipmentConfig[]>>;
    equipmentLast: string;
    setEquipmentLast: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem("settings");
        return saved
            ? JSON.parse(saved)
            : { name: "", weight: 0, height: 0, unit: "metric", darkMode: false };
    });
    
    const [equipmentConfigs, setEquipmentConfigs] = useState<EquipmentConfig[]>(() => {
        const saved = localStorage.getItem("equipmentConfigs");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [equipmentLast, setEquipmentLast] = useState<string>(() => {
        const saved = localStorage.getItem("equipmentLast");
        return saved ? JSON.parse(saved) : "";
    });

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
        localStorage.setItem("equipmentConfigs", JSON.stringify(equipmentConfigs));
        localStorage.setItem("equipmentLast", JSON.stringify(equipmentLast));
    }, [settings, equipmentConfigs, equipmentLast]);

    return (
        <UserContext.Provider
            value={{
                settings,
                setSettings,
                equipmentConfigs,
                setEquipmentConfigs,
                equipmentLast,
                setEquipmentLast,
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