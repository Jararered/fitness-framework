import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

// Import Components
import SectionTitle from './buttons/SectionTitle';

// Import Interfaces
import { equipment, equipmentIcons, equipmentExercises } from './Equipment';

// Import Styles
import './GymEquipment.css';

const Equipment: React.FC = () => {
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [savedEquipmentLists, setSavedEquipmentLists] = useState<{ name: string, equipment: string[] }[]>([]);
    const [selectedList, setSelectedList] = useState<string>("");
    const [currentGym, setCurrentGym] = useState<string | null>(null);

    useEffect(() => {
        const savedLists = localStorage.getItem('savedGyms');
        if (savedLists) {
            const parsedLists = JSON.parse(savedLists);
            parsedLists.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
            setSavedEquipmentLists(parsedLists);
        }

        // Load saved equipment if no gym is selected
        const savedEquipment = localStorage.getItem('selectedEquipment');
        if (savedEquipment) {
            setSelectedEquipment(JSON.parse(savedEquipment));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedEquipment', JSON.stringify(selectedEquipment));
    }, [selectedEquipment]);

    // This function toggles the selected equipment in the list
    const toggleEquipment = (item: string) => {
        setSelectedEquipment(prev =>
            prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
        );
    };

    const saveEquipmentList = () => {
        const gymName = prompt("Enter a name for this gym:");
        if (gymName) {
            const newGym = { name: gymName, equipment: selectedEquipment };
            setSavedEquipmentLists(prev => {
                const updatedLists = prev.filter(gym => gym.name !== gymName).concat(newGym);
                localStorage.setItem('savedGyms', JSON.stringify(updatedLists));
                return updatedLists;
            });
            setCurrentGym(gymName);
        }
    };

    const loadEquipmentList = (gymName: string) => {
        const savedLists = localStorage.getItem('savedGyms');
        if (savedLists) {
            const gym = JSON.parse(savedLists).find((entry: { name: string }) => entry.name === gymName);
            if (gym) {
                setCurrentGym(gym.name);
                setSelectedEquipment(gym.equipment);
            } else {
                alert("Please select a valid gym.");
            }
        }
    };

    const deleteEquipmentList = (gymName: string) => {
        const savedLists = localStorage.getItem('savedGyms');
        if (savedLists) {
            const parsedLists = JSON.parse(savedLists).filter((entry: { name: string }) => entry.name !== gymName);
            setSavedEquipmentLists(parsedLists);
            localStorage.setItem('savedGyms', JSON.stringify(parsedLists));
            if (currentGym === gymName) {
                setCurrentGym(null);
            }
        }
    };

    const clearEquipmentList = () => {
        if (window.confirm("Are you sure you want to clear the equipment selection?")) {
            setSelectedEquipment([]);
            setCurrentGym(null);
        }
    };

    return (
        <div className='main-content'>

            <SectionTitle title="Gym Equipment" />

            <div className="card">
                <section>
                    <h2>Selected Gym</h2>
                    <p>{currentGym ? `Gym: ${currentGym}` : "No gym selected."}</p>
                </section>

                <section>
                    <h2>Available Equipment</h2>
                    <div className="equipment-cards">
                        {equipment.map(equipment => (
                            <div
                                key={equipment}
                                className={`equipment-item ${selectedEquipment.includes(equipment) ? 'selected' : ''}`}
                                onClick={() => toggleEquipment(equipment)}
                            >
                                <div className="equipment-icon">
                                    {equipmentIcons[equipment]}
                                </div>
                                <p className="equipment-name">{equipment}</p>
                                {selectedEquipment.includes(equipment) && (
                                    <div className="checkmark-icon">
                                        <FaCheck size={24} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button onClick={saveEquipmentList} className="normal-button">
                        Save Equipment Selection
                    </button>

                    <button onClick={clearEquipmentList} className="bad-button">
                        Clear Equipment Selection
                    </button>
                </section>
            </div>

            <SectionTitle title="Saved Gyms" />

            <div className="card">
                <select
                    onChange={e => setSelectedList(e.target.value)}
                    value={selectedList}
                    className="input-field"
                >
                    {!selectedList && <option value="">Select a location</option>}
                    {savedEquipmentLists.map((gym: { name: string }) => (
                        <option key={gym.name} value={gym.name}>
                            {gym.name}
                        </option>
                    ))}
                </select>

                <button onClick={() => loadEquipmentList(selectedList)} className="normal-button">
                    Load Gym Equipment
                </button>

                <button onClick={() => deleteEquipmentList(selectedList)} className="bad-button">
                    Delete Gym Equipment
                </button>
            </div>

            <SectionTitle title="Available Exercises" />

            <div className="card">
                {selectedEquipment.length > 0 ? (
                    selectedEquipment.map((equipment) => (
                        <div key={equipment}>
                            <h2>{equipment}</h2>
                            <ul>
                                {equipmentExercises[equipment]?.map((exercise, index) => (
                                    <li key={index}>{exercise}</li>
                                )) || <li>No exercises available for this equipment.</li>}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No equipment selected. Please select equipment to see available exercises.</p>
                )}
            </div>
        </div>
    );
};

export default Equipment;
