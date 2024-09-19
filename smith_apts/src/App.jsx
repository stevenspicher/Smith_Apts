import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Box, CssBaseline, Typography, useMediaQuery, useTheme} from "@mui/material";
import RentalPage from "./Components/Rental.jsx";
import Calendar from "./Components/Calendar.jsx";
import MapPage from "./Components/MapPage.jsx";



const App = () => {
    const theme = useTheme();
    const isMobile  = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Router>
            <CssBaseline />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                minHeight="100vh"
                minWidth="100vw"

                bgcolor="rgba(255,255,255,0.5)" // This makes the background translucent
                // style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
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