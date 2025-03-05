import React from "react";
import { useWorkout } from "../context/WorkoutContext.tsx";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const { settings, workoutState, setWorkoutState } = useWorkout();
    const navigate = useNavigate();

    const startWorkout = () => {
        if (workoutState.currentPlan) {
            setWorkoutState({ ...workoutState, isStarted: true });
            navigate("/preview");
        }
    };

    return (
        <div>
            <div className="card">
                <h1>{settings.name ? `Welcome, ${settings.name}!` : "Welcome!"}</h1>
            </div>
            <div className="card">
                {workoutState.currentPlan ? (
                    <>
                        <h2>Current Workout</h2>
                        <ul>
                            {workoutState.currentPlan.exercises.map((ex) => (
                                <li key={ex.exercise}>
                                    {ex.exercise} - {ex.reps.join(", ")} reps
                                </li>
                            ))}
                        </ul>
                        <button onClick={startWorkout}>
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