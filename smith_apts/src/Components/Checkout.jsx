import {Button, Grid2, Stack} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Accessibility} from "@mui/icons-material";
import Typography from "@mui/material/Typography";


/*
code or some way to allow for discounts
 */

const Checkout = () => {
    const navigate = useNavigate();



    return (
        <>
<Typography>Checkout</Typography>
        <Grid2 container justifyContent="center" style={{ width: "100%", margin: "auto" }}>
            <Stack sx={{maxWidth: "100%", '@media screen and (max-width: 600px)': {maxWidth: "300px"}}}>
            <Grid2  xs={12} sm={6}>

            </Grid2>
            <Grid2  xs={12} sm={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {navigate("/")}}
                >Rental</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {navigate("/map")}}
                >Map</Button>
            </Grid2>
            </Stack>
        </Grid2>
        </>
    )
};
export default Checkout;