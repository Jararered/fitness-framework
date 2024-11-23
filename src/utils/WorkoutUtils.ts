import { Workout, Exercise } from "../interfaces/Workout";

export const logWorkout = (workoutState: Workout) => {
    const loggedWorkouts = JSON.parse(localStorage.getItem('loggedWorkouts') || '[]');
    loggedWorkouts.push(workoutState);
    localStorage.setItem('loggedWorkouts', JSON.stringify(loggedWorkouts));
};

export const logWeight = (currentExercise: Exercise, currentSet: any, weight: number) => {
    // Log the weight for the exercise and set
    const loggedWeights = JSON.parse(localStorage.getItem('loggedWeights') || '[]');
    loggedWeights.push({
        date: new Date().toISOString(),
        exercise: currentExercise.name,
        reps: currentSet.reps,
        weight: weight,
    });
    localStorage.setItem('loggedWeights', JSON.stringify(loggedWeights));


    // Update the max weight for the exercise if it's higher than the current max
    const loggedMaxWeights = JSON.parse(localStorage.getItem('loggedMaxWeights') || '{}');
    if (!loggedMaxWeights[currentExercise.name] || weight > loggedMaxWeights[currentExercise.name].weight) {
        loggedMaxWeights[currentExercise.name] = {
            weight: weight,
            date: new Date().toISOString(),
        };
        localStorage.setItem('loggedMaxWeights', JSON.stringify(loggedMaxWeights));
    }

    // Update the last weight for the exercise
    const loggedLastWeights = JSON.parse(localStorage.getItem('loggedLastWeights') || '{}');
    loggedLastWeights[currentExercise.name] = {
        exercise: currentExercise.name,
        weight: weight
    };
    localStorage.setItem('loggedLastWeights', JSON.stringify(loggedLastWeights));
}