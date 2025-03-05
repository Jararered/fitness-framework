import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const { settings, workoutState, setWorkoutState } = useWorkout();
    const navigate = useNavigate();

    const handleStartWorkout = () => {
        if (workoutState.currentPlan) {
            setWorkoutState({ ...workoutState, isStarted: true });
            navigate("/preview");
        }
    };

    return (
        <div className="home-page">
            <h1>{settings.name ? `Welcome, ${settings.name}!` : "Welcome!"}</h1>
            <div className="card">
                {workoutState.currentPlan ? (
                    <>
                        <h2>Current Workout</h2>
                        {workoutState.currentPlan.exercises.map((ex) => (
                            <p key={ex.exercise}>
                                {ex.exercise} - {ex.reps.join(", ")} reps
                            </p>
                        ))}
                        <button onClick={handleStartWorkout}>
                            {workoutState.isStarted ? "Resume Workout" : "Start Workout"}
                        </button>
                    </>
                ) : (
                    <>
                        <p>No workout loaded. Create one to get started!</p>
                        <button onClick={() => navigate("/create")}>Create Workout</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;