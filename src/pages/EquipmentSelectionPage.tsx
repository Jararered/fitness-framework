import React, { useState, useCallback } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import EquipmentToggle from "../components/EquipmentToggle.tsx";
import "./EquipmentSelectionPage.css";

const EquipmentSelectionPage: React.FC = () => {
    const { equipment, equipmentConfigs, setEquipmentConfigs } = useWorkout();
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [configName, setConfigName] = useState<string>("");

    const handleEquipmentToggle = useCallback(
        (name: string) => {
            setSelectedEquipment((prev) =>
                prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
            );
        },
        [setSelectedEquipment]
    );

    const handleSaveEquipment = () => {
        if (configName && selectedEquipment.length > 0) {
            setEquipmentConfigs([...equipmentConfigs, { name: configName, equipment: selectedEquipment }]);
            setConfigName("");
            setSelectedEquipment([]);
        }
    };

    const handleLoadEquipment = (config: { name: string; equipment: string[] }) => {
        setSelectedEquipment(config.equipment);
    };

    return (
        <div className="equipment-selection-page">
            <h1>Equipment</h1>
            <div className="card">
                <h2>Equipment Selection</h2>
                <div className="equipment-toggles">
                    {equipment.map((eq) => (
                        <EquipmentToggle
                            key={eq}
                            equipment={eq}
                            enabled={selectedEquipment.includes(eq)}
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
                        value={configName}
                        onChange={(e) => setConfigName(e.target.value)}
                        placeholder="Configuration Name"
                    />
                    <button onClick={handleSaveEquipment}>Save</button>
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