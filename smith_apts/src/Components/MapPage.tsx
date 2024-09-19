import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Box, Container, useMediaQuery, useTheme,} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useRef, useState} from "react";
import frontExt from "../assets/front_ext.jpg"
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const MapPage: any = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    // Define a default position
    const position : any = [42.84532165037985, -106.31112558798915];

    // Hooks for responsive design
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const popupRef : any = useRef(null);

    useEffect(() => {
        if (popupRef.current) {
            // Get the Leaflet Popup instance
            const leafletPopupInstance = popupRef.current.leafletElement;

            // Attach event
            leafletPopupInstance.on('add', handleOpen);
        }

        // Cleanup on unmount
        return () => {
            if (popupRef.current) {
                const leafletPopupInstance = popupRef.current.leafletElement;
                leafletPopupInstance.off('add', handleOpen);
            }
        };
    }, []);

    return (
        <Container fixed style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "80vh" }}>
            <Box width={isMobile ? '70%' : 600} height={isMobile ? '60vh' : 400}
                 display="flex"
                 flexDirection="column"
                 alignItems="center"
                 border={1} borderColor="grey.500" overflow="hidden"
                 borderRadius={5}
            >  {/* Add this line */}
                <MapContainer style={{ width: '100%', height: '100%' }}
                              center={position}
                              zoom={16}
                              minZoom={11}
                              maxZoom={19}
                >
                <TileLayer
                    attribution=' Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker
                        key={"apt1"}
                        position={[42.84703212235411, -106.31132267760357]}
                    >
                        <Popup >

                            <Button
                                onClick={() => {handleOpen()}}
                            > 314 S. Jackson St.</Button>
                        </Popup>
                    </Marker>
            </MapContainer>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                314 S. Jackson Street
                            </Typography>
                            <Typography>
                                Casper, Wyoming
                            </Typography>
                            <Typography id="transition-modal-description" sx={{mt: 2}}>
                                Full Kitchen, Master Bedroom, Full bath
                            </Typography>
                            <Typography>
                                ??? Sq ft
                            </Typography>
                            <Button
                                onClick={() => {navigate("/rental")}}
                            > View Rental</Button>
                            <img src={frontExt} alt="Front Extension" style={{width: '100%', height: 'auto'}}/>
                        </Box>
                    </Fade>
                </Modal>


            </Box>
        </Container>
    );
}

export default MapPage;

