import "../assets/css/gameBar.css";
import Shape from "./shape";
const GameBoard = ({ shapes, onShapeClick }) => {
    return (
        <div className="game-board">
            {shapes.map(shape => (
                <Shape
                    key={shape.id}
                    {...shape}
                    onClick={() => onShapeClick(shape.id)}
                />
            ))}
        </div>
    );
};

export default GameBoard;