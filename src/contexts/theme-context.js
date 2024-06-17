import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const theme = {
  dark: {
    backgroundColor: "black",
    color: "white",
    // border: "1px solid white"
  },
  light: {
    backgroundColor: "white",
    color: "black",
    // boxShadow: '10px 5px 12px -4px rgba(141,136,136,0.64)'
  },
};
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
