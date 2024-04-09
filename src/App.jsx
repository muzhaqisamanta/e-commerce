import { Outlet, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import {
  DrawerHeader,
  PageWrapper,
  OutletWrapper,
} from "./styled-components/StyledComponents";
import { useThemeContext } from "./state/use-theme-context";
import NavBar from "./pages/NavBar";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
} from "@mui/material";
import Footer from "./components/Footer";
import "./styles/styles.css";
import Nav from "./components/navbar/Nav";
const App = () => {
  const { theme } = useThemeContext();
  const location = useLocation();
  const wrapperStyle = {
    height: "50px",
    fontFamily: "sans-serif",
  };

  console.log(location);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageWrapper className="main-box">
        <NavBar />
        <OutletWrapper>
          <Outlet key={location.key} />
        </OutletWrapper>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default App;
