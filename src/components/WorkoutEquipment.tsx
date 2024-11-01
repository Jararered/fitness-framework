import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';

import './WorkoutEquipment.css';

// List of available equipment
const availableEquipment = [
    "Dumbells",
    "Dumbells + Bench",
    "Lat Pulldown Machine",
    "Barbell",
    "Barbell + Bench",
    "Barbell + Squat Rack",
    "EZ Bar",
    "Smith Machine",
    "Smith Machine + Bench",
    "Chest Press Machine",
    "Leg Extension Machine",
    "Leg Curl Machine"
];

// Update the equipmentIcons object to use the keys from the availableEquipment list
const equipmentIcons: { [key: string]: JSX.Element } = {
    "Dumbells": <FaDumbbell size={48} />,
    "Dumbells + Bench": <FaDumbbell size={48} />,
    "Lat Pulldown Machine": <FaDumbbell size={48} />,
    "Barbell": <FaDumbbell size={48} />,
    "Barbell + Bench": <FaDumbbell size={48} />,
    "Barbell + Squat Rack": <FaDumbbell size={48} />,
    "EZ Bar": <FaDumbbell size={48} />,
    "Smith Machine": <FaDumbbell size={48} />,
    "Smith Machine + Bench": <FaDumbbell size={48} />,
    "Chest Press Machine": <FaDumbbell size={48} />,
    "Leg Extension Machine": <FaDumbbell size={48} />,
    "Leg Curl Machine": <FaDumbbell size={48} />,
};

const Equipment: React.FC = () => {
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [savedEquipmentLists, setSavedEquipmentLists] = useState<string[]>([]);
    const [selectedList, setSelectedList] = useState<string>("");
    const [currentGym, setCurrentGym] = useState<string | null>(null);

    useEffect(() => {
        const lists = Object.keys(localStorage).filter(key => key.startsWith('equipment_'));
        setSavedEquipmentLists(lists);

        const lastLoadedList = localStorage.getItem('lastLoadedGym');
        if (lastLoadedList) {
            const listName = lastLoadedList.replace('equipment_', '');
            loadEquipmentList(listName);
            setSelectedList(listName);
        }
    }, []);

    const toggleEquipment = (item: string) => {
        setSelectedEquipment((prev) =>
            prev.includes(item)
                ? prev.filter((e) => e !== item)
                : [...prev, item]
        );
    };

    const saveEquipmentList = () => {
        const listName = prompt("Enter a name for this gym:");
        if (listName) {
            const storageKey = `equipment_${listName}`;
            localStorage.setItem(storageKey, JSON.stringify(selectedEquipment));
            alert(`Gym "${listName}" saved!`);
            setSavedEquipmentLists((prev) => [...prev, storageKey]);
            loadEquipmentList(listName);
        }
    };

    const loadEquipmentList = (listName: string) => {
        const storageKey = `equipment_${listName}`;
        const savedList = localStorage.getItem(storageKey);
        if (savedList) {
            setSelectedEquipment(JSON.parse(savedList));
            localStorage.setItem('lastLoadedGym', storageKey);
            setCurrentGym(listName); // Update the current gym state
        } else {
            alert("Please select a valid gym.");
        }
    };

    const handleLoadSelectedList = () => {
        if (selectedList) {
            loadEquipmentList(selectedList);
        }
    };

    const clearEquipmentList = () => {
        if (window.confirm("Are you sure you want to clear the equipment selection?")) {
            setSelectedEquipment([]);
            localStorage.removeItem('lastLoadedGym');
            setCurrentGym(null);
        }
    };

    return (
        <>
            <div className="page-title">
                <h1>Workout Equipment</h1>
            </div>

            <div className="page-container">

                <section>
                    <h2>Selected Gym</h2>
                    {currentGym ? <p>Gym: {currentGym}</p> : <p>No gym selected.</p>}
                </section>

                <section>
                    <h2>Available Equipment</h2>
                    <div className="equipment-cards">
                        {availableEquipment.map((item) => (
                            <div
                                key={item}
                                className={`equipment-item ${selectedEquipment.includes(item) ? 'selected' : ''}`}
                                onClick={() => toggleEquipment(item)}
                            >
                                {/* Display icon for each equipment */}
                                <div className="equipment-icon">
                                    {equipmentIcons[item] || <FaDumbbell size={48} />} {/* Default icon */}
                                </div>
                                <p className="equipment-name">{item}</p>
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

            <div className="page-title">
                <h1>Saved Locations</h1>
            </div>

            <div className="page-container">
                <select
                    onChange={(e) => setSelectedList(e.target.value)}
                    value={selectedList}
                    className="input-field"
                >
                    <option value="">Select a location</option>
                    {savedEquipmentLists.map((listKey) => {
                        const listName = listKey.replace('equipment_', '');
                        return (
                            <option key={listKey} value={listName}>
                                {listName}
                            </option>
                        );
                    })}
                </select>
                <button onClick={handleLoadSelectedList} className="normal-button">
                    Load Location Equipment
                </button>
            </div>
        </>
    );
};

export default Equipment;
