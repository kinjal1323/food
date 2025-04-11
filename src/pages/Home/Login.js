import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../../styles/Loginstyle.css"; 

function Login() {
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
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const trimmedEmail = email.trim().toLowerCase(); // Ensure consistency

    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // If no users exist, allow login without validation
    if (users.length === 0) {
      console.log("🔵 No users found. Allowing direct login.");
      localStorage.setItem("userEmail", trimmedEmail); 
      navigate("/Menu");
      return;
    }

    // Check if the user exists
    const existingUser = users.find(user => user.email === trimmedEmail && user.password === password);

    if (!existingUser) {
      setError("Invalid email or password.");
      return;
    }

    // Store logged-in user email in localStorage
    console.log("🟢 Logged in:", trimmedEmail);
    localStorage.setItem("userEmail", trimmedEmail); 

    navigate("/Menu");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        
        {error && <p className="error-message">{error}</p>} 
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <h4>Email</h4>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="input-group">
          <h4>Password</h4>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Click for Login
          </button>

          <button 
            type="button" 
            className="signup-button" 
            onClick={() => navigate("/signup")} // Fixed navigation
          >
            Click for Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
