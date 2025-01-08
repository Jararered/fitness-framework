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
    "Barbell": <FaDumbbell size={48} />,
    "Barbell + Bench": <FaDumbbell size={48} />,
    "Barbell + Squat Rack": <FaDumbbell size={48} />,
    "Chest Press Machine": <FaDumbbell size={48} />,
    "Dumbells": <FaDumbbell size={48} />,
    "EZ Bar": <FaDumbbell size={48} />,
    "EZ Bar + Bench": <FaDumbbell size={48} />,
    "Lat Pulldown Machine": <FaDumbbell size={48} />,
    "Leg Curl Machine": <FaDumbbell size={48} />,
    "Leg Extension Machine": <FaDumbbell size={48} />,
    "Leg Press Machine": <FaDumbbell size={48} />,
    "Smith Machine": <FaDumbbell size={48} />,
    "Smith Machine + Bench": <FaDumbbell size={48} />
};

export const DefaultEquipment: Equipment[] = [
    { name: "Barbell", config: { enabled: true } },
    { name: "Barbell + Bench", config: { enabled: true } },
    { name: "Barbell + Squat Rack", config: { enabled: true } },
    { name: "Chest Press Machine", config: { enabled: true } },
    { name: "Dumbells", config: { enabled: true } },
    { name: "EZ Bar", config: { enabled: true } },
    { name: "EZ Bar + Bench", config: { enabled: true } },
    { name: "Lat Pulldown Machine", config: { enabled: true } },
    { name: "Leg Curl Machine", config: { enabled: true } },
    { name: "Leg Extension Machine", config: { enabled: true } },
    { name: "Leg Press Machine", config: { enabled: true } },
    { name: "Smith Machine", config: { enabled: true } },
    { name: "Smith Machine + Bench", config: { enabled: true } }
];

export const GetIconForEquipment = (equipment: EquipmentName) => {
    return EquipmentIcons[equipment];
}