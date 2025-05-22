import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

import { TimerCircular } from "../../layout/components/TimerCircular.tsx";
import { DividerSpaced } from "../../layout/components/DividerSpaced.tsx";

import { useWorkoutStore } from "../../workouts/hooks/useWorkoutStore.ts";
import { useSettingStore } from "../../settings/hooks/useSettingStore.ts";

import { getRandomQuote } from "../../quotes/services/quotes.service.ts";

import { ExerciseUpNext } from "./ExerciseUpNext.tsx";
import ExerciseMuscleLoad from "./ExerciseMuscleLoad.tsx";

import "./ExercisePreviewPage.css";

const ExercisePreviewPage: React.FC = () => {
  const { workoutState } = useWorkoutStore();
  const { quoteMode, weightUnit } = useSettingStore();
  const navigate = useNavigate();

  const [isTimerDone, setIsTimerDone] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const breakTime = 60;

  const quote = useMemo(() => getRandomQuote(quoteMode), [quoteMode]);

  if (!workoutState.currentPlan) return <div>No workout loaded</div>;

  /* These should always be valid since this page is only called after an exercise has been completed */
  /* Last exercise, last set of last exercise */
  const lastExerciseReps = 1;
  const lastExerciseWeight = 1;

  return (
    <div className="exercise-preview-page">
      <div className="card-container">
        <div className="quote-container">
          <div className="quote">{quote.text}</div>
          <div className="author">{quote.author}</div>
        </div>

        <DividerSpaced
          center={
            <div className="break-timer-container">
              <div className="break-timer-text">REST</div>
              <TimerCircular
                duration={breakTime}
                reset={resetTimer}
                onComplete={() => setIsTimerDone(true)}
              />
            </div>
          }
          right={
            <div className="navigation-button-container">
              <button
                className={`icon ${isTimerDone ? "" : "caution"}`}
                onClick={() => {
                  setResetTimer(true);
                  navigate("/exercise");
                }}
              >
                <LuArrowRight size={24} />
              </button>
              <div className="navigation-button-text">{isTimerDone ? "Next" : "Skip Break"}</div>
            </div>
          }
        />
        <ExerciseMuscleLoad
          reps={lastExerciseReps}
          weight={lastExerciseWeight}
          units={weightUnit}
          totalWeight={workoutState.weightsUsed.flat().reduce((sum: number, val: number) => sum + (val || 0), 0)}
        />
      </div>
      <ExerciseUpNext
        name={
          workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises[
            workoutState.currentExerciseIndex
          ].exercise
        }
        reps={
          workoutState.currentPlan.circuits[workoutState.currentCircuitIndex].exercises[
            workoutState.currentExerciseIndex
          ].reps[workoutState.currentSetIndex]
        }
      />
    </div>
  );
};

export default ExercisePreviewPage;
