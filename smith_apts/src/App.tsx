
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from "./Components/MapPage.tsx";
import {Box, CssBaseline, Typography, useMediaQuery, useTheme} from "@mui/material";
import Calendar from "./Components/Calendar.tsx";
import RentalPage from "./Components/Rental.tsx";



const App: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Router>
            <CssBaseline />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                minHeight="100vh"
                minWidth="100vw"
            >
                <Box >
                    <Typography variant={isMobile ? "h4" : "h1"}>Smith Apts</Typography>
                </Box>
                <Routes>
                    <Route path="/rental" element={<RentalPage />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/" element={<MapPage />} />
                </Routes>
            </Box>
        </Router>
    );
}

export default App;