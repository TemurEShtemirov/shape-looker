import { useEffect, useState } from 'react'
import GameBoard from './components/gameBoard'
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './components/timer'
import LiquidFilter from './assets/svg/liquidFilter'
import { getRandomPos, getRandomPaletteColor } from './utils/random'
import { useGameLogic } from './hooks/useGameLogic'
import { useTheme } from './context/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';

function App() {
  const [shapes, setShapes] = useState([])
  const [currentSize, setCurrentSize] = useState(100)
  const { isDarkMode, toggleTheme } = useTheme()

  // Pulling everything from your custom hook
  const { timeLeft, isGameOver, addTime, restartGame, score, isActive, startGame, highScore } = useGameLogic();



  const handleHit = () => {
    if (isGameOver) return;
    if (!isActive) {
      startGame();
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100); // Vibrate for feedback on game start
      }
    }
    // 1. Define the "Chaos Factor" for Size
    const roll = Math.random();
    let nextSize;

    if (roll > 0.92) {
      nextSize = Math.floor(Math.random() * 20) + 60;
    } else if (roll > 0.6) {
      nextSize = Math.max(currentSize - (Math.random() * 5), 20);
    } else {
      nextSize = Math.max(currentSize - (Math.random() * 15 + 5), 10);
    }

    const finalSize = Math.max(Math.floor(nextSize), 10);
    setCurrentSize(finalSize,);

    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    // Vibrate for 100ms on hit for feedback

    // 2. Select a random Shape Type
    const shapeTypes = [
      'circle', 'square', 'triangle', 'diamond', 'hexagon',
      'octagon', 'star', 'heart', 'cross', 'parallelogram',
      'blob_a', 'blob_b'
    ];
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    // 3. Create the Shape with Type
    const newShape = {
      id: Date.now(),
      x: getRandomPos(), // Ensure this returns 10-90 for safety
      y: getRandomPos(),
      size: finalSize,
      type: randomType, // Pass the type to your Shape.jsx component
      color: getRandomPaletteColor()
    };

    addTime();
    setShapes([newShape]);
  };


  //INFO func to restart game after game over, also resets the size and clears the shapes
  const handleRestart = () => {
    setCurrentSize(100);
    setShapes([]);
    restartGame();
    if (window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200]); // Vibrate for feedback on restart
    }

  };


  useEffect(() => {
    let interval;

    if (isGameOver) {
      // Stage 3: Game Over - FLASHING MODE
      const originalTitle = `Score: ${score}! 🎯`;
      const altTitle = "❌ GAME OVER";
      let showingOriginal = true;

      // Start the flash interval
      interval = setInterval(() => {
        document.title = showingOriginal ? originalTitle : altTitle;
        showingOriginal = !showingOriginal;
      }, 1000);

    } else if (isActive) {
      // Stage 2: Playing - Active Mode
      document.title = `Loook for... 👀 (${score})`;
    } else {
      // Stage 1: Idle - Brand Mode
      document.title = `Loooker v1.2.1`;
    }

    // CLEANUP: This is crucial! It stops the interval when the component 
    // rerenders or the game restarts.
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameOver, isActive, score]);


  const backgroundStyle = {
    background: isDarkMode
      ? 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0f0f1a 100%)'
      : 'radial-gradient(circle at 50% 50%, #f8fafc 0%, #e2e8f0 100%)'
  };
  return (
    <div style={backgroundStyle}
      className={`App relative min-h-[100dvh] w-full flex flex-col items-center justify-center transition-all duration-700 
      ${isDarkMode ? 'dark-mode-container' : 'light-mode-container'}`}>

      <LiquidFilter />

      {/* --- GLOBAL UI (Always Visible) --- */}


      {/* 2. THE AUTHOR TAG - Dynamic Colors */}
      <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-start opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default">
        <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
          Developed_By
        </span>
        <span className={`font-black text-xs tracking-widest uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>
          timaa
        </span>
      </div>

      {/* --- SCENE MANAGER --- */}
      <AnimatePresence mode="wait">
        {isGameOver ? (
          /* SCENE 1: GAME OVER */
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="z-50 flex flex-col items-center"
          >

            <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <h1 className={`text-4xl sm:text-6xl font-black mb-4 italic text-center ${isDarkMode ? 'text-white' : 'text-black'
              }`}>OUT OF TIME!</h1>
            <p className="text-cyan-400 text-2xl mb-8 font-mono tracking-tighter">Score: {score}</p>

            <motion.button
              onClick={() => {
                handleRestart(); // Calls your restart function
              }}
              className="fluid-btn mt-10 px-12 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em]"
              whileHover={{
                borderRadius: "40px 40px 40px 40px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                width: "350px",
                transition: { duration: 0.3 }
              }}
            >
              TRY AGAIN
            </motion.button>
          </motion.div>

        ) : shapes.length === 0 ? (
          /* SCENE 2: START SCREEN */
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(20px)" }}
            className="z-50"
          >
            <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button
              onClick={() => { handleHit() }} // Start the game on click
              className={`text-5xl sm:text-7xl font-black italic tracking-tighter transition-colors ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-black hover:text-cyan-600'
                }`}
            >
              START GAME
            </button>
          </motion.div>

        ) : (
          <motion.div
            key="gameboard"
            className="w-full max-w-md flex flex-col items-center flex-grow justify-evenly"
          >
            <div className="w-full px-6 flex flex-col items-center">
              <Timer time={timeLeft} />
              <div className={`font-mono text-[10px] sm:text-xs tracking-[0.2em] mt-3 uppercase opacity-50  ${isDarkMode ? 'text-white' : 'text-black'
                }`}>
                score: <span className="font-bold opacity-100">{score}</span>
                {highScore > 0 && (
                  <span className="ml-2">Best: <span className="font-bold">{highScore}</span></span>
                )}

              </div>
            </div>

            <div className="w-full flex justify-center items-center py-4">
              <GameBoard shapes={shapes} onShapeClick={handleHit} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;