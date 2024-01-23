import { Outlet } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./pages/NavBar";
import { DrawerHeader } from "./styled-components/StyledComponents";
import { useThemeContext } from "./state/use-theme-context";

const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
