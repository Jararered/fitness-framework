import React, { useState, useCallback, useEffect } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import EquipmentToggle from "../components/EquipmentToggle.tsx";
import { useUser } from "../context/UserContext.tsx";

import "../styles/pages/EquipmentSelectionPage.css";

const EquipmentSelectionPage: React.FC = () => {
    const { equipment } = useWorkout();
    const { equipmentConfigs, setEquipmentConfigs, equipmentLast, setEquipmentLast } = useUser();
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [equipmentNameInput, setEquipmentNameInput] = useState<string>("");

    useEffect(() => {
        if (equipmentLast && equipmentConfigs.length > 0) {
            const lastConfig = equipmentConfigs.find((config) => config.name === equipmentLast);
            if (lastConfig) {
                setSelectedEquipment(lastConfig.equipment);
            }
        }
    }, [equipmentConfigs, equipmentLast]);

    const handleEquipmentToggle = useCallback(
        (name: string) => {
            setSelectedEquipment((prev) =>
                prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
            );
        },
        [setSelectedEquipment]
    );

    const handleSaveEquipment = () => {
        // Check if name already exists in configs, if so, overwrite
        const exists = equipmentConfigs.some((config) => config.name === equipmentNameInput);
        if (equipmentNameInput && selectedEquipment.length > 0) {
            if (exists) {
                handleOverwriteEquipment();
            } else {
                setEquipmentConfigs([...equipmentConfigs, { name: equipmentNameInput, equipment: selectedEquipment }]);
                setEquipmentLast(equipmentNameInput);
            }
        }
    };

    const handleLoadEquipment = (config: { name: string; equipment: string[] }) => {
        setEquipmentNameInput(config.name);
        setSelectedEquipment(config.equipment);
        setEquipmentLast(config.name);
    };

    const handleOverwriteEquipment = () => {
        if (equipmentNameInput && selectedEquipment.length > 0) {
            setEquipmentConfigs([
                ...equipmentConfigs.filter((config) => config.name !== equipmentNameInput),
                { name: equipmentNameInput, equipment: selectedEquipment },
            ]);
            setEquipmentLast(equipmentNameInput);
        }
    };

    const handleDeleteSavedEquipment = (name: string) => {
        setEquipmentConfigs(equipmentConfigs.filter((config) => config.name !== name));
    };

    return (
        <div className="equipment-selection-page">
            <h1>Equipment</h1>
            <div className="card">
                <h2>Equipment Selection</h2>
                <div className="equipment-toggles">
                    {equipment.map((equipment) => (
                        <EquipmentToggle
                            key={equipment}
                            equipment={equipment}
                            enabled={selectedEquipment.includes(equipment)}
                            handleEquipmentToggle={handleEquipmentToggle}
                        />
                    ))}
                </div>
            </div>
            <div className="card">
                <h2>Save Configuration</h2>
                <span>
                    <input
                        type="text"
                        value={equipmentNameInput}
                        onChange={(e) => setEquipmentNameInput(e.target.value)}
                        placeholder="Configuration Name"
                    />
                    <button onClick={handleSaveEquipment}>Save</button>
                    <button onClick={() => handleDeleteSavedEquipment(equipmentNameInput)}>Delete</button>
                </span>
            </div>
            <div className="card">
                <h2>Load Configuration</h2>
                <span>
                    {equipmentConfigs.map((config) => (
                        <button key={config.name} onClick={() => handleLoadEquipment(config)}>
                            {config.name}
                        </button>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default EquipmentSelectionPage;