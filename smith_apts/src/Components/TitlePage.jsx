import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/system';
import Fade from '@mui/material/Fade';

const theme = createTheme({
    palette: {
        primary: {
            main: "#0f3772"  // classy primary color, you can adjust as per your preference
        },
        secondary: {
            main: "#64a5ea"  // splash of color, you can adjust as per your preference
        }
    },
});

export default function TitlePage({ isMobile }) {
    return (

        <>
            <Fade
                in={true}
                  timeout={2000}>
                    <Box sx={{
                        margin: "30px",
                        padding: "10px",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: theme.palette.secondary.main,
                        overflow: 'hidden',
                        borderRadius: '12px',
                        boxShadow: 1,
                        fontWeight: 'bold',
                        width: "80%",

                    }}
                    >
                        <Typography variant={isMobile ? "h4" : "h1"} color={theme.palette.primary.main}>Windy City Smiths</Typography>
                    </Box>
            </Fade>
        </>
    );
}