import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem("darkMode");
    if (saved !== null) setDarkMode(JSON.parse(saved));
  };

  const toggleTheme = async () => {
    setDarkMode(prev => {
      AsyncStorage.setItem("darkMode", JSON.stringify(!prev));
      return !prev;
    });
  };

  const theme = {
    background: darkMode ? "#1e1e2f" : "#ffffff",
    text: darkMode ? "#ffffff" : "#000000",
    card: darkMode ? "#3b3b5c" : "#e8e8e8",
    textSecondary: darkMode ? "#cfcfcf" : "#444444",
    gradient: darkMode? ["#2e2e47", "#1e1e2f"] : ["#ffffff", "#e6e6e6"],

  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
