import { FaDumbbell } from "react-icons/fa";

export type EquipmentName =
    "Barbell" |
    "Barbell + Bench" |
    "Barbell + Squat Rack" |
    "Chest Press Machine" |
    "Dumbells" |
    "EZ Bar" |
    "EZ Bar + Bench" |
    "Lat Pulldown Machine" |
    "Leg Curl Machine" |
    "Leg Extension Machine" |
    "Leg Press Machine" |
    "Smith Machine" |
    "Smith Machine + Bench";

export type EquipmentConfig = {
    enabled: boolean;
};

export interface Equipment {
    name: EquipmentName;
    config: EquipmentConfig;
}

export const EquipmentIcons: { [K in EquipmentName]: JSX.Element } = {
    "Barbell": <FaDumbbell size={40} />,
    "Barbell + Bench": <FaDumbbell size={40} />,
    "Barbell + Squat Rack": <FaDumbbell size={40} />,
    "Chest Press Machine": <FaDumbbell size={40} />,
    "Dumbells": <FaDumbbell size={40} />,
    "EZ Bar": <FaDumbbell size={40} />,
    "EZ Bar + Bench": <FaDumbbell size={40} />,
    "Lat Pulldown Machine": <FaDumbbell size={40} />,
    "Leg Curl Machine": <FaDumbbell size={40} />,
    "Leg Extension Machine": <FaDumbbell size={40} />,
    "Leg Press Machine": <FaDumbbell size={40} />,
    "Smith Machine": <FaDumbbell size={40} />,
    "Smith Machine + Bench": <FaDumbbell size={40} />
};

export const GetIconForEquipment = (equipment: EquipmentName) => {
    return EquipmentIcons[equipment];
}