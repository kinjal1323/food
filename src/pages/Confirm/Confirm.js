import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Confirmstyle.css";
import Header from "../../component/Layouts/Header";

function Confirm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data safely
  const userData = location.state?.userData || {};
  const paymentData = location.state?.paymentData || {};
  const cart = location.state?.cart || [];
  const total = Number(location.state?.total || 0).toFixed(2);

  // Function to pass order data to Orders.js
  const handleDone = () => {
    const newOrder = {
      userData: { 
        ...userData, 
        email: userData.email?.trim().toLowerCase() // Normalize email
      }, 
      paymentData, 
      cart, 
      total 
    };
  
    console.log("🚀 New Order being saved:", newOrder);
  
    let existingOrders = JSON.parse(sessionStorage.getItem("orderData"));
  
    if (!Array.isArray(existingOrders)) {
      existingOrders = []; // Ensure it's an array
    }
  
    const updatedOrders = [...existingOrders, newOrder];
  
    console.log("✅ Updated Orders Array:", updatedOrders);
  
    sessionStorage.setItem("orderData", JSON.stringify(updatedOrders));
  
    // Retrieve & check if the data is correctly stored
    const allOrders = JSON.parse(sessionStorage.getItem("orderData")) || [];
    console.log("📦 All Orders in sessionStorage after save:", allOrders);
  
    navigate("/Myorder");
  };
  
  
  return (
    <>
      <Header />
      <div className="con">
        <div className="confirm-container">
          <h2>🧾 Order Confirmation</h2>
          {/* FLEX CONTAINER FOR CUSTOMER + PAYMENT DETAILS */}
          <div className="details-container">
            <div className="customer-details">
              <h3>👤 Customer Details</h3>
              <p><strong>Name:</strong> {userData.name || "N/A"}</p>
              <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
              <p><strong>Address:</strong> {userData.address || "N/A"}</p>
              <p><strong>Email:</strong> {userData.email || "N/A"}</p>
            </div>
            <div className="payment-details">
              <h3>💳 Payment Method</h3>
              <p><strong>Method:</strong> {paymentData.method || "Not specified"}</p>
            </div>
          </div>
          <h2>🛒 Order Summary</h2>
          {cart.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <table className="order-summary-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>
                      <img src={item.image} alt={item.title} width="50" />
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <h2 className="total-amount">Grand Total: <span>${total}</span></h2>
          <button className="order" onClick={handleDone}>Done ✅</button>
        </div>
      </div>
      <br/>
      <h2><center>❤️ Thank you {userData.name} for ordering from us ❤️</center></h2>
      <br/>
    </>
  );
}
export default Confirm;
