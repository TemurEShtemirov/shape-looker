import * as React from 'react'
import { useState } from 'react'
import GameBoard from './components/gameBoard'
import { getRandomPos, getRandomPaletteColor } from './utils/random'

function App() {
  const [shapes, setShapes] = useState([])
  const [currentSize, setCurrentSize] = useState(100)

  const handleHit = () => {
    setCurrentSize(prev => Math.max(prev - 10, 15));

    const newShape = {
      id: Date.now(),
      x: getRandomPos(),
      y: getRandomPos(),
      size: currentSize,
      color: getRandomPaletteColor()
    }
    setShapes([newShape])
    //INFO the "shrink" logic
    console.log(newShape);

  }

  return (
    <>
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Shape Looker: Phase 1</h1>
        {shapes.length === 0 ? (
          <button onClick={handleHit}>Start Game</button>
        ) : (
          <GameBoard shapes={shapes} onShapeClick={handleHit} />
        )}
      </div>
    </>
  )
}

export default App