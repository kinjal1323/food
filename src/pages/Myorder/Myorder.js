import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation
import "../../styles/Orderstyle.css";

const Myorder = () => {
  const [orders, setOrders] = useState([]); // State to store the user's filtered orders
  const [userEmail, setUserEmail] = useState(""); // State to store the logged-in user's email
  const navigate = useNavigate(); 

  useEffect(() => {   //handling side effects in functional components.
    // Retrieve the stored email from localStorage, trim spaces, and convert to lowercase for consistency
    const storedEmail = localStorage.getItem("userEmail")?.trim().toLowerCase();// login.js
    setUserEmail(storedEmail); // Update state with the stored email

    console.log("🟢 Logged-in Email:", storedEmail); // login.js email

    // Retrieve all orders from sessionStorage and parse them into an array
    const allOrders = JSON.parse(sessionStorage.getItem("orderData")) || [];//Converts the retrieved JSON string back into a JavaScript array of objects.
    console.log("📦 All Orders in sessionStorage:", allOrders); //order.js email

   
    const userOrders = allOrders.filter(
      (order) => order.userData?.email?.trim().toLowerCase() === storedEmail
    );

    console.log("✅ Filtered Orders for User:", userOrders); 
    setOrders(userOrders); 
  }, []); // Runs only once when the component mounts


  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found for your account.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-box">
            <h3>🧾 Order #{index + 1}</h3>
            <p>
              <strong>Email:</strong> {order.userData?.email}
            </p>
            <p>
              <strong>Address:</strong> {order.userData?.address}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {order.paymentData?.method || "Not specified"}
            </p>

            <h4>🛒 Order Summary</h4>
            <table className="orders-table">
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
                {order.cart.map((item, i) => (
                  <tr key={i}>
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

            <h3 className="total-amount">Grand Total: ${order.total}</h3>
          </div>
        ))
      )}

      {/* ✅ Fixed Navigation Button */}
      <div>
        <button className="order" onClick={() => navigate("/Menu")}>
          Done ✅
        </button>
      </div>
    </div>
  );
};

export default Myorder;
