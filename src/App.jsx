import { useState } from 'react'
import GameBoard from './components/gameBoard'
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './components/timer'
import LiquidFilter from './assets/svg/liquidFilter'
import { getRandomPos, getRandomPaletteColor } from './utils/random'
import { useGameLogic } from './hooks/useGameLogic'

function App() {
  const [shapes, setShapes] = useState([])
  const [currentSize, setCurrentSize] = useState(100)

  // Pulling everything from your custom hook
  const { timeLeft, isGameOver, addTime, restartGame, score, isActive, startGame } = useGameLogic();

  const handleHit = () => {
    if (isGameOver) return;

    // 1. If the game isn't active yet, start the timer on first click
    if (!isActive) {
      startGame();
    }

    // 2. Shrink Logic: Decrease size by 10px, but don't go below 15px
    const nextSize = Math.max(currentSize - 10, 15);
    setCurrentSize(nextSize);

    // 3. Create the next target
    const newShape = {
      id: Date.now(),
      x: getRandomPos(),
      y: getRandomPos(),
      size: nextSize,
      color: getRandomPaletteColor()
    }

    // 4. Reward the player
    addTime(); // Refills the timer bucket (max 5s) and adds +1 score
    setShapes([newShape]);
  };

  const handleRestart = () => {
    setCurrentSize(100);
    setShapes([]);
    restartGame();
  };

  return (
    <div className="App relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <LiquidFilter />

      <AnimatePresence mode="wait">
        {isGameOver ? (
          // --- SCENE 1: GAME OVER ---
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="game-over z-50 flex flex-col items-center"
          >
            <h1 className="text-white text-6xl font-black mb-4">OUT OF TIME!</h1>
            <p className="text-cyan-400 text-2xl mb-8 font-mono">Score: {score}</p>
            <button onClick={handleRestart} className="px-10 py-4 bg-white rounded-full font-bold">
              Try Again
            </button>
          </motion.div>
        ) : shapes.length === 0 ? (
          // --- SCENE 2: START SCREEN ---
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(20px)" }}
            className="z-50"
          >
            <button onClick={handleHit} className="start-btn text-white text-4xl font-black">
              START GAME
            </button>
          </motion.div>
        ) : (
          // --- SCENE 3: THE GAME BOARD ---
          <motion.div
            key="gameboard"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col items-center"
          >
         
            <div className="game-hud fixed top-10 w-full max-w-2xl px-6 flex flex-col items-center z-50">
              <Timer time={timeLeft} />
              <div className="text-white/40 font-mono text-sm tracking-widest mt-2 uppercase">
                Score: <span className="text-white font-bold">{score}</span>
              </div>
            </div>

          
            <div className="mt-40 w-full flex justify-center">
              <GameBoard shapes={shapes} onShapeClick={handleHit} />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App;