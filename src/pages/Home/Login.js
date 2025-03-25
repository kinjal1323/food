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

    const trimmedEmail = email.trim().toLowerCase();
    console.log("🟢 Storing Logged-in Email:", trimmedEmail);
    localStorage.setItem("userEmail", trimmedEmail); // Store email
    navigate("/Menu");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        
        {error && <p className="error-message">{error}</p>} 
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label-center">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="label-center">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default Login;
