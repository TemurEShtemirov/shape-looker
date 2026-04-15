import { motion } from 'framer-motion';

const DailyRewardBadge = ({ canClaim, onClaim, currentReward }) => {
    return (
        <motion.div
            onClick={canClaim ? onClaim : null}
            className="relative w-32 h-32 rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
            style={{
                // 1. THE GEL CORE: Mesh gradient for 3D depth
                background: `background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #4338ca 100%)"`,
                boxShadow: canClaim
                    ? "0 20px 50px rgba(74, 222, 128, 0.3), inset 0 -10px 20px rgba(0,0,0,0.4), inset 0 10px 20px rgba(255,255,255,0.2)"
                    : "0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)",
            }}
            // 2. ADAPTIVE VISCOSITY: High damping for "Heavy" feel
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.92, rotate: 2 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
            {/* 3. SURFACE REFRACTION: The "Wet" Highlight */}
            <div className="absolute top-[10%] left-[20%] w-[40%] h-[20%] bg-white/30 rounded-[100%] blur-[2px] rotate-[-15deg]" />

            {/* 4. DYNAMIC ICON: Floats inside the liquid */}
            <motion.div
                animate={canClaim ? { y: [0, -5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="text-5xl z-10 filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            >
                {canClaim ? '🎁' : (
                    <div className="relative">
                        {/* If reward is collected, show the drop style from your screenshot */}
                        <span className="relative z-10 opacity-90">{currentReward?.icon || '💧'}</span>
                    </div>
                )}
            </motion.div>

            {/* 5. LIQUID BLOOM: Rushes to edges on press */}
            <motion.div
                className="absolute inset-0 bg-white/10 opacity-0"
                whileTap={{ opacity: 1, scale: 1.5 }}
            />
        </motion.div>
    );
};

export default DailyRewardBadge;