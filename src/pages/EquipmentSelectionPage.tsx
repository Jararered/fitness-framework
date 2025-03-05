import React, { useState } from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";

const EquipmentSelectionPage: React.FC = () => {
    const { equipment, equipmentConfigs, setEquipmentConfigs } = useWorkout();
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [configName, setConfigName] = useState<string>("");

    const toggleEquipment = (eq: string) => {
        setSelectedEquipment((prev) =>
            prev.includes(eq) ? prev.filter((item) => item !== eq) : [...prev, eq]
        );
    };

    const saveConfig = () => {
        if (configName && selectedEquipment.length > 0) {
            setEquipmentConfigs([...equipmentConfigs, { name: configName, equipment: selectedEquipment }]);
            setConfigName("");
            setSelectedEquipment([]);
        }
    };

    const loadConfig = (config: { name: string; equipment: string[] }) => {
        setSelectedEquipment(config.equipment);
    };

    return (
        <div>
            <div className="card">
                <h1>Equipment Selection</h1>
                <div>
                    {equipment.map((eq) => (
                        <button
                            key={eq}
                            className={`toggle-button ${selectedEquipment.includes(eq) ? "active" : ""}`}
                            onClick={() => toggleEquipment(eq)}
                        >
                            {eq}
                        </button>
                    ))}
                </div>
            </div>
            <div className="card">
                <h2>Save Configuration</h2>
                <input
                    type="text"
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    placeholder="Configuration Name"
                />
                <button onClick={saveConfig}>Save</button>
            </div>
            <div className="card">
                <h2>Load Configuration</h2>
                {equipmentConfigs.map((config) => (
                    <button key={config.name} onClick={() => loadConfig(config)}>
                        {config.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EquipmentSelectionPage;