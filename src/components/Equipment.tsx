import React, { useState, useEffect } from 'react';
import './CommonStyles.css';

const categorizedEquipment = {
    Cardio: ['Treadmill', 'Elliptical', 'Stationary Bike', 'Rowing Machine'],
    UpperBody: ['Bench Press', 'Dumbbells', 'Kettlebells', 'Pull-up Bar', 'Cable Machine'],
    LowerBody: ['Leg Press', 'Squat Rack'],
    FullBody: ['Resistance Bands', 'Medicine Ball', 'Battle Ropes'],
    Recovery: ['Foam Roller'],
};

interface EquipmentProps {
    gym: string | null; // Accept gym name as a prop
}

const Equipment: React.FC<EquipmentProps> = ({ gym }) => {
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const [savedEquipmentLists, setSavedEquipmentLists] = useState<string[]>([]);
    const [selectedList, setSelectedList] = useState<string>("");

    useEffect(() => {
        // Load saved equipment lists from localStorage on mount
        const lists = Object.keys(localStorage).filter(key => key.startsWith('equipment_'));
        setSavedEquipmentLists(lists);

        // Check for the last loaded list
        const lastLoadedList = localStorage.getItem('lastLoadedEquipmentList');
        if (lastLoadedList) {
            const listName = lastLoadedList.replace('equipment_', ''); // Strip prefix
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
        const listName = prompt("Enter a name for this equipment list:");
        if (listName) {
            const storageKey = `equipment_${listName}`;
            localStorage.setItem(storageKey, JSON.stringify(selectedEquipment));
            alert(`Equipment list "${listName}" saved!`);
            setSavedEquipmentLists((prev) => [...prev, storageKey]);
        }
    };

    const loadEquipmentList = (listName: string) => {
        const storageKey = `equipment_${listName}`;
        const savedList = localStorage.getItem(storageKey);
        if (savedList) {
            setSelectedEquipment(JSON.parse(savedList));
            localStorage.setItem('lastLoadedEquipmentList', storageKey); // Store last loaded list
        } else {
            alert("Please select a valid equipment list.");
        }
    };

    const handleLoadSelectedList = () => {
        if (selectedList) {
            loadEquipmentList(selectedList);
        }
    };

    const clearEquipmentList = () => {
        setSelectedEquipment([]);
        localStorage.removeItem('lastLoadedEquipmentList');
    };

    return (
        <div className="page-container">
            <h1>Equipment</h1>

            {/* Display the selected gym name */}
            <section>
                <h2>Selected Gym</h2>
                {gym ? (
                    <p>Gym: {gym}</p>
                ) : (
                    <p>No gym selected.</p>
                )}
            </section>

            <section>
                <h2>Available Equipment</h2>
                {Object.entries(categorizedEquipment).map(([category, equipment]) => (
                    <div key={category} className="equipment-category">
                        <h3>{category}</h3>
                        <ul className="equipment-list">
                            {equipment.map((item) => (
                                <li
                                    key={item}
                                    className={`equipment-item ${selectedEquipment.includes(item) ? 'selected' : ''
                                        }`}
                                    onClick={() => toggleEquipment(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <button onClick={saveEquipmentList} className="action-button">
                    Save Equipment List
                </button>
                <button onClick={clearEquipmentList} className="action-button">
                    Clear Equipment Selection
                </button>
            </section>

            <h2>Load a Saved Equipment List</h2>
            <div>
                <select
                    onChange={(e) => setSelectedList(e.target.value)}
                    value={selectedList}
                    className="input-field"
                >
                    <option value="">Select an equipment list</option>
                    {savedEquipmentLists.map((listKey) => {
                        const listName = listKey.replace('equipment_', '');
                        return (
                            <option key={listKey} value={listName}>
                                {listName}
                            </option>
                        );
                    })}
                </select>
                <button onClick={handleLoadSelectedList} className="action-button">
                    Load Equipment List
                </button>
            </div>
        </div>
    );
};

export default Equipment;
