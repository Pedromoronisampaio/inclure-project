import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("inclure_tema") === "escuro";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("modo-escuro");
      localStorage.setItem("inclure_tema", "escuro");
    } else {
      document.body.classList.remove("modo-escuro");
      localStorage.setItem("inclure_tema", "claro");
    }
  }, [darkMode]);

  const alternarTema = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
