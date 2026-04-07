import { useState, useEffect } from "react";

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isActive, setIsActive] = useState(false); // <--- The "Pause/Play" switch

  useEffect(() => {
    // ONLY start the interval if the game is active and not over
    if (!isActive || isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, isGameOver]);

  // Use this for the very first click
  const startGame = () => {
    setIsActive(true);  
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(3);
  };

  const addTime = () => {
    if (isGameOver) return;

    setScore((prev) => prev + 1);
    setTimeLeft((prev) => Math.min(prev + 1, 5));
  };

  const restartGame = () => {
    setIsActive(false); // Stop the timer
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(3);
  };

  return {
    timeLeft,
    isGameOver,
    addTime,
    restartGame,
    startGame,
    score,
    isActive,
  };
};
