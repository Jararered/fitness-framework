import { Sets } from "../../interfaces/Exercise";

export const FormatSets = (sets: Sets): string => {
    return sets.join(', ');
};
