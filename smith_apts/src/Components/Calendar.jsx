import React, {useEffect, useState} from 'react';
import {Button, Paper, TextField} from "@mui/material";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/EventCalendar.css'
import Stack from "react-bootstrap/Stack";
import {Grid2} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography";
import {db} from '../../firebase';
import {collection, addDoc, getDocs} from "firebase/firestore";

/*
link to airbnb
 */


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 2,
    // p: 4,
};


const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    const [open, setOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [verifyOpen, setVerifyOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [bookedDates, setBookedDates] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const handleCheckoutOpen = () => setCheckoutOpen(true);
    const handleCheckoutClose = () => {
        setCheckoutOpen(false);
    }

    const handleVerifyOpen = () => setVerifyOpen(true);
    const handleVerifyClose = () => setVerifyOpen(false);

    const handleDateChange = (date) => {
        setDate(date);

        // If there's no startDate set, set the selected date as startDate. If startDate already exists, set the selected date as endDate
        if (!startDate) {
            setStartDate(date);
        } else if (!endDate) {
            setEndDate(date);
        } else {
            // Reset the dates if there are already two selected dates
            setStartDate(date);
            setEndDate(null);
        }
    };

    const getDatesBetween = (startDate, endDate) => {
        var dates = [];
        var currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
    const isInRange = (date, start, end) => {
        return date >= start && date <= end;
    }

    const fetchBookedDates = async () => {
        const bookedDatesCollection = collection(db, "dates-booked");
        const bookedDatesSnapshot = await getDocs(bookedDatesCollection);
        const bookedDatesArray = [];
        bookedDatesSnapshot.forEach(doc => {
            const data = doc.data();
            data.bookedDates.datesWithinRange.forEach(timestamp => {
                bookedDatesArray.push(new Date(timestamp));
            });
        });
        setBookedDates(bookedDatesArray);
    };
    useEffect(() => {

        fetchBookedDates();
    }, []);

    const isBooked = (date) => {
        return bookedDates.some(bookedDate => bookedDate.getDate() === date.getDate() && bookedDate.getMonth() === date.getMonth() && bookedDate.getFullYear() === date.getFullYear());
    }

    const handleCalendarSubmit = async () => {

        if (startDate && endDate) {
            const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const cost = totalDays * 100;
            setTotalCost(cost);
            setTotalDays(totalDays);
            handleClose()
            handleCheckoutOpen();
        } else {
            console.log("Please select a valid date range.");
            alert('Please select a valid date range.');
        }
    };

    const handleVerifySubmit = async () => {

        if (startDate && endDate) {

            //Get dates between range
            let datesWithinRange = getDatesBetween(startDate, endDate);

            //Convert dates to timestamp
            datesWithinRange = datesWithinRange.map(date => date.getTime());

            console.log(datesWithinRange);

            try {
                //Save the dates to Firebase
                const docRef = await addDoc(collection(db, "dates-booked"), {
                    bookedDates: {datesWithinRange, name: name, phone: phone, email: email}
                });
                fetchBookedDates()
                handleVerifyClose()
                alert("Thank you for your purchase! See you soon")
                console.log("Document written with ID: ", docRef.id);

            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            console.log("Please select a valid date range.");
            alert('Please select a valid date range.');
        }
    }


    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleOpen()
                }}
            >View Availability</Button>
            {/*Calendar*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Paper style={{padding: '20px', margin: '10px'}}>
                            <Typography variant="h4" id="transition-modal-title" gutterBottom>Select Dates:</Typography>

                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                minDate={new Date(2024, 3, 1)}
                                maxDate={new Date(2025, 6, 31)}
                                tileClassName={({date, view}) => {
                                    if (isBooked(date)) {
                                        return 'booked';
                                    }
                                    // If both dates are set, highlight the range
                                    if (startDate && endDate && view === 'month' && isInRange(date, startDate, endDate)) {
                                        return 'highlight';
                                    }
                                }}
                                tileDisabled={({date, view}) => {
                                    if (view === 'month') {
                                        return isBooked(date);
                                    }
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                style={{marginTop: '15px'}}
                                onClick={handleCalendarSubmit}
                            >
                                Submit
                            </Button>
                            <Button color="primary" onClick={() => {
                                setStartDate(null)
                                setEndDate(null)
                                handleClose()
                            }}
                            >Close</Button>

                        </Paper>
                    </Box>
                </Fade>
            </Modal>
            {/*Checkout*/}
            <Modal
                aria-labelledby="checkout-modal-title"
                aria-describedby="checkout-modal-description"
                open={checkoutOpen}
                onClose={handleCheckoutClose}
                closeAfterTransition
            >
                <Fade in={checkoutOpen}>
                    <Box sx={style}>
                        <Paper style={{padding: '20px', margin: '10px'}}>
                            <Typography variant="h4" id="checkout-modal-title" gutterBottom>Checkout</Typography>
                            <Typography id="checkout-modal-description"
                                        gutterBottom>Check-in: {startDate?.toLocaleDateString()}</Typography>
                            <Typography id="checkout-modal-description"
                                        gutterBottom>Check-out: {endDate?.toLocaleDateString()}</Typography>
                            <Typography id="checkout-modal-description" gutterBottom>Total
                                Days: {totalDays}</Typography>
                            <Typography id="checkout-modal-description" gutterBottom>Total Cost:
                                ${totalCost}</Typography>
                            <TextField
                                fullWidth
                                label="Name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                required
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                onChange={(e) => setPhone(e.target.value)}
                                type="text"
                                inputProps={{maxLength: 16}}
                                required
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                required
                                margin="dense"
                                variant="outlined"
                            />

                            <TextField
                                fullWidth
                                label="Card Number"
                                type="text"
                                disabled
                                inputProps={{maxLength: 16}}
                                required
                                margin="dense"
                                variant="outlined"
                            />
                            <Box display="flex" justifyContent="space-between" marginBottom="15px">
                                <TextField
                                    label="Expiry Date"
                                    type="text"
                                    disabled
                                    inputProps={{maxLength: 5}}
                                    required
                                    margin="dense"
                                    variant="outlined"
                                />
                                <TextField
                                    label="CVV"
                                    disabled
                                    type="text"
                                    inputProps={{maxLength: 3}}
                                    required
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Box>

                            <Button variant="contained" color="primary" onClick={() => {
                                handleCheckoutClose();
                                handleVerifyOpen()
                            }

                            }>Submit</Button>
                            <Button color="primary" onClick={() => {
                                setStartDate(null)
                                setEndDate(null)
                                handleCheckoutClose()
                            }}
                            >Close</Button>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
            {/*Verification*/}
            <Modal
                aria-labelledby="verify-modal-title"
                aria-describedby="verify-modal-description"
                open={verifyOpen}
                onClose={handleVerifyClose}
                closeAfterTransition
            >
                <Fade in={verifyOpen}>
                    <Box sx={style}>
                        <Paper style={{padding: '20px', margin: '10px'}}>
                            <Typography id="verify-modal-description" gutterBottom>{name}</Typography>
                            <Typography id="verify-modal-description" gutterBottom>{`Phone: ${phone}`}</Typography>
                            <Typography id="verify-modal-description" gutterBottom> {`Email: ${email}`}</Typography>
                            <Typography id="verify-modal-description"
                                        gutterBottom>Check-in: {startDate?.toLocaleDateString()}</Typography>
                            <Typography id="verify-modal-description"
                                        gutterBottom>Check-out: {endDate?.toLocaleDateString()}</Typography>
                            <Typography id="verify-modal-description" gutterBottom>Total Days: {totalDays}</Typography>
                            <Typography id="verify-modal-description" gutterBottom>Total Cost: ${totalCost}</Typography>
                            <Button variant="contained" color="primary" onClick={handleVerifySubmit}>Purchase</Button>
                            <Button color="primary" onClick={() => {
                                setStartDate(null)
                                setEndDate(null)
                                handleVerifyClose
                            }}>Close</Button>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </>

    );
}

export default CalendarPage;