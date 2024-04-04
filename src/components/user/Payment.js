import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';

function Payment() {
    const [newPayment, setNewPayment] = useState({ paymentMethod: '' });
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentDto, setPaymentDto] = useState({});
    const [fare, setFare] = useState(0);
    const location = useLocation();
    const history = useNavigate();

    useEffect(() => {
        const paymentData = location.state?.paymentData;
        if (paymentData) {
            setPaymentDto(paymentData);
            setFare(paymentData.fare);
        }
    }, [location.state]);

    const addPayment = () => {
        const updatedPaymentDto = { ...paymentDto, paymentMethod: newPayment.paymentMethod };
        axios.post('http://localhost:8090/payment/makePayment', updatedPaymentDto)
            .then(response => {
                setMessage('Payment successful!');
                setErrorMessage('');
                history('/paymentsuccess', { bookingData: response.data });
            })
            .catch(error => {
                setMessage('');
                setErrorMessage('Network error, please try again later.');
            });
    };

    const cancelPayment = () => {
        history('/book');
    };

    const handleInputChange = (event) => {
        setNewPayment({ paymentMethod: event.target.value });
    };

    return (
        <div>
            <UserLayout/>
            {message && <div className="alert alert-success">{message}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="container">
                <h4>Amount: {fare}</h4><br />
                <form>
                    <h6>Select your payment method</h6>
                    <input type="radio" id="gpay" name="paymentMethod" value="Gpay" checked={newPayment.paymentMethod === 'Gpay'} onChange={handleInputChange} />
                    <label htmlFor="gpay">Gpay</label><br /><br />
                    <input type="radio" id="paytm" name="paymentMethod" value="Paytm" checked={newPayment.paymentMethod === 'Paytm'} onChange={handleInputChange} />
                    <label htmlFor="paytm">Paytm</label><br /><br />
                    <input type="radio" id="card" name="paymentMethod" value="Card" checked={newPayment.paymentMethod === 'Card'} onChange={handleInputChange} />
                    <label htmlFor="card">Card</label><br /><br />
                    <button type="button" onClick={addPayment} className="btn btn-success">Pay</button>
                    <button type="button" onClick={cancelPayment} className="btn btn-danger" id="cancel">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Payment;