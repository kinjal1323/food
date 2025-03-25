import React from "react"; // Needed to create the functional component
import { useCart } from "../../contexts/CartContext"; // Gives access to CartContext (global cart state).
import { useNavigate } from "react-router-dom"; // React Router hook for navigation.
import "../../styles/Cartstyle.css"; // Importing styles for the cart component.

function Cart() {
  const { cart, removeFromCart, quantities, updateQuantity } = useCart(); // Destructuring cart context
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle quantity change
  const handleQuantityChange = (uniqueId, value) => {
    if (value < 1) return; // Prevents quantity from going below 1
    updateQuantity(uniqueId, value); // Updates quantity in CartContext
  };

  // Function to handle item removal from cart
  const handleRemoveItem = (uniqueId) => {
    removeFromCart(uniqueId);
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((acc, item, index) => {
    const uniqueId = `${item.id}-${index}`;
    return acc + item.price * (quantities[uniqueId] || 1);
  }, 0);

  // Function to handle payment and navigate to confirmation page
  const handlePayment = () => {
    if (totalPrice === 0) {
      alert("Your cart is empty!"); // Alert if cart is empty
      return;
    }

    // Prepare selected cart items with quantities
    const selectedCart = cart.map((item, index) => {
      const uniqueId = `${item.id}-${index}`;
      return {
        ...item,
        quantity: quantities[uniqueId] || 1, // Include quantity
      };
    });

    // Navigate to Userdata page with cart and total price
    navigate("/Userdata", {
      state: { cart: selectedCart, total: Number(totalPrice.toFixed(2)) },
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <br />
      {cart.length === 0 ? ( // Check if cart is empty
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
              return (
                <li key={uniqueId} className="cart-item">
                  <img src={item.image} alt={item.title} width="200" />
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                  <input
                    type="number"
                    min="1"
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