import { useNavigate } from "react-router-dom";
import { useWorkout } from "../context/WorkoutContext";
import { LuPlay } from "react-icons/lu";

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
        <div className="workout-preview component">
            <div className="card-header">
                {workoutState.currentPlan?.name ? <label>{workoutState.currentPlan.name}</label> : ""}
            </div>

            <div className="card-content">
                {workoutState.currentPlan?.exercises ? (
                    <>
                        {workoutState.currentPlan.exercises.map((exercise, key) => (
                            <span className="card-row">
                                <label>{exercise.exercise}</label>
                                <p>{exercise.reps.join(", ")} reps</p>
                            </span>
                        ))}

                        {workoutState.isStarted ? (
                            <button onClick={handleResumeWorkout}>
                                Resume Workout
                                <LuPlay />
                            </button>
                        ) : (
                            <button onClick={handleStartWorkout}>
                                Start Workout
                                <LuPlay />
                            </button>
                        )}
                    </>
                ) : (
                    <strong>No workout loaded yet.</strong>
                )}
            </div>
        </div>
    );
};

export default WorkoutPreview;
