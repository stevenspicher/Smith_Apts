import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, getDoc  } from "firebase/firestore";
import { db } from '../../firebase';
import {Button, Grid2, Stack} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import Typography from "@mui/material/Typography"; // import your firebase config file

const AdminPage = () => {
    const navigate = useNavigate();
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingsCollection = collection(db, 'dates-booked');
            const bookingsSnapshot = await getDocs(bookingsCollection);
            const bookingsList = bookingsSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            setBookedDates(bookingsList);
        };
        fetchBookings();
    }, []);

    const deleteDates = async (id) => {
        const docRef = doc(db, "dates-booked", id);
        await deleteDoc(docRef);
        setBookedDates(bookedDates.filter((item) => item.id !== id));
    };

    const deleteSingleDate = async (id, dateToDelete) => {
        const docRef = doc(db, "dates-booked", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const updatedDates = data.bookedDates.datesWithinRange.filter(date => date !== dateToDelete);

            await updateDoc(docRef, {
                "bookedDates.datesWithinRange": updatedDates
            });

            setBookedDates(bookedDates.map(item =>
                item.id === id ? {...item, bookedDates: {...item.bookedDates, datesWithinRange: updatedDates}} : item
            ));
        } else {
            console.log("No such document!");
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <Grid2 margin={"5px"} xs={12} sm={6}>
                <Button
                    margin={"5px"}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        navigate("/")
                    }}
                >Home</Button>
            </Grid2>
            {bookedDates.map(({ bookedDates, id }) => (
                <div key={id} style={{border: '1px solid black', padding: '10px'}}>
                    <Stack>

                    <h2>
                        {bookedDates.name}
                    </h2>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography>Email: {bookedDates.email}</Typography>
                    </Box>
                        <Box>
                        <Typography>Phone: {bookedDates.phone}</Typography>
                        </Box>
                    </Stack>
                    <Typography>
                        {`${new Date(bookedDates.datesWithinRange[0]).toLocaleDateString()} - ${new Date(bookedDates.datesWithinRange[bookedDates.datesWithinRange.length-1]).toLocaleDateString()}`}
                    </Typography>
                    <Button onClick={() => deleteDates(id)} aria-label="delete">
                        Delete Booking
                    </Button>
                    {bookedDates.datesWithinRange.map((date, index) => (
                        <div key={index}>
                            <Box display="flex" alignItems="center">
                                <Typography>Booking {index + 1}: {new Date(date).toLocaleDateString()}</Typography>
                                <IconButton onClick={() => deleteSingleDate(id, date)} aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </div>
                    ))}
                </div>
            ))}

        </div>
    );
};

export default AdminPage;