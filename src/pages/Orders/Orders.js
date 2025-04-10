import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../component/ui/Button";
import "../../styles/Orderstyle.css";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("orderData") || "[]");
    console.log("Retrieved all orders:", storedData);
    if (storedData.length > 0) {
      setOrders(storedData);
    } else {
      navigate("/Menu");
    }
  }, [navigate]);

  if (orders.length === 0) return <h2>Loading...</h2>;

  const Order = () => {
    navigate("/Menu");
  };

  return (
    <div className="orders-container">
      <h2>📜 All Orders</h2>

      {orders.map((order, index) => (
        <div key={index} className="order-box">
          <h3>🧾 Order #{index + 1}</h3>
          <pre>
            <p>
              <strong>Name:</strong> {order.userData?.name || "N/A"} &nbsp;&nbsp;&nbsp;
              <strong>Email:</strong> {order.userData?.email || "N/A"} &nbsp;&nbsp;&nbsp;
              <strong>Phone:</strong> {order.userData?.phone || "N/A"} <br />
              <strong>Address:</strong> {order.userData?.address || "N/A"} <br />
              <strong>Payment Method:</strong> {order.paymentData?.method || "Not specified"}
            </p>
          </pre>
          <h4>🛒 Order Summary</h4>
          {order.cart?.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
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
                {order.cart?.map((item, i) => {
                  const price = Number(item.price) || 0; // Ensure price is a number
                  const total = price * (item.quantity || 1);

                  return (
                    <tr key={i}>
                      <td>{item.title}</td>
                      <td>
                        <img src={item.image} alt={item.title} width="50" />
                      </td>
                      <td>${price.toFixed(2)}</td>
                      <td>{item.quantity || 1}</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <h3 className="total-amount">
            Grand Total: ${Number(order.total || 0).toFixed(2)}
          </h3>
          <hr />
        </div>
      ))}

      <button className="new" onClick={Order}>New Order 🔄</button>
      <Button className="show-menu-btn" onClick={() => navigate("/Acrud")}>Admin </Button>
    </div>
  );
};

export default Orders;
