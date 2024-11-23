export interface Set {
    reps: number;
    weight?: number;
}

export interface Exercise {
    name: string;
    sets: Set[];
}

export interface SavedWorkout {
    name: string;
    exercises: Exercise[];
}

export interface WorkoutSummaryProps {
    workoutState: Workout;
    onFinish: () => void;
}

export interface WorkoutInProgressProps {
    onCompleteWorkout: () => void;
}

export interface ExerciseWeight {
    exercise: string;
    weight: number;
}

export interface Workout {
    exercises: Exercise[] | null;
    startTime: string;
    endTime: string;
    isFreestyle?: boolean;
}

export interface WorkoutIndexer {
    currentExerciseIndex: number;
    currentSetIndex: number;
}

export interface WeightTracking {
    currentWeights: number[];
    maxWeights: { [key: string]: number };
    lastWeights: { [key: string]: ExerciseWeight };
}

export interface WorkoutFreestyleProps {
    onCompleteWorkout: () => void;
    existingWorkoutState: any;
    isNewWorkout?: boolean;
}

export interface WorkoutOverviewProps {
    onOpenWorkout: () => void;
}