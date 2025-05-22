import { useSettingStore, WeightUnit } from "../hooks/useSettingStore";

// Weight conversion functions
const gramsToLbs = (grams: number) => {
  return Math.round((grams / 453.592) * 10) / 10;
};

const lbsToGrams = (lbs: number) => {
  return Math.round(lbs * 453.592);
};

const gramsToKg = (grams: number) => {
  return Math.round(grams / 100) / 10;
};

const kgToGrams = (kg: number) => {
  return Math.round(kg * 1000);
};

const calculateDisplayWeight = (weightUnit: WeightUnit, weightInGrams: number) => {
  switch (weightUnit) {
    case WeightUnit.Lbs:
      return gramsToLbs(weightInGrams);
    case WeightUnit.Kg:
      return gramsToKg(weightInGrams);
    default:
      return 0;
  }
};

const calculateWeightInGrams = (weightUnit: WeightUnit, value: number) => {
  switch (weightUnit) {
    case WeightUnit.Lbs:
      return lbsToGrams(value);
    case WeightUnit.Kg:
      return kgToGrams(value);
    default:
      return 0;
  }
};

export const WeightInput = () => {
  const { weightUnit, weightInGrams, setWeightInGrams } = useSettingStore();

  const displayWeight = calculateDisplayWeight(weightUnit, weightInGrams);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setWeightInGrams(calculateWeightInGrams(weightUnit, value));
  };

  return (
    <span className="weight-input-container">
      <input
        className="number-input"
        type="number"
        step="1"
        inputMode="decimal"
        value={displayWeight}
        onChange={handleWeightChange}
      />
      <strong className="units">{weightUnit}</strong>
    </span>
  );
};
