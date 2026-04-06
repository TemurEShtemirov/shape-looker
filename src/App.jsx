import { useState } from 'react'
import GameBoard from './components/gameBoard'
import Timer from './components/timer'
import { getRandomPos, getRandomPaletteColor } from './utils/random'
import { useGameLogic } from './hooks/useGameLogic'

function App() {
  const [shapes, setShapes] = useState([])
  const [currentSize, setCurrentSize] = useState(100)
  const { timeLeft, isGameOver, addTime, restartGame, score } = useGameLogic();

  const handleHit = () => {
    if (isGameOver) return;

    // 1. Calculate the next size (Shrink by 10px, stop at 15px)
    const nextSize = Math.max(currentSize - 10, 15);
    setCurrentSize(nextSize);

    // 2. Create the new shape using THAT specific size
    const newShape = {
      id: Date.now(),
      x: getRandomPos(),
      y: getRandomPos(),
      size: nextSize,
      color: getRandomPaletteColor()
    }

    // 3. Update the Timer and the Screen
    addTime(); // Refill the "leaking bucket"
    setShapes([newShape]);
  };

  const handleRestart = () => {
    setCurrentSize(100); // Reset size back to big
    setShapes([]);       // Clear shapes to show "Start" logic
    restartGame();       // Reset the timer
  };

  return (
    <div className="App">
      {isGameOver ? (
        <div className="game-over">
          <h1>OUT OF TIME!</h1>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      ) : (
        <>
          {shapes.length === 0 ? (
            <button onClick={handleHit} className="start-btn">START GAME</button>
          ) : (
            <>
              <div className="game-hud">

                <Timer time={timeLeft} />
                <div className="score-display">Score: {score}</div>
              </div>
              <GameBoard shapes={shapes} onShapeClick={handleHit} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App;