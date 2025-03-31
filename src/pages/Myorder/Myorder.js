import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Orderstyle.css";

const Myorder = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail")?.trim().toLowerCase();
    setUserEmail(storedEmail);
    console.log("🟢 Logged-in Email:", storedEmail);

    const allOrders = JSON.parse(sessionStorage.getItem("orderData")) || [];
    console.log("📦 All Orders in sessionStorage:", allOrders);

    const userOrders = allOrders.filter(
      (order) => order.userData?.email?.trim().toLowerCase() === storedEmail
    );

    console.log("✅ Filtered Orders for User:", userOrders);
    setOrders(userOrders);
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found for your account.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-box">
            <h3>🧾 Order #{index + 1}</h3>
            <p><strong>Email:</strong> {order.userData?.email}</p>
            <p><strong>Name:</strong> {order.userData?.name}</p>
            <p><strong>Phone:</strong> {order.userData?.phone}</p>
            <p><strong>Address:</strong> {order.userData?.address}</p>
            <p><strong>Payment Method:</strong> {order.paymentData?.method || "Not specified"}</p>
            <p><strong>Order Date:</strong> {order.orderDate || "Not Available"}</p>

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
                    <td>${Number(item.price).toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="total-amount">Grand Total: ${Number(order.total).toFixed(2)}</h3>
          </div>
        ))
      )}

      <div>
        <button className="order" onClick={() => navigate("/Menu")}>New order</button>
        <button className="home" onClick={() => navigate("/Home")}>Home Page</button>
      </div>
    </div>
  );
};

export default Myorder;