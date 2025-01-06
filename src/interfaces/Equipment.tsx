import { FaDumbbell } from 'react-icons/fa';

// Equipment Type
export type EquipmentType =
    "Barbell + Bench" |
    "Barbell + Squat Rack" |
    "Barbell" |
    "Chest Press Machine" |
    "Dumbells + Bench" |
    "Dumbells" |
    "EZ Bar" |
    "Smith Machine" |
    "Lat Pulldown Machine" |
    "Leg Curl Machine" |
    "Leg Extension Machine" |
    "Leg Press Machine" |
    "Smith Machine + Bench";

// Equipment Interface
export interface EquipmentInterface {
    name: EquipmentType;
    enabled: boolean;
}

export type EquipmentList = EquipmentInterface[];

export const DefaultEquipment: EquipmentList = [
    { name: "Barbell + Squat Rack", enabled: true },
    { name: "Smith Machine + Bench", enabled: true },
    { name: "Leg Extension Machine", enabled: true },
    { name: "Leg Curl Machine", enabled: true },
    { name: "Leg Press Machine", enabled: true },
    { name: "Barbell", enabled: true },
    { name: "Dumbells", enabled: true },
    { name: "EZ Bar", enabled: true },
    { name: "Barbell + Bench", enabled: true },
    { name: "Chest Press Machine", enabled: true },
    { name: "Lat Pulldown Machine", enabled: true },
    { name: "Smith Machine", enabled: true }
];

export const EquipmentIcons: { [key: string]: JSX.Element } = {
    "Barbell + Squat Rack": <FaDumbbell size={48} />,
    "Smith Machine + Bench": <FaDumbbell size={48} />,
    "Leg Extension Machine": <FaDumbbell size={48} />,
    "Leg Curl Machine": <FaDumbbell size={48} />,
    "Leg Press Machine": <FaDumbbell size={48} />,
    "Barbell": <FaDumbbell size={48} />,
    "Dumbells": <FaDumbbell size={48} />,
    "EZ Bar": <FaDumbbell size={48} />,
    "Barbell + Bench": <FaDumbbell size={48} />,
    "Chest Press Machine": <FaDumbbell size={48} />,
    "Lat Pulldown Machine": <FaDumbbell size={48} />,
    "Smith Machine": <FaDumbbell size={48} />
};