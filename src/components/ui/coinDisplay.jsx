import { motion } from 'framer-motion';

const CoinDisplay = ({ amount }) => {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        >
            {/* THE COIN: A "Mercury" Droplet of Gold */}
            <div className="relative w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_#facc15]">
                {/* Specular Highlight (The 'Wet' Look) */}
                <div className="absolute top-0.5 left-1 w-1/2 h-1 bg-white/50 rounded-full blur-[0.5px]" />

                {/* Inner Caustic (Depth) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/40 to-transparent rounded-full" />
            </div>

            {/* THE BALANCE */}
            <span className="font-mono text-sm font-black text-yellow-500/90 tracking-tighter">
                {amount.toLocaleString()}
            </span>

            {/* Subtle Container Shine */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </motion.div>
    );
};

export default CoinDisplay;