import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useDailyReward } from './hooks/useDailyReward';
import DailyRewardBadge from './components/DailyRewardBadge';
import CoinDisplay from './components/coinDisplay';

function App() {
  const [shapes, setShapes] = useState([]);
  const [currentSize, setCurrentSize] = useState(100);
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    timeLeft, isGameOver, addTime, restartGame, score,
    isActive, startGame, highScore, chaosLevel, isFlashActive
  } = useGameLogic();
  const { canClaim, rewardHistory, claimReward, addCoins, coins } = useDailyReward();
  const lastReward = rewardHistory.length > 0 ? rewardHistory[rewardHistory.length - 1] : { icon: '💧' };  // --- BRAIN: Chaos & Shape Generation ---
  // Triggered when we are breaking the record
  const shouldShake = score >= highScore && isActive && score > 0;



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
    if (score >= highScore && window.navigator.vibrate) {
      window.navigator.vibrate([10, 30, 10]);
    }
  };


  const handleRestart = () => {
    setCurrentSize(100);
    setShapes([]);
    restartGame();
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  const processEndGameEarnings = (finalScore) => {
    // We use Math.floor so that 19 points still only gives 5 coins (encourages better play!)
    const earned = Math.floor(finalScore / 10) * 5;

    if (earned > 0) {
      addCoins(earned);
      console.log(`Converted ${finalScore} score into ${earned} coins.`);
    }
  };

  useEffect(() => {
    if (isGameOver) {
      processEndGameEarnings(score);
    }
  }, [isGameOver]);

  // --- BROWSER: Document Title Logic ---
  useEffect(() => {
    let titleInterval;
    if (isGameOver) {
      titleInterval = setInterval(() => {
        document.title = document.title === "❌ GAME OVER" ? `Score: ${score}! 🎯` : "❌ GAME OVER";
      }, 1000);
    } else {
      document.title = isActive ? `Looking... 👀 (${score})` : `Loooker v1.3`;
    }
    return () => clearInterval(titleInterval);
  }, [isGameOver, isActive, score]);

  return (
    <motion.div className={`App relative min-h-[100dvh] w-full flex flex-col items-center transition-all duration-700 ${isDarkMode ? 'bg-[#0f0f1a] dark-mode' : 'bg-[#f8fafc] light-mode'}`}
      animate={shouldShake ? {
        x: [0, -chaosLevel * 2.5, chaosLevel * 2.5, 0],
        y: [0, chaosLevel * 1.5, -chaosLevel * 1.5, 0],
        rotate: [0, -chaosLevel * 0.4, chaosLevel * 0.4, 0]
      } : {}}
      transition={{ repeat: Infinity, duration: 0.08, ease: "linear" }}
    >

      <LiquidFilter />
      <AuthorTag isDarkMode={isDarkMode} />

      {/* --- THE HUD: Spaced to the corners --- */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-[100] pointer-events-none">

        {/* TOP LEFT: Coins */}
        <div className="pointer-events-auto">
          <CoinDisplay amount={coins} />
        </div>

        {/* TOP RIGHT: Theme */}
        <div className="pointer-events-auto">
          <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>

      </div>
      <AnimatePresence mode="wait">
        {isGameOver ? (
          <GameOverScreen score={score} onRestart={handleRestart} isDarkMode={isDarkMode} />
        ) : !isActive ? (
          /* --- 2. START SCREEN: Centered vertically --- */
          <div className="flex flex-col items-center justify-center flex-grow">
            <StartScreen
              onStart={handleHit}
              isDarkMode={isDarkMode}
              canClaim={canClaim}
              onClaim={claimReward}
              currentReward={lastReward}
            />
          </div>
        ) : (
          /* --- 3. GAMEPLAY: Pushed down slightly to clear HUD --- */
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md flex flex-col items-center justify-start pt-32 px-6 flex-grow"
          >
            <header className="text-center mb-12">
              <Timer time={timeLeft} />
              <div className={`font-mono text-[10px] tracking-widest mt-4 opacity-40 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                SCORE: {score} | BEST: {highScore}
              </div>
            </header>

            <div className="w-full flex justify-center items-center">
              <GameBoard shapes={shapes} onShapeClick={handleHit} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE SHOCKWAVE OVERLAY --- */}
      <AnimatePresence>
        {isFlashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none backdrop-invert backdrop-brightness-110"
            style={{ mixBlendMode: 'difference' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App;