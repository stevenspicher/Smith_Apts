// import React from 'react';
import {PayPalButtons} from "@paypal/react-paypal-js";
// import {Modal} from "react-bootstrap";
// import {addTicketGroup} from "../../../services/firebase/dbFunction";

const Checkout = (props) => {
console.log(props)
    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.totalCost.toString()
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            const venue = props.options.venue;
            details.ticketInfo = props.options
            addTicketGroup(details).then(() => {
                props.handleClose();
                props.closeTicketModal();
                alert(name + ", thank you for your purchase! We will see you at " + venue + ". No need to provide a ticket - Ticket holder names will be checked at the door.")})
            ;
        });
    }
    return (
        <>
            <div className="checkout"
                     style={{
                         height: "300px",
                         overflowY: 'auto', // Vertical scrolling
                     }}>
                    <>
                        <PayPalButtons
                            style={{
                                layout: "vertical",
                        }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </>
                </div>
</>
    );
}

export default Checkout;