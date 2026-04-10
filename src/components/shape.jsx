import React from "react";
import { motion } from "framer-motion";

const LIQUID_MORPHS = [
    "M45,15 Q65,10 80,30 Q95,50 80,75 Q65,90 40,85 Q15,80 10,50 Q15,20 45,15 Z",
    "M50,10 Q80,10 90,40 Q100,70 70,90 Q40,110 10,80 Q-10,50 20,20 Q30,10 50,10 Z",
    "M30,20 Q60,5 90,30 Q110,60 80,90 Q50,110 20,80 Q0,50 30,20 Z",
    "M40,10 Q90,10 95,50 Q100,90 50,95 Q0,90 5,50 Q10,10 40,10 Z"
];

const Shape = ({ x, y, size, onClick }) => {
    // Fix: Generate the stable random color for this specific shape instance
    const liquidColor = React.useMemo(() => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 80%, 60%)`;
    }, []);

    return (
        <motion.div
            className="absolute cursor-pointer flex items-center justify-center"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                transform: "translate(-50%, -50%)",
                // Fix: Apply glow to the container so it surrounds the fluid
                filter: 'drop-shadow(0 0 15px ' + liquidColor.replace('60%', '40%') + ')',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={onClick}
        >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <motion.path
                    animate={{ d: LIQUID_MORPHS }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    }}
                    fill={liquidColor}
                    style={{ filter: 'url(#gooey)' }}
                />
            </svg>

            {/* Fix: Specular Highlight moved outside SVG to overlay correctly */}
            <div
                className="absolute top-[20%] left-[20%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[2px] pointer-events-none"
                style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 40%' }}
            />
        </motion.div>
    );
};

export default Shape;