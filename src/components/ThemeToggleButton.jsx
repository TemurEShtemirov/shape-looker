import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggleButton = ({ isDarkMode, toggleTheme }) => (
    <motion.button
        onClick={toggleTheme}
        className="fluid-btn fixed top-8 right-8 z-[999] min-w-[120px] min-h-[30px] text-[10px] font-mono tracking-widest"
        whileHover={{
            scale: 1.05,
            borderRadius: "40px 40px 40px 40px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            transition: { duration: 0.3 },
            width: "120px",
            height: "40px"

        }}
        whileTap={{ scale: 0.95 }}
    >
        <span className="flex items-center gap-2">
            {isDarkMode ? '🌙 DARK_MODE' : '☀️ LIGHT_MODE'}
        </span>
    </motion.button>
);

export default ThemeToggleButton;