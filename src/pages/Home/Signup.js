import { useState } from "react"; // Import useState hook for managing form input state
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting users after signup
import "../../styles/Signupstyle.css"; // Import external CSS file for styling

const Signup = () => {
  // State variables to store user input
  const [email, setEmail] = useState(""); // Stores email input
  const [password, setPassword] = useState(""); // Stores password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores confirm password input
  const [error, setError] = useState(""); // Stores error messages for validation

  const navigate = useNavigate(); // Initialize navigate function for redirection

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset error messages before validation

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save user credentials to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve existing users or initialize empty array
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      setError("Email already registered. Try logging in.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Signup successful with", { email, password });

    navigate("/login");
  };

  return (
    <div className="signup-container"> {/* Main container for the signup form */}
      <div className="signup-box"> {/* Box containing the signup form */}
        <h2 className="signup-title">Sign Up</h2> {/* Signup title */}

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label-center">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              required
            />
          </div>

          <div className="input-group">
            <label className="label-center">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              required
            />
          </div>

          <div className="input-group">
            <label className="label-center">Confirm Password</label>
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on change
              required
            />
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
