import { useSettingStore } from "../hooks/useSettingStore";
import { LuUser, LuWeight, LuRuler } from "react-icons/lu";

import { WeightInput } from "./WeightInput";
import { MetricHeightInput, ImperialHeightInput } from "./HeightInput";

export const UserSettings = () => {
  const { name, setName, unit } = useSettingStore();

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>User Settings</h2>
        <p>
          Below are your user settings. <br />
          All info is optional and stored locally.
        </p>
      </div>

      <div className="card-content">
        <div className="flex-row flex-grow">
          <div className="flex-row flex-grow">
            <LuUser />
            <strong>Name</strong>
          </div>
          <div className="flex-row flex-shrink">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-row flex-grow">
          <div className="flex-row flex-grow">
            <LuWeight />
            <strong>Weight</strong>
          </div>
          <div className="flex-row flex-shrink">
            <WeightInput />
          </div>
        </div>

        <div className="flex-row flex-grow">
          <div className="flex-row flex-grow">
            <LuRuler />
            <strong>Height</strong>
          </div>
          <div className="flex-row flex-shrink">
            {unit === "imperial" ? <ImperialHeightInput /> : <MetricHeightInput />}
          </div>
        </div>
      </div>
    </div>
  );
};
