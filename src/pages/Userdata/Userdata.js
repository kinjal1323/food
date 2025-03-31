import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Userdatastyle.css";

function Userdata() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!userData.name.trim()) tempErrors.name = "Name is required";
    if (!userData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Invalid email format";
    if (!userData.phone.match(/^\d{10}$/))
      tempErrors.phone = "Phone number must be 10 digits";
    if (!userData.address.trim()) tempErrors.address = "Address is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/Payment", { state: { cart, total, userData } });
    }
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
              className="input-field"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="input-field"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="input-field"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="input-group">
            <label>Address:</label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="input-field"
              rows="4"
            ></textarea>
            {errors.address && <p className="error">{errors.address}</p>}
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
