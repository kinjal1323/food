import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Loginstyle.css"; 

function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if((email != ("kinjalsiddhapuria@gmail.com") ||("p@gmail.com")) && (password !=("admin12345678"))){
      setError("you are not admin");
    return; 
    }
    navigate("/Acrud");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <h4>Email</h4>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="input-group">
          <h4>Password</h4>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="login-button">
            Click for Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
