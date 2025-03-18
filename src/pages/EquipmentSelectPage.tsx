import React, { useState, useCallback, useEffect } from "react";

import { useWorkout } from "../context/WorkoutContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import { useEquipment } from "../context/EquipmentContext.tsx";

import { EquipmentToggleCard, EquipmentToggleListItem } from "../components/EquipmentToggle.tsx";
import { PillToggle } from "../components/PillToggle.tsx";
import { DividerSpaced } from "../components/DividerSpaced.tsx";

import "../styles/pages/EquipmentSelectPage.css";

const EquipmentSelectPage: React.FC = () => {
    const { addToast } = useToast();
    const { equipment } = useWorkout();
    const { equipmentConfigs, setEquipmentConfigs, equipmentLast, setEquipmentLast } = useEquipment();

    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [equipmentNameInput, setEquipmentNameInput] = useState<string>("");

    const [listView, setListView] = useState<boolean>(false);

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
                setEquipmentConfigs([
                    ...equipmentConfigs.filter((config) => config.name !== equipmentNameInput),
                    { name: equipmentNameInput, equipment: selectedEquipment },
                ]);
                setEquipmentLast(equipmentNameInput);
            } else {
                setEquipmentConfigs([...equipmentConfigs, { name: equipmentNameInput, equipment: selectedEquipment }]);
                setEquipmentLast(equipmentNameInput);
            }
        }

        addToast(`Gym saved: ${equipmentNameInput}`, "success");
    };

    const handleLoadGym = (config: { name: string; equipment: string[] }) => {
        setEquipmentNameInput(config.name);
        setSelectedEquipment(config.equipment);
        setEquipmentLast(config.name);

        addToast(`Gym loaded: ${config.name}`, "success");
    };

    const handleDeleteGym = (name: string) => {
        setEquipmentConfigs(equipmentConfigs.filter((config) => config.name !== name));

        addToast(`Gym deleted: ${name}`, "success");
    };

    return (
        <div className="equipment-select-page">
            <h1>Gym Equipment</h1>

            <div className="card">
                <div className="card-title">
                    <DividerSpaced
                        center={<h2>Equipment Selection</h2>}
                        right={<PillToggle isActive={listView} onChange={() => setListView(!listView)} />}
                    />
                </div>

                <div className="equipment-toggles">
                    {equipment.map((equipment) => (
                        listView ? (
                            <EquipmentToggleListItem
                                key={equipment}
                                equipment={equipment}
                                enabled={selectedEquipment.includes(equipment)}
                                handleEquipmentToggle={handleEquipmentToggle}
                            />
                        ) : (
                            <EquipmentToggleCard
                                key={equipment}
                                equipment={equipment}
                                enabled={selectedEquipment.includes(equipment)}
                                handleEquipmentToggle={handleEquipmentToggle}
                            />
                        )
                    ))}
                </div>
            </div>

            <div className="card">
                <h2>Save Gym</h2>
                <input
                    type="text"
                    value={equipmentNameInput}
                    onChange={(e) => setEquipmentNameInput(e.target.value)}
                    placeholder="Configuration Name"
                />
                <span>
                    <button onClick={handleSaveEquipment}>Save</button>
                    <button onClick={() => handleDeleteGym(equipmentNameInput)}>Delete</button>
                </span>
            </div>

            <div className="card">
                <h2>Load Gym</h2>
                <span>
                    {equipmentConfigs.map((config) => (
                        <button key={config.name} onClick={() => handleLoadGym(config)}>
                            {config.name}
                        </button>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default EquipmentSelectPage;