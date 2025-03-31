import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react"; 
import "../../styles/Contactstyle.css";
import Header from "../../component/Layouts/Header";
import Footer from "../../component/Layouts/Footer";

const Contact = () => {
  const navigate = useNavigate();

  // State to store form input values
  const [formdata, setFormData] = useState({
    name: "",      
    company: "",  
    email: "",    
    phone: "",    
    message: "",  
  });
  
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  // Function to validate input fields
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formdata.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!formdata.company.trim()) {
      errors.company = "Company name is required";
      isValid = false;
    }
    if (!formdata.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
      errors.email = "Valid email is required";
      isValid = false;
    }
    if (!formdata.phone.trim() || !/^\d{10}$/.test(formdata.phone)) {
      errors.phone = "Valid 10-digit phone number is required";
      isValid = false;
    }
    if (!formdata.message.trim()) {
      errors.message = "Message cannot be empty";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Retrieve existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem("formdata")) || [];

    // Append new data
    const updatedData = [...existingData, formdata];

    // Save updated array back to localStorage
    localStorage.setItem("formdata", JSON.stringify(updatedData));

    alert("Thank you for your response!");
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Header />

      <div className="Contact-container">
        <div className="Contact-box">
          <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium">Name:</label>
              <input type="text" name="name" value={formdata.name} onChange={handleChange} required className="w-full p-2 border rounded" />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Company Name:</label>
              <input type="text" name="company" value={formdata.company} onChange={handleChange} required className="w-full p-2 border rounded" />
              {errors.company && <span className="text-red-500 text-sm">{errors.company}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Email ID:</label>
              <input type="email" name="email" value={formdata.email} onChange={handleChange} required className="w-full p-2 border rounded" />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Phone Number:</label>
              <input type="tel" name="phone" value={formdata.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
  
            <div className="flex flex-col">
              <label className="text-sm font-medium">Your Message:</label>
              <textarea name="message" value={formdata.message} onChange={handleChange} required className="w-full p-2 border rounded" rows="4"></textarea>
              {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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
