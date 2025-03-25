
import { useState } from "react"; // React hook for managing state
import React from "react"; 
import "../../styles/Contactstyle.css";
import Header from "../../component/Layouts/Header";
import Footer from "../../component/Layouts/Footer";

const Contact = () => {
  // State to store form input values using useState hook
  const [formData, setFormData] = useState({
    name: "",      
    company: "",  
    email: "",    
    phone: "",    
    message: "",  
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    // Updates the corresponding field in formData state dynamically
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    alert("Form submitted successfully!\n" + JSON.stringify(formData, null, 2)); // Displays form data in an alert
  };

  return (
    <>
      {/* Header component */}
      <Header />

      {/* Main Contact Form Container */}
      <div className="Contact-container">
        <div className="Contact-box">
          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex flex-col">
              <label className="text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name} // Controlled input
                onChange={handleChange} // Updates state on user input
                required
                className="w-full p-2 border rounded" // Styling classes
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Company Name:</label>
              <input
                type="text"
                name="company"
                value={formData.company} 
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Email ID:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
  
            <div className="flex flex-col">
              <label className="text-sm font-medium">Your Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                rows="4" // Specifies textarea height
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Submit
            </button>

          </form> 
        </div> 
      </div>

      <Footer />
    </>
  );
};

export default Contact; 
