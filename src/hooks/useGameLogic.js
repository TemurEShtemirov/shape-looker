import { useState, useEffect } from "react";

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  // 1. The Leaking Logic (ONLY for the timer)
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 2. The Reward Logic (Triggered by handleHit in App.jsx)
  const addTime = () => {
    if (isGameOver) return;

    // Increment Score by 1 for every successful click
    setScore((prev) => prev + 1);

    // Refill Timer
    setTimeLeft((prev) => {
      const newTime = prev + 1;
      // We removed scoreBonus from here so the timer actually refills!
      return Math.min(newTime, 5);
    });
  };

  const restartGame = () => {
    setTimeLeft(3);
    setIsGameOver(false);
    setScore(0);
  };

  return { timeLeft, isGameOver, addTime, restartGame, score };
};
