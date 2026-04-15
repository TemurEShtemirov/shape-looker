import { useState, useEffect } from "react";

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("shapeLooker_best");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [timeLeft, setTimeLeft] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // v1.3 Sensory States
  const [chaosLevel, setChaosLevel] = useState(0);
  const [isFlashActive, setIsFlashActive] = useState(false);

  useEffect(() => {
    // 1. RECORD & CHAOS CALCULATION
    if (score >= highScore && score > 0) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("shapeLooker_best", score.toString());
      }
      // Intensity grows every 5 points past the record
      const intensity = Math.floor((score - (highScore - (score % 5))) / 5) + 1;
      setChaosLevel(Math.min(intensity, 8));
    }

    if (!isActive || isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) setIsGameOver(true);
      return;
    }

    // 2. THE OVERCLOCK TIMER
    // The clock actually ticks faster as chaos increases (1000ms down to 800ms)
    const tickRate = 1000 - chaosLevel * 25;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, tickRate);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, isGameOver, score, highScore, chaosLevel]);

  const addTime = () => {
    if (isGameOver) return;
    setScore((prev) => prev + 1);

    // Diminishing returns on time bonus
    const timeBonus = score > 40 ? 0.4 : score > 20 ? 0.7 : 1;
    setTimeLeft((prev) => Math.min(prev + timeBonus, 5));

    // Flash & Vibration logic for Record Breaking
    if (score >= highScore) {
      setIsFlashActive(true);
      setTimeout(() => setIsFlashActive(false), 80);

      if (window.navigator.vibrate) {
        const vib = Math.max(20, 70 - chaosLevel * 10);
        window.navigator.vibrate([vib, 30, vib]);
      }
    } else {
      if (window.navigator.vibrate) window.navigator.vibrate(30);
    }
  };

  const startGame = () => {
    setIsActive(true);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(3);
    setChaosLevel(0);
    if (window.navigator.vibrate) window.navigator.vibrate(100);
  };

  const restartGame = () => {
    setIsActive(false);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(3);
    setChaosLevel(0);
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
    chaosLevel,
    isFlashActive,
  };
};
