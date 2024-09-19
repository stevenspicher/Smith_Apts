import {Button, Grid, Stack} from "@mui/material";
import {DateRangePicker} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addDays, isSameDay} from "date-fns";

const Calendar = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 7));
    const selectionRange : any = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };
    function handleSelect(ranges : any) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    return (
        <Grid container justifyContent="center" style={{ width: "100%", margin: "auto" }}>
            <Stack sx={{maxWidth: "100%", '@media screen and (max-width: 600px)': {maxWidth: "300px"}}}>

            <Grid item xs={12} sm={6}>
                <DateRangePicker
                    ranges={[selectionRange]}

                    onChange={handleSelect}
                    months={1}
                    direction="horizontal"
                    //showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    rangeColors={["#3d91ff"]}
                    disabledDay={d => !isSameDay(d, new Date())}
                    style={{ width: '100px' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {navigate("/")}}
                >Back to Map</Button>
            </Grid>
            </Stack>
        </Grid>
    )
};
export default Calendar;