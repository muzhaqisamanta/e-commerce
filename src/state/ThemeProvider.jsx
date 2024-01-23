import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: isDarkMode
          ? {
              mode: "dark",
              primary: {
                main: "#3f51b5",
              },
              secondary: {
                main: "#f50057",
              },
            }
          : {
              mode: "light",
              primary: {
                main: "#2e3b84",
              },
              secondary: {
                main: "#f50057",
              },
            },
      }),
    [isDarkMode]
  );

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
