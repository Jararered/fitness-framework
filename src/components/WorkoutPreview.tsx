import { useNavigate } from "react-router-dom";
import { useWorkout } from "../context/WorkoutContext";

import { DividerSpaced } from "./DividerSpaced";

import "../styles/components/WorkoutPreview.css";

const WorkoutPreview: React.FC = () => {
    const { workoutState, setWorkoutState } = useWorkout();
    const navigate = useNavigate();

    const handleStartWorkout = () => {
        if (workoutState.currentPlan) {
            // Start the current plan from the beginning
            setWorkoutState({
                ...workoutState,
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
            navigate("/exercise");
        }
    };

    return (
        <div className="workout-preview">
            {workoutState.currentPlan?.name ? <h2>{workoutState.currentPlan.name}</h2> : <h2>Workout Preview</h2>}
            {workoutState.currentPlan?.exercises ? (
                <div className="workout-preview-exercises">
                    {workoutState.currentPlan.exercises.map((exercise, key) => (
                        <DividerSpaced key={key} left={<strong>{exercise.exercise}</strong>} right={<p>{exercise.reps.join(", ")} reps</p>} />
                    ))}
                    {workoutState.isStarted ? <button onClick={handleResumeWorkout}>Resume Workout</button> : <button onClick={handleStartWorkout}>Start Workout</button>}
                </div>
            ) : (
                <p>No workout loaded yet.</p>
            )}
        </div>
    );
};

export default WorkoutPreview;
