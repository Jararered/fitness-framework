import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

import { equipment, equipmentIcons, equipmentExercises } from '../interfaces/Equipment';
import './GymEquipment.css';

const Equipment: React.FC = () => {
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [savedEquipmentLists, setSavedEquipmentLists] = useState<{ name: string, equipment: string[] }[]>([]);
    const [selectedList, setSelectedList] = useState<string>("");
    const [currentGym, setCurrentGym] = useState<string | null>(null);

    useEffect(() => {
        const savedLists = JSON.parse(localStorage.getItem('savedGyms') || '[]');
        savedLists.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        setSavedEquipmentLists(savedLists);
        setSelectedEquipment(JSON.parse(localStorage.getItem('selectedEquipment') || '[]'));
    }, []);

    const toggleEquipment = (item: string) => {
        setSelectedEquipment(prev => {
            const updatedEquipment = prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item];
            localStorage.setItem('selectedEquipment', JSON.stringify(updatedEquipment));
            return updatedEquipment;
        });
    };

    const saveEquipmentList = () => {
        if (selectedEquipment.length === 0) return alert("Please select equipment before saving.");
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
        const gym = savedEquipmentLists.find(gym => gym.name === gymName);
        if (gym) {
            setCurrentGym(gym.name);
            setSelectedEquipment(gym.equipment);
            localStorage.setItem('selectedEquipment', JSON.stringify(gym.equipment));
        } else {
            alert("Please select a valid gym.");
        }
    };

    const deleteEquipmentList = (gymName: string) => {
        const updatedLists = savedEquipmentLists.filter(gym => gym.name !== gymName);
        setSavedEquipmentLists(updatedLists);
        localStorage.setItem('savedGyms', JSON.stringify(updatedLists));
        if (currentGym === gymName) setCurrentGym(null);
    };

    const clearEquipmentList = () => {
        if (window.confirm("Are you sure you want to clear the equipment selection?")) {
            setSelectedEquipment([]);
            localStorage.removeItem('selectedEquipment');
            setCurrentGym(null);
        }
    };

    return (
        <div className='gym-equipment'>

            <h1>Gym Equipment</h1>

            <div className='column'>
                <div className="card">
                    <section>
                        <h2>Available Equipment</h2>
                        <div className="flexible-container">
                            {equipment.map(equipment => (
                                <div
                                    key={equipment}
                                    className={`equipment-item ${selectedEquipment.includes(equipment) ? 'selected' : ''}`}
                                    onClick={() => toggleEquipment(equipment)}
                                >
                                    <div>{equipmentIcons[equipment]}</div>
                                    <p className="equipment-name">{equipment}</p>
                                    {selectedEquipment.includes(equipment) && <FaCheck size={24} className="checkmark-icon" />}
                                </div>
                            ))}
                        </div>
                        <button onClick={saveEquipmentList} className="normal-button">Save Equipment Selection</button>
                        <button onClick={clearEquipmentList} className="bad-button">Clear Equipment Selection</button>
                    </section>
                </div>

                <h1>Saved Gyms</h1>

                <div className="card">
                    <select onChange={e => setSelectedList(e.target.value)} value={selectedList} className="input-field">
                        <option value="">Select a location</option>
                        {savedEquipmentLists.map(gym => (
                            <option key={gym.name} value={gym.name}>{gym.name}</option>
                        ))}
                    </select>
                    <div>
                        <button onClick={() => loadEquipmentList(selectedList)} className="normal-button">Load Gym Equipment</button>
                        <button onClick={() => deleteEquipmentList(selectedList)} className="bad-button">Delete Gym Equipment</button>
                    </div>
                </div>

                <h1>Available Exercises</h1>

                <div className="card">
                    {selectedEquipment.length > 0 ? (
                        selectedEquipment.map(equipment => (
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
        </div>
    );
};

export default Equipment;
