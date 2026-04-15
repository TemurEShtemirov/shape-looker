import { motion } from 'framer-motion';

const StartScreen = ({ onStart, isDarkMode }) => (
    <motion.div
        key="start"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50, filter: "blur(20px)" }}
        className="z-50 text-center"
    >
        <button
            onClick={onStart}
            className={`text-5xl sm:text-7xl font-black italic tracking-tighter transition-colors 
        ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-black hover:text-cyan-600'}`}
        >
            START GAME
        </button>
        <p className="mt-4 font-mono text-[10px] opacity-30 tracking-[0.5em]">
            CLICK_TO_BEGIN
        </p>
    </motion.div>
);

export default StartScreen;