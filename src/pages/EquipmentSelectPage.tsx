import React, { useState, useCallback, useEffect } from "react";
import { LuTrash, LuSave, LuArrowDownToLine } from "react-icons/lu";

import { useWorkout } from "../context/WorkoutContext.tsx";
import { useToast } from "../context/ToastContext.tsx";
import { useEquipment } from "../context/EquipmentContext.tsx";

import { EquipmentToggleListItem } from "../components/EquipmentToggle.tsx";

import "../styles/pages/EquipmentSelectPage.css";

const EquipmentSelectPage: React.FC = () => {
    const { addToast } = useToast();
    const { equipment } = useWorkout();
    const { equipmentConfigs, setEquipmentConfigs, equipmentLast, setEquipmentLast } = useEquipment();

    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

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
            if (name === "all") {
                setSelectedEquipment(equipment);
            } else if (name === "none") {
                setSelectedEquipment([]);
            } else {
                setSelectedEquipment((prev) =>
                    prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
                );
            }
        },
        [setSelectedEquipment]
    );

    const handleSaveEquipment = () => {
        // Prompt the user for a name if they haven't already entered one
        const name = prompt("Please enter a name for the gym");
        if (name && name.length > 0) {
            setEquipmentConfigs([...equipmentConfigs, { name, equipment: selectedEquipment }]);
            setEquipmentLast(name);
        } else {
            addToast("Please enter a name for the gym", "error");
            return;
        }

        // Check if name already exists in configs, if so, overwrite
        const exists = equipmentConfigs.some((config) => config.name === name);

        if (selectedEquipment.length > 0) {
            if (exists) {
                setEquipmentConfigs([
                    ...equipmentConfigs.filter((config) => config.name !== name),
                    { name, equipment: selectedEquipment },
                ]);
                setEquipmentLast(name);
            } else {
                setEquipmentConfigs([...equipmentConfigs, { name, equipment: selectedEquipment }]);
                setEquipmentLast(name);
            }
        }

        addToast(`Gym saved: ${name}`, "success");
    };

    const handleLoadGym = (config: { name: string; equipment: string[] }) => {
        setSelectedEquipment(config.equipment);
        setEquipmentLast(config.name);

        addToast(`Gym loaded: ${config.name}`, "success");
    };

    const handleDeleteGym = (name: string) => {
        setEquipmentConfigs(equipmentConfigs.filter((config) => config.name !== name));

        addToast(`Gym deleted: ${name}`, "success");
    };

    return (
        <div className="equipment-select-page page-container">
            <h1>Gym Equipment</h1>

            <div className="card">
                <div className="card-header">
                    <h2>Equipment Selection</h2>
                    <p>Select the equipment that is available at your gym</p>
                </div>

                <div className="card-content">
                    <div className="equipment-toggle-container">
                        {equipment.map((equipment) => (
                            <EquipmentToggleListItem
                                key={equipment}
                                equipment={equipment}
                                enabled={selectedEquipment.includes(equipment)}
                                handleEquipmentToggle={handleEquipmentToggle}
                            />
                        ))}
                    </div>
                    <div className="equipment-toggles-buttons">
                        <button onClick={handleSaveEquipment}>
                            Save
                            <LuSave />
                        </button>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2>Load Gym</h2>
                    <p>
                        Below is a list of all the gyms you have saved. <br />
                        The last gym used will be auto-loaded next time you open the app.
                    </p>
                </div>

                <hr />

                <div className="card-content">
                    {equipmentConfigs.map((gym) => (
                        <span
                            key={gym.name}
                            className="card-row"
                        >
                            <label className="gym-list-item-name">{gym.name}</label>
                            <span className="gym-list-item-buttons">
                                <button
                                    className="gym-list-item-button"
                                    onClick={() => handleLoadGym(gym)}
                                >
                                    Load
                                    <LuArrowDownToLine />
                                </button>
                                <button
                                    className="gym-list-item-button caution icon"
                                    onClick={() => handleDeleteGym(gym.name)}
                                >
                                    <LuTrash />
                                </button>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentSelectPage;
