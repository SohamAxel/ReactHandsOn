import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("themeColor", "dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const data = useContext(ThemeContext);
  return data;
};
