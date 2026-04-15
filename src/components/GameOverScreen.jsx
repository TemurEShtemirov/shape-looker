import { motion } from 'framer-motion';

const GameOverScreen = ({ score, onRestart, isDarkMode }) => (
    <motion.div
        key="gameover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        className="z-50 flex flex-col items-center"
    >
        <h1 className={`text-4xl sm:text-6xl font-black mb-2 italic text-center 
      ${isDarkMode ? 'text-white' : 'text-black'}`}>
            OUT OF TIME!
        </h1>
        <p className="text-cyan-400 text-2xl mb-8 font-mono tracking-tighter">
            Score: {score}
        </p>

        <motion.button
            onClick={onRestart}
            className={`fluid-btn px-12 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border
  ${isDarkMode
                    ? 'text-white bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/20'
                    : '!text-cyan-900 bg-white border-cyan-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] '
                }`}
            whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(34, 211, 238, 0.2)",
                borderColor: "rgba(34, 211, 238, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
        >
            TRY AGAIN
        </motion.button>
    </motion.div >
);

export default GameOverScreen;