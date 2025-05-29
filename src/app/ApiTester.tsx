import React, { useState, useEffect, useCallback } from "react";
import "./ApiTester.css";

function ApiTester() {
  const [exercisesData, setExercisesData] = useState<any[] | null>(null);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [exercisesError, setExercisesError] = useState<string | null>(null);

  // States for filter options
  const [equipmentOptions, setEquipmentOptions] = useState<string[]>([]);
  const [musclesOptions, setMusclesOptions] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  // States for selected filter values (now arrays for multiple selection)
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  // --- 1. Fetch Filter Options on Component Mount ---
  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingOptions(true);
      setOptionsError(null);
      try {
        const [equipmentRes, musclesRes] = await Promise.all([
          fetch("http://localhost:8080/api/equipment-options"),
          fetch("http://localhost:8080/api/muscles-options"),
        ]);

        if (!equipmentRes.ok)
          throw new Error(`HTTP error! Equipment options status: ${equipmentRes.status}`);
        if (!musclesRes.ok)
          throw new Error(`HTTP error! Muscles options status: ${musclesRes.status}`);

        const equipmentData = await equipmentRes.json();
        const musclesData = await musclesRes.json();

        // Ensure we always set to an array, even if data was unexpectedly null/undefined
        setEquipmentOptions(Array.isArray(equipmentData) ? equipmentData : []);
        setMusclesOptions(Array.isArray(musclesData) ? musclesData : []);

      } catch (e) {
        let errorMessage = "Failed to load filter options.";
        if (e instanceof Error) {
          errorMessage += ` ${e.message}`;
        } else if (typeof e === "string") {
          errorMessage += ` ${e}`;
        }
        setOptionsError(errorMessage);
        console.error("API Options Fetch Error:", e);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  // --- 2. Fetch Exercises Logic (uses selected values from dropdowns) ---
  const handleFetchExercises = useCallback(async () => {
    setLoadingExercises(true);
    setExercisesError(null);
    setExercisesData(null);

    const params = new URLSearchParams();
    selectedEquipment.forEach((item) => {
      params.append("equipment", item);
    });
    selectedMuscles.forEach((item) => {
      params.append("muscles", item);
    });

    const queryString = params.toString();
    const url = `http://localhost:8080/api/exercises${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching exercises from URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExercisesData(data);
    } catch (e) {
      let errorMessage = "An unknown error occurred.";
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === "string") {
        errorMessage = e;
      }
      setExercisesError(errorMessage);
      console.error("Exercises Fetch Error:", e);
    } finally {
      setLoadingExercises(false);
    }
  }, [selectedEquipment, selectedMuscles]);

  // --- 3. Clear Filters Function ---
  const handleClearFilters = () => {
    setSelectedEquipment([]);
    setSelectedMuscles([]);
    setExercisesData(null);
    setExercisesError(null);
  };

  // --- Helper to handle onChange for multiple select ---
  const handleMultiSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const options = event.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setter(selectedValues);
  };

  return (
    <div className="api-tester-container">
      <h2>Go API Tester (Multi-Select)</h2>

      <div className="filter-inputs">
        {loadingOptions ? (
          <p>Loading filter options...</p>
        ) : optionsError ? (
          <p className="error-message">Error loading options: {optionsError}</p>
        ) : (
          <>
            <label>
              Equipment:
              <select
                multiple
                value={selectedEquipment}
                onChange={(e) => handleMultiSelectChange(e, setSelectedEquipment)}
              >
                {/* Defensive check: Ensure equipmentOptions is an array before mapping */}
                {equipmentOptions && Array.isArray(equipmentOptions) && equipmentOptions.length > 0 ? (
                  equipmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option value="">No Equipment Found</option>
                )}
              </select>
            </label>
            <label>
              Muscles:
              <select
                multiple
                value={selectedMuscles}
                onChange={(e) => handleMultiSelectChange(e, setSelectedMuscles)}
              >
                {/* Defensive check: Ensure musclesOptions is an array before mapping */}
                {musclesOptions && Array.isArray(musclesOptions) && musclesOptions.length > 0 ? (
                  musclesOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))
                ) : (
                  <option value="">No Muscles Found</option>
                )}
              </select>
            </label>
          </>
        )}
      </div>

      <div className="filter-inputs">
        <div style={{ color: "black" }}>
          <strong>List of selected equipment:</strong>
          <ul>
            {selectedEquipment.length > 0 ? (
              selectedEquipment.map((item) => (
                <li key={item}>{item}</li>
              ))
            ) : (
              <li>None selected</li>
            )}
          </ul>

          <strong>List of selected muscles:</strong>
          <ul>
            {selectedMuscles.length > 0 ? (
              selectedMuscles.map((item) => (
                <li key={item}>{item}</li>
              ))
            ) : (
              <li>None selected</li>
            )}
          </ul>
        </div>
      </div>

      <div className="filter-inputs">
        <button
          onClick={handleFetchExercises}
          disabled={loadingExercises || loadingOptions}
        >
          {loadingExercises ? "Fetching Exercises..." : "Fetch Exercises"}
        </button>
        <button
          onClick={handleClearFilters}
          disabled={loadingExercises}
        >
          Clear Filters & Results
        </button>
      </div>

      <div className="results-area">
        {exercisesError && <p className="error-message">Error: {exercisesError}</p>}
        {exercisesData && (
          <>
            <h3>Results ({exercisesData.length} exercises found):</h3>
            <pre className="json-output">{JSON.stringify(exercisesData, null, 2)}</pre>
          </>
        )}
        {!loadingExercises && !exercisesError && !exercisesData && (
          <p>Select filters (Ctrl/Cmd + click for multiple) and click 'Fetch Exercises' to see data.</p>
        )}
      </div>
    </div>
  );
}

export default ApiTester;