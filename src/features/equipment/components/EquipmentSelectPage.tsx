import React, { useCallback } from "react";
import { LuTrash, LuSave, LuArrowDownToLine } from "react-icons/lu";
import { LuDumbbell } from "react-icons/lu";

import { useContainer } from "../../../context/ContainerContext.tsx";

import { Card } from "../../layout/components/Card.tsx";
import { ListItemToggleButton } from "../../layout/components/ListItemToggleButton.tsx";

import { useEquipmentStore } from "../hooks/useEquipmentStore.ts";

import { Equipment } from "../types/equipment.types.ts";

import "./EquipmentSelectPage.css";

const EquipmentSelectPage: React.FC = () => {
    const { addToast } = useContainer();
    const {
        selectedEquipment,
        setSelectedEquipment,
        equipmentConfigs,
        setEquipmentConfigs,
        allEquipment,
        toggleEquipment,
    } = useEquipmentStore();

    const handleEquipmentToggle = useCallback(
        (name: string) => {
            if (name === "all") {
                setSelectedEquipment(allEquipment);
            } else if (name === "none") {
                setSelectedEquipment([]);
            } else {
                toggleEquipment(name as Equipment);
            }
        },
        [toggleEquipment]
    );

    const handleSaveEquipment = () => {
        // Prompt the user for a name if they haven't already entered one
        const name = prompt("Please enter a name for the gym");
        if (name && name.length > 0) {
            setEquipmentConfigs([...equipmentConfigs, { name, equipment: selectedEquipment as Equipment[] }]);
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
            } else {
                setEquipmentConfigs([...equipmentConfigs, { name, equipment: selectedEquipment as Equipment[] }]);
            }
        }

        addToast(`Gym saved: ${name}`, "success");
    };

    return (
        <div className="equipment-select-page page-container">
            <h1>Gym Equipment</h1>

            <Card
                title="Equipment Selection"
                description="Select the equipment that is available at your gym"
                content={
                    <React.Fragment>
                        <div className="equipment-toggle-container">
                            {allEquipment.map((equipment) => (
                                <ListItemToggleButton
                                    key={equipment}
                                    icon={<LuDumbbell size={24} />}
                                    name={equipment}
                                    enabled={selectedEquipment.includes(equipment)}
                                    handleToggle={handleEquipmentToggle}
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

            <EquipmentConfigManager />
        </div>
    );
};

const EquipmentConfigManager: React.FC = () => {
    const { addToast } = useContainer();
    const { equipmentConfigs, setEquipmentConfigs, setSelectedEquipment } = useEquipmentStore();

    const handleLoadGym = (config: { name: string; equipment: string[] }) => {
        setSelectedEquipment(config.equipment as Equipment[]);

        addToast(`Gym loaded: ${config.name}`, "success");
    };

    const handleDeleteGym = (name: string) => {
        setEquipmentConfigs(equipmentConfigs.filter((config) => config.name !== name));

        addToast(`Gym deleted: ${name}`, "success");
    };

    return (
        equipmentConfigs.length > 0 && (
            <Card
                title="Load Gym"
                description="Below is a list of all the gyms you have saved"
                content={
                    <React.Fragment>
                        {equipmentConfigs.map((gym) => (
                            <span
                                className="card-row"
                                key={gym.name}
                            >
                                <span className="gym-list-item">
                                    <h2 className="gym-list-item-name">{gym.name}</h2>
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
        )
    );
};

export default EquipmentSelectPage;
