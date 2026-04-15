import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameLogic } from './hooks/useGameLogic';
import { useTheme } from './context/ThemeContext';
import { getRandomPos, getRandomPaletteColor } from './utils/random';

// Components
import GameBoard from './components/gameBoard';
import Timer from './components/timer';
import ThemeToggleButton from './components/ThemeToggleButton';
import StartScreen from './components/StartScreen'; // New
import GameOverScreen from './components/GameOverScreen'; // New
import AuthorTag from './components/AuthorTag'; // New
import LiquidFilter from './assets/svg/liquidFilter';

function App() {
  const [shapes, setShapes] = useState([]);
  const [currentSize, setCurrentSize] = useState(100);
  const { isDarkMode, toggleTheme } = useTheme();
  const { timeLeft, isGameOver, addTime, restartGame, score, isActive, startGame, highScore } = useGameLogic();

  // --- BRAIN: Chaos & Shape Generation ---
  const handleHit = () => {
    if (isGameOver) return;
    if (!isActive) startGame();

    // Physics Logic (Chaos Factor)
    const roll = Math.random();
    let nextSize = roll > 0.92 ? Math.floor(Math.random() * 20) + 60 :
      roll > 0.6 ? Math.max(currentSize - 5, 20) :
        Math.max(currentSize - 15, 10);

    const finalSize = Math.max(Math.floor(nextSize), 10);
    setCurrentSize(finalSize);

    // Shape Setup
    const shapeTypes = ['circle', 'square', 'blob_a', 'blob_b']; // shortened for brevity
    const newShape = {
      id: Date.now(),
      x: getRandomPos(),
      y: getRandomPos(),
      size: finalSize,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: getRandomPaletteColor()
    };

    addTime();
    setShapes([newShape]);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleRestart = () => {
    setCurrentSize(100);
    setShapes([]);
    restartGame();
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  // --- BROWSER: Document Title Logic ---
  useEffect(() => {
    let titleInterval;
    if (isGameOver) {
      titleInterval = setInterval(() => {
        document.title = document.title === "❌ GAME OVER" ? `Score: ${score}! 🎯` : "❌ GAME OVER";
      }, 1000);
    } else {
      document.title = isActive ? `Looking... 👀 (${score})` : `Loooker v1.2.2`;
    }
    return () => clearInterval(titleInterval);
  }, [isGameOver, isActive, score]);

  return (
    <div className={`App relative min-h-[100dvh] w-full flex flex-col items-center justify-center transition-all duration-700 ${isDarkMode ? 'bg-[#0f0f1a] dark-mode' : 'bg-[#f8fafc] light-mode'}`}>

      <LiquidFilter />
      <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <AuthorTag isDarkMode={isDarkMode} />

      <AnimatePresence mode="wait">
        {isGameOver ? (
          <GameOverScreen score={score} onRestart={handleRestart} isDarkMode={isDarkMode} />
        ) : !isActive ? (
          <StartScreen onStart={handleHit} isDarkMode={isDarkMode} />
        ) : (
          <div className="w-full max-w-md flex flex-col items-center flex-grow justify-evenly">
            <header className="text-center">
              <Timer time={timeLeft} />
              <div className="font-mono text-xs tracking-widest mt-3 opacity-50">
                SCORE: {score} | BEST: {highScore}
              </div>
            </header>
            <GameBoard shapes={shapes} onShapeClick={handleHit} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;