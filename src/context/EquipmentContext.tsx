import { createContext, useState, ReactNode, useEffect, useContext } from "react";

import { Equipment } from "../data/types";

interface EquipmentContextType {
    equipmentConfigs: EquipmentConfig[];
    setEquipmentConfigs: (equipmentConfigs: EquipmentConfig[]) => void;
    equipmentLast: string;
    setEquipmentLast: (equipmentLast: string) => void;
}

interface EquipmentConfig {
    name: string;
    equipment: Equipment[];
}

export const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
    const [equipmentConfigs, setEquipmentConfigs] = useState<EquipmentConfig[]>(() => {
        const saved = localStorage.getItem("equipment-configs");
        return saved ? JSON.parse(saved) : [];
    });

    const [equipmentLast, setEquipmentLast] = useState<string>(() => {
        const saved = localStorage.getItem("equipment-last");
        return saved ? JSON.parse(saved) : "";
    });

    useEffect(() => {
        localStorage.setItem("equipment-configs", JSON.stringify(equipmentConfigs));
        localStorage.setItem("equipment-last", JSON.stringify(equipmentLast));
    }, [equipmentConfigs, equipmentLast]);

    return (
        <EquipmentContext.Provider
            value={{
                equipmentConfigs,
                setEquipmentConfigs,
                equipmentLast,
                setEquipmentLast,
            }}
        >
            {children}
        </EquipmentContext.Provider>
    );
};

export const useEquipment = () => {
    const context = useContext(EquipmentContext);
    if (!context) {
        throw new Error("useEquipment must be used within an EquipmentProvider");
    }
    return context;
};
