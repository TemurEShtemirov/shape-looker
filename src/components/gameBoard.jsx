import "../assets/css/gameBar.css";
import { useTheme } from "../context/ThemeContext";
import Shape from "./shape";

const GameBoard = ({ shapes, onShapeClick }) => {
    const { isDarkMode } = useTheme()

    const backgroundStyle = {
        background: isDarkMode
            ? 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0f0f1a 100%)' // Your original dark
            : 'radial-gradient(circle at 50% 50%, #bec5cc 0%, #e2e8f0 100%)'  // Premium Light (Slate-50 to Slate-200)
    };

    return (
        <div className="game-board relative w-full h-[400px] max-w-md mx-auto overflow-hidden" style={backgroundStyle}>
            {
                shapes.map((shape) => (
                    <Shape key={shape.id} {...shape} onClick={onShapeClick} />
                ))
            }
        </div >
    );
};

export default GameBoard;