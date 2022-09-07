import { createTheme, ThemeProvider } from "@mui/material";
import "../assets/styles.css";
import { NotificationStore } from "../contexts/NotificationContext";
import InfoSnackbar from "./InfoSnackbar";
import NavBar from "./NavBar";
import AppRoutes from "./Routes";
import { PRIMARY_BLUE } from "./StyledComponents";

const theme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_BLUE,
        },
        action: {
            disabledBackground: "rgba(48, 114, 254, 25%)",
            disabled: PRIMARY_BLUE,
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <NotificationStore>
                    <NavBar />
                    <AppRoutes />
                    <InfoSnackbar />
                </NotificationStore>
            </ThemeProvider>
        </div>
    );
}

export default App;
