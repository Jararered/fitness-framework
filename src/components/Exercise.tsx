export interface Set {
    reps: number;
    weight?: number;
}

export interface Exercise {
    name: string;
    sets: Set[];
}