import { motion } from 'framer-motion';

const GameOverScreen = ({ score, onRestart, isDarkMode }) => (
    <motion.div
        key="gameover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        className="z-50 flex flex-col items-center justify-center flex-grow pt-32 px-6"
    >
        <div className="text-center">
            <h1 className={`text-5xl sm:text-7xl font-black mb-2 italic tracking-tighter 
                ${isDarkMode ? 'text-white' : 'text-black'}`}>
                OUT OF TIME!
            </h1>

            <p className="text-cyan-400 text-3xl mb-12 font-mono tracking-tighter font-bold">
                Score: {score}
            </p>

            <motion.button
                onClick={onRestart}
                className={`px-16 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 border
                ${isDarkMode
                        ? 'text-white bg-white/5 border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/10'
                        : 'text-cyan-900 bg-white border-cyan-100 shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-xl'
                    }`}
                whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(34, 211, 238, 0.15)",
                    borderColor: "rgba(34, 211, 238, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
            >
                TRY AGAIN
            </motion.button>
        </div>
    </motion.div >
);

export default GameOverScreen;