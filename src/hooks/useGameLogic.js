import { useState, useEffect, useRef } from "react";

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("shapeLooker_best");
    return saved ? parseInt(saved, 10) : 0;
  });

  // We use a Ref here because we want to track this "lock"
  // without triggering extra re-renders.
  const hasVibratedForRecord = useRef(false);

  const [timeLeft, setTimeLeft] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // 1. BEST SCORE & VIBRATION LOGIC
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("shapeLooker_best", score.toString());

      // Only vibrate if the lock is open and score is actually valid
      if (!hasVibratedForRecord.current && score > 0) {
        if (window.navigator.vibrate) {
          window.navigator.vibrate([75, 100, 75]);
        }
        hasVibratedForRecord.current = true; // Close the lock for this game
      }
    }

    // 2. GAME STATE LOGIC
    if (!isActive || isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, isGameOver, score, highScore]);

  const startGame = () => {
    setIsActive(true);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(3);
    hasVibratedForRecord.current = false; // Reset the lock for the new round
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };

  const addTime = () => {
    if (isGameOver) return;
    setScore((prev) => prev + 1);
    setTimeLeft((prev) => Math.min(prev + 1, 5));

    // Quick haptic feedback for regular hits (optional)
    if (window.navigator.vibrate) window.navigator.vibrate(50);
  };

  const restartGame = () => {
    setIsActive(false);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(3);
    hasVibratedForRecord.current = false; // Reset the lock
  };

  return {
    timeLeft,
    isGameOver,
    addTime,
    restartGame,
    startGame,
    score,
    highScore,
    isActive,
  };
};
