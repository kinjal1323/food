import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Paymentstyle.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, total, userData } = location.state || { cart: [], total: 0, userData: {} };


  
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvv: "" });

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    console.log("Selected Payment Method:", event.target.value); // Debugging
  };

  const handleCardDetailsChange = (event) => {
    setCardDetails({ ...cardDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let paymentData = { method: paymentMethod };

    if (paymentMethod === "upi") {
      paymentData.upiId = upiId;
    } else if (paymentMethod === "card") {
      paymentData = { ...paymentData, ...cardDetails };
    }

    console.log("Final Payment Data:", paymentData); // Debugging

    // ✅ Redirect to Confirm.js with payment details
    navigate("/Confirm", { state: { cart, total, userData, paymentData } });
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Select Payment Method</h2>

        {/* Cash on Delivery */}
        <label>
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={handlePaymentChange}
          />
          Cash on Delivery
        </label>

        {/* UPI */}
        <label>
          <input
            type="radio"
            name="payment"
            Value="upi"
            checked={paymentMethod === "upi"}
            onChange={handlePaymentChange}
          />
          UPI
        </label>

        {paymentMethod === "upi" && (
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          />
        )}

        {/* Debit Card */}
        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={handlePaymentChange}
          />
          Debit Card
        </label>

        {paymentMethod === "card" && (
          <div className="card-details">
            <input
              type="text"
              name="name"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={handleCardDetailsChange}
              required
            />
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={handleCardDetailsChange}
              required
            />
            <input
              type="month"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardDetailsChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              required
            />
          </div>
        )}

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default Payment;
