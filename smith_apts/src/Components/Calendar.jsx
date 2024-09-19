import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/EventCalendar.css'
import Stack from "react-bootstrap/Stack";
import {Grid2} from "@mui/material";
import {useNavigate} from "react-router-dom";



const CalendarPage = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());


    // Array of dates you want to highlight and make clickable
    const highlightDates = [
        {
            date: new Date(2024, 3, 6),
            venue: "Gruner Brothers Brewing - April 6th",
            website: "https://grunerbrewing.com/",
            // logo: grunerLogo,
            menu: "Spring Salad, " +
                "\n" +
                "Marry Me Chicken (grilled chicken in thyme & sundried tomato cream sauce over angel hair pasta,\n" +
                "Gluten-Free option available), " +
                "\n" +
                "Cheesecake",
            cost: "57",
            color: "blue",
            showOptions: false,
            optionsList: [{value: 1, label:"Gluten Free"}],
            showCheckout: false
        },
        {
            date: new Date(2024, 3, 26),
            venue: "The Invasion Bar and Restaurant - Kaycee, WY",
            website: "https://www.invasionbar.com/",
            // logo: invasionLogo,
            menu: "Salad, Lasagna, Dessert, Drink",
            cost: "57",
            color: "red",
            showOptions: false,
            showCheckout: true
        },
        {
            date: new Date(2024, 4, 18),
            venue: "Gruner Brothers Brewing - May 18th",
            // logo: grunerLogo,
            website: "https://grunerbrewing.com/",
            menu: "Gumbo or Muffaleta, Jambalaya, Beignets",
            cost: "57",
            color: "yellow",
            showOptions: true,
            optionsList: [],
            showCheckout: true

        }
    ];

    const handleDateChange = (date) => {
        setDate(date);
        const index = highlightDates.findIndex(
            d => d.date.getFullYear() === date.getFullYear() &&
                d.date.getMonth() === date.getMonth() &&
                d.date.getDate() === date.getDate());
        setInfo(index);
        setShow(true);
        setNumberOfTickets(0)

    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // do something with the form field values
        // for example you can just print them to the console

    };
    return (
        <div className="container">
            <div className="row">
                <div>
                    <div className={"showinfo"}>
                    </div>
                    <div className="text-center py-3">
                        <div className={"calendar-border"}>
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                minDate={new Date(2024, 3, 1)}
                                maxDate={new Date(2025, 6, 31)}
                                navigationA11yLabel=""
                                prev2AriaLabel=""
                                next2AriaLabel=""
                                tileClassName={({date, view}) => {
                                    if (view === 'month') {
                                        const highlight = highlightDates.find(d =>
                                            d.date.getFullYear() === date.getFullYear() &&
                                            d.date.getMonth() === date.getMonth() &&
                                            d.date.getDate() === date.getDate()
                                        );

                                          // return the color of the venue

                                    }
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <Grid2  xs={12} sm={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {navigate("/rental")}}
                >Rental</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {navigate("/")}}
                >Map</Button>
            </Grid2>
        </div>
    );
}

export default CalendarPage;