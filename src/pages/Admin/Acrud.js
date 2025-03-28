import { useState, useEffect } from "react";
import { Card, CardContent } from "../../component/ui/Card";
import { Button } from "../../component/ui/Button";
import { Input } from "../../component/ui/Input";
import Textarea from "../../component/ui/Textarea";
import { Link } from "react-router-dom";
import "../../styles/Acrudstyle.css";
import ph from "../../Food_Assets/th.jpg"


const Acrud = () => {
  // State for menu items
  const [formData, setFormData] = useState({
    image: null,
    rating: 0,
    title: "",
    paragraph: "",
    price: "",
  });

  const [deleteData, setDeleteData] = useState({ title: "", price: "" });
  const [updateIndex, setUpdateIndex] = useState("");
  const [storedData, setStoredData] = useState([]); // Stores CRUD data
  const [contactData, setContactData] = useState([]); // Stores all contact form data
  const [error, setError] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    const savedContactData = JSON.parse(localStorage.getItem("formdata"));
    const savedMenuData = JSON.parse(localStorage.getItem("menuData"));
  
    setStoredData(Array.isArray(savedMenuData) ? savedMenuData : []);
    setContactData(Array.isArray(savedContactData) ? savedContactData : []);
  }, []);

  // Handle input changes for menu items
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle delete input changes
  const handleDeleteInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file ? URL.createObjectURL(file) : null }));
  };

  // Insert menu item
  const handleInsert = (e) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.paragraph || !formData.price || formData.rating === 0) {
      setError("All fields are required!");
      return;
    }
    setError("");
    const newItem = { id: `new-${Date.now()}`, ...formData, price: parseFloat(formData.price), rating: parseFloat(formData.rating) };
    const updatedData = [...storedData, newItem];
    localStorage.setItem("menuData", JSON.stringify(updatedData));
    setStoredData(updatedData);
    setFormData({ image: null, rating: 0, title: "", paragraph: "", price: "" });
    alert("Item insert successfully!");
  };

  // Delete menu item
  const handleDelete = (e) => {
    e.preventDefault();
    const updatedData = storedData.filter(item => !(item.title === deleteData.title && item.price === parseFloat(deleteData.price)));
    localStorage.setItem("menuData", JSON.stringify(updatedData));
    setStoredData(updatedData);
    setDeleteData({ title: "", price: "" });
    alert("Item deleted successfully!");
  };

  // Handle update selection
  const handleUpdateIndexChange = (e) => {
    setUpdateIndex(e.target.value);
    const index = parseInt(e.target.value, 10);
    if (!isNaN(index) && storedData[index]) {
      setFormData(storedData[index]);
    } else {
      setFormData({ image: null, rating: 0, title: "", paragraph: "", price: "" });
    }
  };

  // Update menu item
  const handleUpdate = (e) => {
    e.preventDefault();
    const index = parseInt(updateIndex, 10);
  
    if (isNaN(index) || index < 0 || index >= storedData.length) {
      alert("Invalid index! Please enter a correct index.");
      return;
    }
  
    // Create a new array instead of mutating the existing one
    const updatedData = [...storedData];
    updatedData[index] = { ...updatedData[index], ...formData, price: parseFloat(formData.price), rating: parseFloat(formData.rating) };
  
    // Update localStorage and state
    localStorage.setItem("menuData", JSON.stringify(updatedData));
    setStoredData(updatedData);
    setUpdateIndex("");
    setFormData({ image: null, rating: 0, title: "", paragraph: "", price: "" });
  
    alert("Item updated successfully!");
  };
  const handleContactSubmit = (formValues) => {
    // Retrieve existing data
    const Data = localStorage.getItem("formdata");
  
    // Ensure it's a valid array
    let savedContactData;
    try {
      savedContactData = JSON.parse(Data);
      if (!Array.isArray(savedContactData)) {
        savedContactData = [];
      }
    } catch (error) {
      savedContactData = [];
    }
  
    // Add the new form values
    const updatedContactData = [...savedContactData, formValues];
  
    // Save to localStorage and update state
    localStorage.setItem("formdata", JSON.stringify(updatedContactData));
    setContactData(updatedContactData);
  };
  

  return (
    <div className="ac"><center>
      <h2>Hello Mr, Admin</h2>
    <img src={ph} className="ph"></img></center>
      <center>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 570)} className="b1">Insert</Link>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 900)} className="b2">Delete</Link>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 1280)} className="b3">Update</Link>
        <Link to="/Menu" className="b4">Read</Link>
        <Link to="/Orders" className="b5">All Orders</Link>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 1400)} className="b6">Contact us details</Link>
        <Link to="/" className="b6">Home</Link>
      </center>

      <Card className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <CardContent>
          <div className="acrud-container">
            
            {/* Insert Form */}
            <div className="box insert-box">
              <h2>Insert Item</h2>
              <form onSubmit={handleInsert}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {formData.image && <img src={formData.image} alt="Uploaded" className="uploaded-image" />}
                <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
                <Textarea name="paragraph" placeholder="Paragraph" value={formData.paragraph} onChange={handleInputChange} />
                <Input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <Input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" value={formData.rating} onChange={handleInputChange} />
                <Button type="submit">Insert</Button>
              </form>
            </div>

            {/* Delete Form */}
            <div className="box delete-box">
              <h2>Delete Item</h2>
              <form onSubmit={handleDelete}>
                <Input type="text" name="title" placeholder="Title" value={deleteData.title} onChange={handleDeleteInputChange} />
                <Input type="text" name="price" placeholder="Price" value={deleteData.price} onChange={handleDeleteInputChange} />
                <Button type="submit">Delete</Button>
              </form>
            </div>

            {/* Update Form */}
            <div className="box update-box">
              <h2>Update Item</h2>
              <form onSubmit={handleUpdate}>
                <Input type="text" name="index" placeholder="Enter Index" value={updateIndex} onChange={handleUpdateIndexChange} />
                <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
                <Textarea name="paragraph" placeholder="Paragraph" value={formData.paragraph} onChange={handleInputChange} />
                <Input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <Input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" value={formData.rating} onChange={handleInputChange} />
                <Button type="submit">Update</Button>
              </form>
            </div>
            {/* Contact Form Data */}
            {contactData.length > 0 && (
              <div className="contact-box">
                <h2>All Contact Form Submissions</h2>
                {contactData.map((contact, index) => (
                  <div key={index} className="contact-item">
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Company:</strong> {contact.company}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Acrud;
