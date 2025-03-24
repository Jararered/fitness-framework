import React, { useState, useCallback, useEffect } from "react";
import { LuTrash, LuSave, LuArrowDownToLine } from "react-icons/lu";
import { LuDumbbell } from "react-icons/lu";

import { useWorkout } from "../context/WorkoutContext.tsx";
import { useEquipment } from "../context/EquipmentContext.tsx";
import { useContainer } from "../context/ContainerContext.tsx";

import { ContainerCard } from "../components/ContainerCard.tsx";
import { ListItemToggleButton } from "../components/ListItemToggleButton.tsx";

import { Equipment } from "../data/types.ts";

import "../styles/pages/EquipmentSelectPage.css";

const EquipmentSelectPage: React.FC = () => {
    const { addToast } = useContainer();
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
            setEquipmentConfigs([...equipmentConfigs, { name, equipment: selectedEquipment as Equipment[] }]);
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
                    { name, equipment: selectedEquipment as Equipment[] },
                ]);
                setEquipmentLast(name);
            } else {
                setEquipmentConfigs([...equipmentConfigs, { name, equipment: selectedEquipment as Equipment[] }]);
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

            <ContainerCard
                title="Equipment Selection"
                description="Select the equipment that is available at your gym"
                content={
                    <React.Fragment>
                        <div className="equipment-toggle-container">
                            {equipment.map((equipment) => (
                                <ListItemToggleButton
                                    key={equipment}
                                    icon={<LuDumbbell />}
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
                    </React.Fragment>
                }
            />

            {equipmentConfigs.length > 0 && (
                <ContainerCard
                    title="Load Gym"
                    description="Below is a list of all the gyms you have saved. The last gym used will be auto-loaded next time you open the app."
                    content={
                        <React.Fragment>
                            {equipmentConfigs.map((gym) => (
                                <span
                                    className="card-row"
                                    key={gym.name}
                                >
                                    <span className="gym-list-item">
                                        <h2 className="gym-list-item-name">{gym.name}</h2>
                                        {equipmentLast === gym.name && (
                                            <p className="gym-list-item-auto-load-tag">Auto-Load</p>
                                        )}
                                    </span>

                                    <span className="gym-list-item-buttons right">
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
                        </React.Fragment>
                    }
                />
            )}
        </div>
    );
};

export default EquipmentSelectPage;
