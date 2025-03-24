import { createContext, useState, ReactNode, useEffect, useContext } from "react";

import { Equipment } from "../data/types";

interface EquipmentConfig {
    name: string;
    equipment: Equipment[];
}

interface EquipmentContextType {
    equipmentState: EquipmentConfig;
    setEquipmentState: (equipmentState: EquipmentConfig) => void;
    equipmentConfigs: EquipmentConfig[];
    setEquipmentConfigs: (equipmentConfigs: EquipmentConfig[]) => void;
    equipmentLast: string;
    setEquipmentLast: (equipmentLast: string) => void;
}

export const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider = ({ children }: { children: ReactNode }) => {
    const [equipmentState, setEquipmentState] = useState<EquipmentConfig>(() => {
        const saved = localStorage.getItem("equipment-state");
        return saved ? JSON.parse(saved) : { name: "", equipment: [] };
    });

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
        localStorage.setItem("equipment-state", JSON.stringify(equipmentState));
    }, [equipmentConfigs, equipmentLast, equipmentState]);

    return (
        <EquipmentContext.Provider
            value={{
                equipmentState,
                setEquipmentState,
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
