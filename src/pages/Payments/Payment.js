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
  const [errors, setErrors] = useState({});

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrors({}); // Clear errors when changing method
  };

  const handleCardDetailsChange = (event) => {
    setCardDetails({ ...cardDetails, [event.target.name]: event.target.value });
  };

  const validateFields = () => {
    let newErrors = {};
    if (paymentMethod === "upi" && !/^[0-9]{10}$/.test(upiId)) {
      newErrors.upiId = "Invalid UPI ID format";
    }
    if (paymentMethod === "card") {
      if (!cardDetails.name.trim()) newErrors.name = "Cardholder name is required";
      if (!/^[0-9]{16}$/.test(cardDetails.number)) newErrors.number = "Card number must be 16 digits";
      if (!cardDetails.expiry) newErrors.expiry = "Expiry date is required";
      if (!/^[0-9]{3}$/.test(cardDetails.cvv)) newErrors.cvv = "CVV must be 3 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    let paymentData = { method: paymentMethod };
    if (paymentMethod === "upi") paymentData.upiId = upiId;
    if (paymentMethod === "card") paymentData = { ...paymentData, ...cardDetails };

    navigate("/Confirm", { state: { cart, total, userData, paymentData } });
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Select Payment Method</h2>

        <label>
          <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={handlePaymentChange} />
          Cash on Delivery
        </label>

        <label>
          <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={handlePaymentChange} />
          UPI
        </label>
        {paymentMethod === "upi" && (
          <>
            <input type="text" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            {errors.upiId && <span className="error">{errors.upiId}</span>}
          </>
        )}

        <label>
          <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={handlePaymentChange} />
          Debit Card
        </label>
        {paymentMethod === "card" && (
          <div className="card-details">
            <input type="text" name="name" placeholder="Cardholder Name" value={cardDetails.name} onChange={handleCardDetailsChange} required />
            {errors.name && <span className="error">{errors.name}</span>}

            <input type="text" name="number" placeholder="Card Number" value={cardDetails.number} onChange={handleCardDetailsChange} required />
            {errors.number && <span className="error">{errors.number}</span>}

            <input type="month" name="expiry" value={cardDetails.expiry} onChange={handleCardDetailsChange} required />
            {errors.expiry && <span className="error">{errors.expiry}</span>}

            <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleCardDetailsChange} required />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </div>
        )}

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default Payment;
