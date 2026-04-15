import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Timer = ({ time }) => {
    const { isDarkMode } = useTheme()

    // Current time / 5 seconds max
    const percentage = (time / 5) * 100;

    return (
        /* Increased width from max-w-md (448px) to max-w-2xl (672px) */
        <div className="w-full max-w-2xl mx-auto mb-8 px-6">
            <div className="flex justify-between items-end text-[10px] mb-2 font-mono uppercase tracking-[0.2em] transition-colors duration-500">
                {/* Using currentColor or adaptive opacity classes */}
                <span className={isDarkMode ? "text-white/50" : "text-black/50"}>
                    ShapeLooker  &nbsp;
                </span>
                <span className="text-cyan-400 font-bold text-xs">{time}s</span>
            </div>

            {/* Progress Bar Track */}
            <div className={`h-1.5 w-full rounded-full overflow-hidden border backdrop-blur-xl relative transition-colors duration-500 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                }`}>
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3, ease: "linear" }}
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