import { useState } from 'react';
import { motion } from 'framer-motion';
import DailyRewardBadge from './DailyRewardBadge';

const StartScreen = ({ onStart, isDarkMode, canClaim, onClaim, currentReward }) => {
    const [hasClaimedNow, setHasClaimedNow] = useState(false);

    const handleInternalClaim = () => {
        const success = onClaim();
        if (success) {
            setHasClaimedNow(true);
            setTimeout(() => setHasClaimedNow(false), 3000);
        }
    };

    return (
        <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(20px)" }}
            className="z-50 flex flex-col items-center justify-center flex-grow pt-20"
        >
            {/* REWARD SECTION */}
            <div className="h-32 mb-8 flex items-center justify-center">
                {hasClaimedNow ? (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-cyan-400 font-black italic text-2xl tracking-tighter"
                    >
                        +50 COINS! 🪙
                    </motion.div>
                ) : (
                    <DailyRewardBadge
                        canClaim={canClaim}
                        onClaim={handleInternalClaim}
                        currentReward={currentReward}
                    />
                )}
            </div>

            {/* MAIN INTERACTION */}
            <div className="text-center">
                <button
                    onClick={onStart}
                    className={`text-6xl sm:text-8xl font-black italic tracking-tighter transition-colors 
                    ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-black hover:text-cyan-600'}`}
                >
                    START GAME
                </button>
                <p className="mt-4 font-mono text-[10px] opacity-30 tracking-[0.5em] uppercase">
                    Click_to_Begin
                </p>
            </div>
        </motion.div>
    );
};

export default StartScreen;