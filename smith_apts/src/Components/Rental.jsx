import {Button, Container, Divider, Grid2, Stack, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useNavigate} from "react-router-dom";
import livingRoom from "../assets/living_room.jpg";
import bathroom from "../assets/bathroom.jpg";
import frontDoor from "../assets/front_door.jpg"
import {Carousel} from 'react-bootstrap';

import BedIcon from '@mui/icons-material/Bed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CalendarPage from "./Calendar.jsx";

const RentalPage = () => {
    const navigate = useNavigate();
    const images = [frontDoor, livingRoom, bathroom]; // You should replace this with actual image URLs
    const highlights = [
        "Free Wifi",
        "Grill",
        "Air Conditioning"
    ];
    const details = [
        {detail: "Full Bed", icon: BedIcon},
        {detail: "Kitchen", icon: KitchenIcon},
        {detail: "Full Bed", icon: BedIcon},
    ];

    return (
        <Box>
            <Box spacing={3}>
                <Typography style={{margin: '10px'}}>314 S. Jackson</Typography>
                {/* Gallery section */}
                <Grid2 xs={12}>

                    <Carousel>
                        {images.map((img, idx) => (
                            <Carousel.Item key={idx}>
                                <img
                                    className="d-block w-100"
                                    style={{height: '40vh', objectFit: 'cover'}}
                                    src={img}
                                    alt="Rental House"
                                />

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Grid2>


                {/* Highlights */}
                <Grid2 marginTop={"10px"} xs={12} sm={6}>
                    <Stack spacing={2} direction={"row"} alignItems="center" justifyContent="center">
                        {highlights.map((highlight, idx) => (
                            <div key={idx}>
                                <Divider orientation="vertical" flexItem/>
                                <Typography variant="body1">
                                    {highlight}
                                </Typography>

                            </div>
                        ))}
                    </Stack>
                </Grid2>

                {/* Details */}
                <Grid2 marginTop={'20px'} xs={12} sm={6}>
                    {details.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <Stack marginTop={'5px'} key={idx} spacing={4} direction={"row"}>
                                {IconComponent && <IconComponent/>}
                                <Typography variant="body1" key={idx}>
                                    {item.detail}
                                </Typography>
                            </Stack>

                        )
                    })}
                </Grid2>

                {/* Buttons */}
                <Box
                    display="flex"
                    flexDirection="column"
                    minHeight="100vh"
                    minWidth="100vw"

                    bgcolor="lightgrey"
                >
                    <Grid2 margin={"5px"} xs={12} sm={6}>
                        <CalendarPage/>
                    </Grid2>
                    {/*<Grid2 margin={"5px"} xs={12} sm={6}>*/}
                    {/*    <Button*/}
                    {/*        variant="contained"*/}
                    {/*        color="secondary"*/}
                    {/*        onClick={() => {*/}
                    {/*            navigate("/checkout")*/}
                    {/*        }}*/}
                    {/*    >Rent this Home</Button>*/}
                    {/*</Grid2>*/}
                    <Grid2 margin={"5px"} xs={12} sm={6}>
                        <Button
                            margin={"5px"}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate("/map")
                            }}
                        >Map</Button>
                    </Grid2>
                </Box>

            </Box>
        </Box>
    );
};

export default RentalPage;