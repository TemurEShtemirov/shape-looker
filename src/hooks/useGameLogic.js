import { useState, useEffect } from "react";

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  // Initialize highScore from localStorage or default to 0
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("shapeLooker_best");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [timeLeft, setTimeLeft] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("shapeLooker_best", score.toString());
      if (window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 100]);
      }
    }
    if (!isActive || isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) {
        setIsGameOver(true);
        // --- Best Score Check ---
        return;
      }
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
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const addTime = () => {
    if (isGameOver) return;
    setScore((prev) => prev + 1);
    setTimeLeft((prev) => Math.min(prev + 1, 5));
  };

  const restartGame = () => {
    setIsActive(false);
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
    highScore, // Return this to display in UI
    isActive,
  };
};
