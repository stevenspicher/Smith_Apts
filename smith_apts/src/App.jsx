import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Box, CssBaseline, Typography, useMediaQuery, useTheme} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import RentalPage from "./Components/Rental.jsx";
import CalendarPage from "./Components/Calendar.jsx";
import MapPage from "./Components/MapPage.jsx";
import TitlePage from "./Components/TitlePage.jsx";
import Checkout from "./Components/Checkout.jsx";
import Admin from "./Components/Admin.jsx";



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

                bgcolor="lightgrey"
            >

                <TitlePage isMobile={isMobile}/>
                {/*<Box >*/}
                {/*    <Typography variant={isMobile ? "h4" : "h1"}>Windy City Smiths</Typography>*/}
                {/*</Box>*/}
                <Routes>
                    <Route path="/" element={<RentalPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Box>
        </Router>
    );
}

export default App;