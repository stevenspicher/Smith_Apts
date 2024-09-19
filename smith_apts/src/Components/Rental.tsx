import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {useNavigate} from "react-router-dom";
import livingRoom from "../assets/living_room.jpg";
import bathroom from "../assets/bathroom.jpg";
import frontDoor from "../assets/front_door.jpg"

const RentalPage = () => {
    const navigate = useNavigate();
    const images = [frontDoor, livingRoom, bathroom]; // You should replace this with actual image URLs
    const highlights = ["Highlight 1", "Highlight 2", "Highlight 3"];
    const details = ["Detail 1", "Detail 2", "Detail 3"];

    return (
        <Container>
            <Grid container spacing={3}>

                {/* Gallery section */}
                <Grid item xs={12}>
                    <Typography variant="h2">Gallery</Typography>
                    {images.map((img, idx) => (
                        <Box key={idx}
                             width={'7%' } height={'50vh'}
                             display="flex"
                             flexDirection="column"
                             alignItems="center"
                             border={1} borderColor="grey.500" overflow="hidden"
                             borderRadius={5}
                        >  {/* Add this line */}
                            <img src={img} alt="Rental House" />
                        </Box>
                    ))}
                </Grid>

                {/* Highlights */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h2">Highlights</Typography>
                    {highlights.map((highlight, idx) => (
                        <Typography variant="body1" key={idx}>
                            {highlight}
                        </Typography>
                    ))}
                </Grid>

                {/* Details */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h2">Details</Typography>
                    {details.map((detail, idx) => (
                        <Typography variant="body1" key={idx}>
                            {detail}
                        </Typography>
                    ))}
                </Grid>

                {/* Buttons */}
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {navigate("/calendar")}}
                    >View Availability</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary">Rent this Home</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {navigate("/")}}
                    >Back</Button>
                </Grid>

            </Grid>
        </Container>
    );
};

export default RentalPage;