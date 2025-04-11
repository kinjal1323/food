import React from "react"; 
import { useCart } from "../../contexts/CartContext"; 
import { useNavigate } from "react-router-dom"; 
import "../../styles/Cartstyle.css"; 

function Cart() {
  const { cart, removeFromCart, quantities, updateQuantity } = useCart(); 
  const navigate = useNavigate(); 

  // Function to handle quantity change
  const handleQuantityChange = (uniqueId, value) => {
    if (value < 1) return; // Prevent negative or zero values
    updateQuantity(uniqueId, value);
  };

  // Function to handle item removal
  const handleRemoveItem = (uniqueId) => {
    removeFromCart(uniqueId);
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item, index) => {
    const uniqueId = `${item.id}-${index}`;
    const price = Number(item.price) || 0; // Ensure price is a number
    return acc + price * (quantities[uniqueId] || 1);
  }, 0);

  // Debugging: Log cart data
  console.log("Cart Items:", cart);

  // Function to handle checkout
  const handlePayment = () => {
    if (totalPrice === 0) {
      alert("Your cart is empty!"); 
      return;
    }

    // Prepare selected cart items with quantities
    const selectedCart = cart.map((item, index) => {
      const uniqueId = `${item.id}-${index}`;
      return {
        ...item,
        quantity: quantities[uniqueId] || 1, 
      };
    });

    // Navigate to Userdata page with cart details
    navigate("/Userdata", {
      state: { cart: selectedCart, total: Number(totalPrice.toFixed(2)) },
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <br />
      {cart.length === 0 ? ( 
        <>
          <p>Your cart is empty.</p>
          <button className="Menu-button" onClick={() => navigate("/Menu")}>
            Back to Menu
          </button>
        </>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => {
              const uniqueId = `${item.id}-${index}`;
              const price = Number(item.price) || 0; // Ensure price is a number
              return (
                <li key={uniqueId} className="cart-item">
                  <img src={item.image} alt={item.title} width="200" />
                  <span>{item.title}</span>
                  <span>${price.toFixed(2)}</span> 
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={quantities[uniqueId] || 1}
                    onChange={(e) =>
                      handleQuantityChange(uniqueId, Number(e.target.value))
                    }
                    className="quantity-input"
                  />
                  <button className="cancel-button" onClick={() => handleRemoveItem(uniqueId)}>❌</button>
                </li>
              );
            })}
          </ul>
          <div className="cart-total">
            <strong>Total: </strong> ${totalPrice.toFixed(2)}
          </div>
          <button className="pay-button" onClick={handlePayment}>Continue</button>
          <button className="Menu-button" onClick={() => navigate("/Menu")}>Back to Menu</button>
        </>
      )}
    </div>
  );
}

export default Cart;
