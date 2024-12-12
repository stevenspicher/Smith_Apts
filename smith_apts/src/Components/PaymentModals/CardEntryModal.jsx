import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import CheckoutModal from "./CheckoutModal.jsx";
import Stack from "react-bootstrap/Stack";
import '../../css/EventCalendar.css'
// import ConfirmationModal from "./ConfirmationModal.jsx";

function CardEntryModal({
                                 show,
                                 onHide,
                                 onSubmit,
                                 totalCost,

                             }) {
    const [showPaymentOptions, setShowPaymentOptions] = useState(false)
    const [showTicketModal, setShowTicketModal] = useState(true)
    const initialOptions = {
        "client-id": 'AVHdlUjjl49BqebNpOl_iv3hv2TZMBet1ZufwX2bxSS-0W6tbLnVg83KPSBszOCaGkkyUwqzVeWBoJGL',
        currency: "USD",
        intent: "capture",
        disableFunding: "credit",
    };


    const handleClose = () => {



    }

    return (
        <>
            {!showTicketModal ? <>
                    <PayPalScriptProvider options={initialOptions}>
                        <CheckoutModal show={showPaymentOptions} handleClose={handleClose} totalCost={totalCost} closeTicketModal={onHide} options={{
                            venue: venue,
                            date: date,
                            numberOfTickets: numberOfTickets,
                            totalCost: totalCost,
                            specialInstructions: specialInstructions,
                            ticketObj: ticketObj
                        }}/>
                    </PayPalScriptProvider>
                </> :
                <Modal show={show} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Stack>
                        <Modal.Title>Venue: {venue}</Modal.Title>
                            {/*<Modal.Title>Date: {date.toLocaleDateString('en-US')}</Modal.Title>*/}

                        </Stack>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Number of Tickets (@
                                    {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }
                                    ).format(Number(ticketCost))})
                                </Form.Label>
                                <Form.Control type="number" value={numberOfTickets} onChange={(e) => {
                                    if (e.target.value > 0) {
                                        setNumberOfTickets(e.target.value);
                                        setTotalCost((e.target.value * ticketCost).toString());
                                    }
                                }} required/>
                            </Form.Group>
                            {totalCost === "0" ? <></> : <>
                                <Form.Label><h3>Total Cost: {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(Number(totalCost))}</h3></Form.Label>

                                {/* Generate the Ticket Holder and Meal Option fields */}
                                { !showOptions ? <></> :
                                    [...Array(parseInt(numberOfTickets))].map((_, i) => (
                                        <div key={i} className="border-class">
                                        <React.Fragment >
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ticket #{i + 1} - Name</Form.Label>
                                                <Form.Control type="text" value={ticketHolderNames[i]}
                                                              onChange={(e) => {
                                                                  ticketObj[i] = {...ticketObj[i], name : e.target.value};
                                                                  setTicketObj(ticketObj)
                                                              }} required/>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Meal Options</Form.Label>
                                                {optionsList[0] ?
                                                <Form.Select defaultValue="" required onChange={(e) => {
                                                    ticketObj[i] = {...ticketObj[i], options : e.target.value};
                                                    setTicketObj(ticketObj)
                                                }}>
                                                    <option disabled value="">Select a meal option</option>
                                                    {/* Prompt: Map through the "options" prop to generate choices below */}
                                                     optionsList.map((option, index) => (
                                                        <option key={index} value={option.value}>{option.label}</option>
                                                    ))
                                                </Form.Select>: <></>}
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`custom-checkbox-${i}`}
                                                    label={`Gluten Free?`}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            ticketObj[i] = {...ticketObj[i], gf : e.target.checked};
                                                            setTicketObj(ticketObj)
                                                        }
                                                        // } else {setGlutenFree(glutenFree)}
                                                    }}
                                                />
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`custom-checkbox-${i}`}
                                                    label={`Vegan?`}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            ticketObj[i] = {...ticketObj[i], vegan : e.target.checked};
                                                            setTicketObj(ticketObj)
                                                        }
                                                        // } else {setGlutenFree(glutenFree)}
                                                    }}
                                                />
                                            </Form.Group>
                                        </React.Fragment>
                                        </div>
                                    ))
                                }
                                <Form.Group className="mb-3">
                                    <Form.Label>Special Instructions</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={specialInstructions}
                                                  onChange={(e) => setSpecialInstructions(e.target.value)}/>
                                </Form.Group>
                            </>
                            }

                            <Button onClick={
                                handleShow
                            }>Checkout</Button>

                            <PayPalScriptProvider options={initialOptions}>
                                <CheckoutModal show={showPaymentOptions} handleClose={handleClose} totalCost={totalCost} closeTicketModal={onHide} options={{
                                    venue: venue,
                                    date: date,
                                    numberOfTickets: numberOfTickets,
                                    totalCost: totalCost,
                                    specialInstructions: specialInstructions,
                                    ticketObj: ticketObj
                                }}/>
                            </PayPalScriptProvider>
                        </Form>
                    </Modal.Body>
                </Modal>}
        </>
    );
}

export default CardEntryModal;