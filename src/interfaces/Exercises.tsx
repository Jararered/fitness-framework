import { EquipmentNames } from "./Equipment";

export const ExerciseNames =
{
    BarbellBenchPress: "Barbell Bench Press",
    BarbellBentOverRow: "Barbell Bent-Over Row",
    BarbellCurl: "Barbell Curl",
    BarbellDeadlift: "Barbell Deadlift",
    BarbellDeclineBenchPress: "Barbell Decline Bench Press",
    BarbellFrontSquat: "Barbell Front Squat",
    BarbellInclineBenchPress: "Barbell Incline Bench Press",
    BarbellLunge: "Barbell Lunge",
    BarbellOverheadPress: "Barbell Overhead Press",
    BarbellRomanianDeadlift: "Barbell Romanian Deadlift",
    BarbellSquat: "Barbell Squat",
    BarbellSumoDeadlift: "Barbell Sumo Deadlift",
    DumbbellBentOverRow: "Dumbbell Bent-Over Row",
    DumbbellBicepCurl: "Dumbbell Bicep Curl",
    DumbbellFrontRaise: "Dumbbell Front Raise",
    DumbbellHammerCurl: "Dumbbell Hammer Curl",
    DumbbellLateralRaise: "Dumbbell Lateral Raise",
    DumbbellLunges: "Dumbbell Lunges",
    DumbbellShoulderPress: "Dumbbell Shoulder Press",
    DumbbellShrugs: "Dumbbell Shrugs",
    DumbbellSingleArmRow: "Dumbbell Single-Arm Row",
    DumbbellSkullCrushers: "Dumbbell Skull Crushers",
    DumbbellTricepExtension: "Dumbbell Tricep Extension",
    DumbbellUprightRow: "Dumbbell Upright Row",
    EzBarCloseGripCurl: "EZ Bar Close-Grip Curl",
    EzBarCurl: "EZ Bar Curl",
    EzBarSkullCrusher: "EZ Bar Skull Crusher",
    EzBarWideGripCurl: "EZ Bar Wide-Grip Curl",
    LatPulldown: "Lat Pulldown",
    LatPulldownBehindTheHead: "Lat Pulldown Behind-the-Head",
    LatPulldownNarrowGrip: "Lat Pulldown Narrow-Grip",
    LatPulldownReverseGrip: "Lat Pulldown Reverse-Grip",
    LatPulldownSingleArm: "Lat Pulldown Single-Arm",
    LatPulldownWideGrip: "Lat Pulldown Wide-Grip",
    LegCurl: "Leg Curl",
    LegCurlIsometricHold: "Leg Curl + Isometric Hold",
    LegExtension: "Leg Extension",
    LegExtensionIsometricHold: "Leg Extension + Isometric Hold",
    LegPress: "Leg Press",
    MachineChestPress: "Machine Chest Press",
    MachineInclineChestPress: "Machine Incline Chest Press",
    MachineShoulderPress: "Machine Shoulder Press",
    SmithMachineBenchPress: "Smith Machine Bench Press",
    SmithMachineBentOverRow: "Smith Machine Bent-Over Row",
    SmithMachineCloseGripBenchPress: "Smith Machine Close-Grip Bench Press",
    SmithMachineInclineBenchPress: "Smith Machine Incline Bench Press",
    SmithMachineLunges: "Smith Machine Lunges",
    SmithMachineOverheadPress: "Smith Machine Overhead Press",
    SmithMachineShrugs: "Smith Machine Shrugs",
    SmithMachineSquat: "Smith Machine Squat",
};

// Exercise Type
export type ExerciseType =
    "Legs" |
    "Biceps" |
    "Triceps" |
    "Chest" |
    "Back" |
    "Shoulders";

// Exercise Interface
interface ExerciseInterface {
    name: string;
    equipment: string;
    category: ExerciseType;
    enabled: boolean;
}

export type ExerciseList = ExerciseInterface[];

// Exercises
export const DefaultExercises: ExerciseList = [
    { name: ExerciseNames.BarbellSquat, equipment: EquipmentNames.BarbellSquatRack, category: "Legs", enabled: true },
    { name: ExerciseNames.BarbellFrontSquat, equipment: EquipmentNames.BarbellSquatRack, category: "Legs", enabled: true },
    { name: ExerciseNames.BarbellLunge, equipment: EquipmentNames.BarbellSquatRack, category: "Legs", enabled: true },
    { name: ExerciseNames.SmithMachineSquat, equipment: EquipmentNames.SmithMachineBench, category: "Legs", enabled: true },
    { name: ExerciseNames.SmithMachineLunges, equipment: EquipmentNames.SmithMachineBench, category: "Legs", enabled: true },
    { name: ExerciseNames.LegExtension, equipment: EquipmentNames.LegExtensionMachine, category: "Legs", enabled: true },
    { name: ExerciseNames.LegExtensionIsometricHold, equipment: EquipmentNames.LegExtensionMachine, category: "Legs", enabled: true },
    { name: ExerciseNames.LegCurl, equipment: EquipmentNames.LegCurlMachine, category: "Legs", enabled: true },
    { name: ExerciseNames.LegCurlIsometricHold, equipment: EquipmentNames.LegCurlMachine, category: "Legs", enabled: true },
    { name: ExerciseNames.LegPress, equipment: EquipmentNames.LegPressMachine, category: "Legs", enabled: true },
    { name: ExerciseNames.BarbellDeadlift, equipment: EquipmentNames.Barbell, category: "Legs", enabled: true },
    { name: ExerciseNames.BarbellSumoDeadlift, equipment: EquipmentNames.Barbell, category: "Legs", enabled: true },
    { name: ExerciseNames.BarbellRomanianDeadlift, equipment: EquipmentNames.BarbellSquatRack, category: "Legs", enabled: true },
    { name: ExerciseNames.DumbbellLunges, equipment: EquipmentNames.Dumbells, category: "Legs", enabled: true },
    { name: ExerciseNames.DumbbellBicepCurl, equipment: EquipmentNames.Dumbells, category: "Biceps", enabled: true },
    { name: ExerciseNames.DumbbellHammerCurl, equipment: EquipmentNames.Dumbells, category: "Biceps", enabled: true },
    { name: ExerciseNames.BarbellCurl, equipment: EquipmentNames.Barbell, category: "Biceps", enabled: true },
    { name: ExerciseNames.EzBarCurl, equipment: EquipmentNames.EzBar, category: "Biceps", enabled: true },
    { name: ExerciseNames.EzBarWideGripCurl, equipment: EquipmentNames.EzBar, category: "Biceps", enabled: true },
    { name: ExerciseNames.EzBarCloseGripCurl, equipment: EquipmentNames.EzBar, category: "Biceps", enabled: true },
    { name: ExerciseNames.DumbbellTricepExtension, equipment: EquipmentNames.Dumbells, category: "Triceps", enabled: true },
    { name: ExerciseNames.DumbbellSkullCrushers, equipment: EquipmentNames.Dumbells, category: "Triceps", enabled: true },
    { name: ExerciseNames.EzBarSkullCrusher, equipment: EquipmentNames.EzBar, category: "Triceps", enabled: true },
    { name: ExerciseNames.BarbellBenchPress, equipment: EquipmentNames.BarbellBench, category: "Chest", enabled: true },
    { name: ExerciseNames.BarbellInclineBenchPress, equipment: EquipmentNames.BarbellBench, category: "Chest", enabled: true },
    { name: ExerciseNames.BarbellDeclineBenchPress, equipment: EquipmentNames.BarbellBench, category: "Chest", enabled: true },
    { name: ExerciseNames.SmithMachineBenchPress, equipment: EquipmentNames.SmithMachineBench, category: "Chest", enabled: true },
    { name: ExerciseNames.SmithMachineCloseGripBenchPress, equipment: EquipmentNames.SmithMachineBench, category: "Chest", enabled: true },
    { name: ExerciseNames.SmithMachineInclineBenchPress, equipment: EquipmentNames.SmithMachineBench, category: "Chest", enabled: true },
    { name: ExerciseNames.MachineChestPress, equipment: EquipmentNames.ChestPressMachine, category: "Chest", enabled: true },
    { name: ExerciseNames.MachineInclineChestPress, equipment: EquipmentNames.ChestPressMachine, category: "Chest", enabled: true },
    { name: ExerciseNames.DumbbellBentOverRow, equipment: EquipmentNames.Dumbells, category: "Back", enabled: true },
    { name: ExerciseNames.DumbbellSingleArmRow, equipment: EquipmentNames.Dumbells, category: "Back", enabled: true },
    { name: ExerciseNames.BarbellBentOverRow, equipment: EquipmentNames.Barbell, category: "Back", enabled: true },
    { name: ExerciseNames.LatPulldown, equipment: EquipmentNames.LatPulldownMachine, category: "Back", enabled: true },
    { name: ExerciseNames.LatPulldownWideGrip, equipment: EquipmentNames.LatPulldownMachine, category: "Back", enabled: true },
    { name: ExerciseNames.LatPulldownNarrowGrip, equipment: EquipmentNames.LatPulldownMachine, category: "Back", enabled: true },
    { name: ExerciseNames.LatPulldownReverseGrip, equipment: EquipmentNames.LatPulldownMachine, category: "Back", enabled: true },
    { name: ExerciseNames.LatPulldownSingleArm, equipment: EquipmentNames.LatPulldownMachine, category: "Back", enabled: true },
    { name: ExerciseNames.LatPulldownBehindTheHead, equipment: EquipmentNames.LatPulldownMachine, category: "Back", enabled: true },
    { name: ExerciseNames.SmithMachineBentOverRow, equipment: EquipmentNames.SmithMachine, category: "Back", enabled: true },
    { name: ExerciseNames.DumbbellShoulderPress, equipment: EquipmentNames.Dumbells, category: "Shoulders", enabled: true },
    { name: ExerciseNames.DumbbellLateralRaise, equipment: EquipmentNames.Dumbells, category: "Shoulders", enabled: true },
    { name: ExerciseNames.DumbbellFrontRaise, equipment: EquipmentNames.Dumbells, category: "Shoulders", enabled: true },
    { name: ExerciseNames.DumbbellShrugs, equipment: EquipmentNames.Dumbells, category: "Shoulders", enabled: true },
    { name: ExerciseNames.DumbbellUprightRow, equipment: EquipmentNames.Dumbells, category: "Shoulders", enabled: true },
    { name: ExerciseNames.BarbellOverheadPress, equipment: EquipmentNames.Barbell, category: "Shoulders", enabled: true },
    { name: ExerciseNames.SmithMachineOverheadPress, equipment: EquipmentNames.SmithMachine, category: "Shoulders", enabled: true },
    { name: ExerciseNames.SmithMachineShrugs, equipment: EquipmentNames.SmithMachine, category: "Shoulders", enabled: true },
    { name: ExerciseNames.MachineShoulderPress, equipment: EquipmentNames.ChestPressMachine, category: "Shoulders", enabled: true },
];

