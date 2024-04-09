import { Outlet, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import {
  PageWrapper,
  OutletWrapper,
} from "./styled-components/StyledComponents";
import NavBar from "./pages/NavBar";
import Footer from "./components/Footer";
import { useThemeContext } from "./state/use-theme-context";
import "./styles/styles.css";

const App = () => {
  const { theme } = useThemeContext();
  const location = useLocation();

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
