import React, {useEffect, useState} from 'react';
import {Button, Paper} from "@mui/material";
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
import { db } from '../../firebase';
import { collection, addDoc, getDocs  } from "firebase/firestore";

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
    border: '2px solid #000',
    boxShadow: 2,
    // p: 4,
};


const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [bookedDates, setBookedDates] = useState([]);

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

    useEffect(() => {
        const fetchBookedDates = async () => {
            const bookedDatesCollection = collection(db, "dates-booked");
            const bookedDatesSnapshot = await getDocs(bookedDatesCollection);
            const bookedDatesArray = [];
            bookedDatesSnapshot.forEach(doc => {
                const data = doc.data();
                data.bookedDates.forEach(timestamp => {
                    bookedDatesArray.push(new Date(timestamp));
                });
            });
            setBookedDates(bookedDatesArray);
        };
        fetchBookedDates();
    }, []);

    const isBooked = (date) => {
        return bookedDates.some(bookedDate => bookedDate.getDate() === date.getDate() && bookedDate.getMonth() === date.getMonth() && bookedDate.getFullYear() === date.getFullYear());
    }

    const handleFormSubmit = async () => {
        if (startDate && endDate) {

            //Get dates between range
            let datesWithinRange = getDatesBetween(startDate, endDate);

            //Convert dates to timestamp
            datesWithinRange = datesWithinRange.map(date => date.getTime());

            console.log(datesWithinRange);

            try {
                //Save the dates to Firebase
                const docRef = await addDoc(collection(db,"dates-booked"), {
                    bookedDates: datesWithinRange
                });

                console.log("Document written with ID: ", docRef.id);

            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            console.log("Please select a valid date range.");
            alert('Please select a valid date range.');
        }
    };


    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleOpen()
                }}
            >View Availability</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Paper>
                            <Typography>Select Start and End Dates:</Typography>
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                minDate={new Date(2024, 3, 1)}
                                maxDate={new Date(2025, 6, 31)}
                                tileClassName={({date, view}) => {
                                    if(isBooked(date)) {
                                        return 'booked';
                                    }
                                    // If both dates are set, highlight the range
                                    if(startDate && endDate && view === 'month' && isInRange(date, startDate, endDate)) {
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
                                onClick={handleFormSubmit}
                            >Submit</Button>

                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default CalendarPage;