import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const { workoutPlans, workoutState, setWorkoutState } = useWorkout();
    const navigate = useNavigate();

    const handleStartWorkout = () => {
        if (workoutPlans.length > 0) {
            const latestPlan = workoutPlans[workoutPlans.length - 1];
            setWorkoutState({
                currentPlan: latestPlan,
                isStarted: true,
                currentExerciseIndex: 0,
                currentSetIndex: 0,
                repsCompleted: [],
                weightsUsed: [],
            });
            navigate("/exercise");
        }
    };

    const handleResumeWorkout = () => {
        if (workoutState.currentPlan && workoutState.isStarted) {
            // Resume at currentExerciseIndex and currentSetIndex
            navigate("/exercise");
        } else if (workoutPlans.length > 0) {
            // Fallback: Start the latest plan if no active workout
            handleStartWorkout();
        } else {
            // No workouts available
            navigate("/create");
        }
    };

    return (
        <div className="home-page">
            <h1>Home</h1>
            <div className="card">
                <h2>Workout</h2>
                {workoutState.currentPlan && workoutState.currentPlan.exercises.length > 0 ? (
                    <>
                        <p>{workoutState.currentPlan.name || "Unnamed Workout"}</p>
                        {workoutState.currentPlan.exercises.map((exercise, index) => (
                            <p key={index}>
                                {exercise.exercise}: {exercise.reps.join(", ")} reps
                            </p>
                        ))}
                        <span>
                            <button onClick={handleStartWorkout}>Start Workout</button>
                            {workoutState.isStarted && (
                                <button onClick={handleResumeWorkout}>Resume Workout</button>
                            )}
                        </span>
                    </>
                ) : workoutPlans.length > 0 ? (
                    <>
                        <p>Latest Plan: {workoutPlans[workoutPlans.length - 1].name || "Unnamed"}</p>
                        <button onClick={handleStartWorkout}>Start Workout</button>
                    </>
                ) : (
                    <p>No workouts created yet. Go to /create to make one!</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;