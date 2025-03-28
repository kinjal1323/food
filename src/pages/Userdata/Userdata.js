import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Userdatastyle.css";

function Userdata() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };

  // ✅ Correct state declaration (including email)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ Fix handleChange function
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Redirect to Payment.js with user data
    navigate("/Payment", { state: { cart, total, userData } });
  };

  return (
    <div className="Userdata-container">
      <div className="Userdata-box">
        <h2 className="title">User Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
              className="input-field"
              rows="4"
            ></textarea>
          </div>

          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Userdata;
