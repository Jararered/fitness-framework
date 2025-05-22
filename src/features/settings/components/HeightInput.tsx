import { useSettingStore } from "../hooks/useSettingStore";

// This function calculates the height in cm from the height in feet and inches
const calculateHeightCm = (feet: number, inches: number) => {
  return (feet * 12 + inches) * 2.54;
};

// This function calculates the height in feet and inches from the height in cm
const calculateHeightImperial = (cm: number) => {
  const feet = Math.floor(cm / 30.48);
  const inches = Math.round((cm % 30.48) / 2.54);
  return { feet, inches };
};

const MetricHeightInput = () => {
  const { height, setHeight } = useSettingStore();

  return (
    <span className="height-input-container">
      <input
        className="number-input"
        type="number"
        value={height}
        inputMode="decimal"
        onChange={(e) => setHeight(Number(e.target.value))}
      />
      <div className="units-strong">cm</div>
    </span>
  );
};

const ImperialHeightInput = () => {
  const { height, setHeight } = useSettingStore();
  const { feet, inches } = calculateHeightImperial(height);

  return (
    <span className="imperial-height-input-container">
      <input
        className="number-input"
        type="number"
        value={feet}
        inputMode="numeric"
        onChange={(e) => {
          const newFeet = Number(e.target.value);
          const heightCm = calculateHeightCm(newFeet, inches);
          setHeight(heightCm);
        }}
        placeholder="ft"
        min="0"
      />
      <div className="units-strong">ft</div>
      <input
        className="number-input"
        type="number"
        value={inches}
        inputMode="numeric"
        onChange={(e) => {
          const newInches = Number(e.target.value);
          const heightCm = calculateHeightCm(feet, newInches);
          setHeight(heightCm);
        }}
        placeholder="in"
        min="0"
        max="11"
      />
      <div className="units-strong">in</div>
    </span>
  );
};

export { MetricHeightInput, ImperialHeightInput };
