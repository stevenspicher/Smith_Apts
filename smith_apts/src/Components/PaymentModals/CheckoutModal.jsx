
import {PayPalButtons} from "@paypal/react-paypal-js";
import {addDoc, collection} from "firebase/firestore";


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

    const onApproveOrder = async (data, actions) => {
        return actions.order.capture().then((details) => {
            props.handleClose();
            //send dates to db
            addDoc(collection(db,"dates-booked"), {
                bookedDates: datesWithinRange
            });
            alert(name + ", thank you for your purchase! ")
        })
    };

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