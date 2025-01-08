import { FaDumbbell } from 'react-icons/fa';

export const EquipmentNames =
{
    Barbell: "Barbell",
    BarbellBench: "Barbell + Bench",
    BarbellSquatRack: "Barbell + Squat Rack",
    ChestPressMachine: "Chest Press Machine",
    Dumbells: "Dumbells",
    EzBar: "EZ Bar",
    LatPulldownMachine: "Lat Pulldown Machine",
    LegCurlMachine: "Leg Curl Machine",
    LegExtensionMachine: "Leg Extension Machine",
    LegPressMachine: "Leg Press Machine",
    SmithMachine: "Smith Machine",
    SmithMachineBench: "Smith Machine + Bench",
};

// Equipment Interface
export interface EquipmentInterface {
    name: string;
    enabled: boolean;
}

export type EquipmentList = EquipmentInterface[];

export const DefaultEquipment: EquipmentList = [
    { name: EquipmentNames.BarbellSquatRack, enabled: true },
    { name: EquipmentNames.SmithMachineBench, enabled: true },
    { name: EquipmentNames.LegExtensionMachine, enabled: true },
    { name: EquipmentNames.LegCurlMachine, enabled: true },
    { name: EquipmentNames.LegPressMachine, enabled: true },
    { name: EquipmentNames.Barbell, enabled: true },
    { name: EquipmentNames.Dumbells, enabled: true },
    { name: EquipmentNames.EzBar, enabled: true },
    { name: EquipmentNames.BarbellBench, enabled: true },
    { name: EquipmentNames.ChestPressMachine, enabled: true },
    { name: EquipmentNames.LatPulldownMachine, enabled: true },
    { name: EquipmentNames.SmithMachine, enabled: true }
];

export const EquipmentIcons: { [key: string]: JSX.Element } = {
    Barbell: <FaDumbbell size={48} />,
    BarbellBench: <FaDumbbell size={48} />,
    BarbellSquatRack: <FaDumbbell size={48} />,
    ChestPressMachine: <FaDumbbell size={48} />,
    Dumbells: <FaDumbbell size={48} />,
    EzBar: <FaDumbbell size={48} />,
    LatPulldownMachine: <FaDumbbell size={48} />,
    LegCurlMachine: <FaDumbbell size={48} />,
    LegExtensionMachine: <FaDumbbell size={48} />,
    LegPressMachine: <FaDumbbell size={48} />,
    SmithMachine: <FaDumbbell size={48} />,
    SmithMachineBench: <FaDumbbell size={48} />
};

export const GetIconForEquipment = (equipment: string) => {
    const key = Object.keys(EquipmentNames).find(key => EquipmentNames[key as keyof typeof EquipmentNames] === equipment);
    return key ? EquipmentIcons[key] : null;
}