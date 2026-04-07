import { motion } from "framer-motion";

const Timer = ({ time }) => {
    // Current time / 5 seconds max
    const percentage = (time / 5) * 100;

    return (
        /* Increased width from max-w-md (448px) to max-w-2xl (672px) */
        <div className="w-full max-w-2xl mx-auto mb-8 px-6">
            <div className="flex justify-between items-end text-white/50 text-[10px] mb-2 font-mono uppercase tracking-[0.2em]">
                <span>ShapeLooker</span>
                <span className="text-cyan-400 font-bold text-xs">{time}s</span>
            </div>

            {/* Thinner track (h-1.5) for a more premium feel */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-xl relative">
                {/* Progress Fill */}
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    className={`h-full rounded-full transition-colors duration-500 ${time < 2 ? "bg-red-500" : "bg-cyan-400"
                        }`}
                    style={{
                        boxShadow: `0 0 20px ${time < 2 ? "rgba(239, 68, 68, 0.6)" : "rgba(34, 211, 238, 0.4)"}`,
                    }}
                />
            </div>
        </div>
    );
};

export default Timer;