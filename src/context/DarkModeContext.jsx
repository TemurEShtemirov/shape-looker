import React, { useState } from "react";
import { DarkModeContext } from "./contextValue";
export function DarkModeProvider(props) {
  const [darkMode, setDarkMode] = useState(true); // Default to dark for the OIS vibe

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
}