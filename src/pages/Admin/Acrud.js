import { useState } from "react";
import { Card, CardContent } from "../../component/ui/Card";
import { Button } from "../../component/ui/Button";
import { Input } from "../../component/ui/Input";
import Textarea from "../../component/ui/Textarea";
import { Link } from "react-router-dom";
import "../../styles/Acrudstyle.css";

const Acrud = () => {
  const [formData, setFormData] = useState({
    image: null,
    rating: 0,
    title: "",
    paragraph: "",
    price: "",
  });

  const [deleteData, setDeleteData] = useState({
    title: "",
    price: "",
  });

  const [updateIndex, setUpdateIndex] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file ? URL.createObjectURL(file) : null }));
  };

  const handleInsert = (e) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.paragraph || !formData.price || formData.rating === 0) {
      setError("All fields are required!");
      return;
    }
    setError("");
    const existingData = JSON.parse(localStorage.getItem("menuData")) || [];
    const newItem = {
      id: `new-${Date.now()}`,
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
    };
    const updatedData = [...existingData, newItem];
    localStorage.setItem("menuData", JSON.stringify(updatedData));
    setFormData({ image: null, rating: 0, title: "", paragraph: "", price: "" });
    window.location.href = "Menu";
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let menuData = JSON.parse(localStorage.getItem("menuData")) || [];
    menuData = menuData.filter(
      (item) => !(item.title === deleteData.title && item.price === parseFloat(deleteData.price))
    );
    localStorage.setItem("menuData", JSON.stringify(menuData));
    setDeleteData({ title: "", price: "" });
    alert("Item deleted successfully!");
  };

  const handleUpdateIndexChange = (e) => {
    setUpdateIndex(e.target.value);
    const menuData = JSON.parse(localStorage.getItem("menuData")) || [];
    const index = parseInt(e.target.value, 10);

    if (!isNaN(index) && menuData[index]) {
      setFormData({
        image: menuData[index].image,
        title: menuData[index].title,
        paragraph: menuData[index].paragraph,
        price: menuData[index].price.toString(),
        rating: menuData[index].rating.toString(),
      });
    } else {
      setFormData({ image: null, rating: 0, title: "", paragraph: "", price: "" });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    let menuData = JSON.parse(localStorage.getItem("menuData")) || [];
    const index = parseInt(updateIndex, 10);
  
    // Check if index is valid
    if (isNaN(index) || index < 0 || index >= menuData.length) {
      alert("Invalid index! Please enter a correct index.");
      return;
    }
  
    // Update the specific menu item
    menuData[index] = {
      ...menuData[index],
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
    };
  
    // Save back to localStorage
    localStorage.setItem("menuData", JSON.stringify(menuData));
  
    // Reset form and index input
    setUpdateIndex("");
    setFormData({ image: null, rating: 0, title: "", paragraph: "", price: "" });
  
    alert("Item updated successfully!");
    
    // Redirect after successful update
    window.location.href = "/Menu";
  };
  

  return (
    <div className="ac">
      <center>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 100)} className="b1">
          Insert
        </Link>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 600)} className="b2">
          Delete
        </Link>
        <Link to="/Acrud" onClick={() => window.scrollTo(0, 900)} className="b3">
          Update
        </Link>
        <Link to="/Menu" className="b4">
          Read
        </Link>
        <Link to="/Orders" className="b5">
          All Orders
        </Link>
      </center>

      <Card className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <CardContent>
          <div className="acrud-container">
            {/* Insert Section */}
            <div className="box insert-box">
              <h2>Insert Item</h2>
              <form onSubmit={handleInsert}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {formData.image && <img src={formData.image} alt="Uploaded" className="uploaded-image" />}
                <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
                <Textarea name="paragraph" placeholder="Paragraph" value={formData.paragraph} onChange={handleInputChange} />
                <Input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <Input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" value={formData.rating} onChange={handleInputChange} />
                <Button type="submit" className="Insert_btn">Insert</Button>
              </form>
            </div>

            {/* Delete Section */}
            <div className="box delete-box">
              <h2>Delete Item</h2>
              <form onSubmit={handleDelete}>
                <Input type="text" name="title" placeholder="Title" value={deleteData.title} onChange={handleDeleteInputChange} />
                <Input type="text" name="price" placeholder="Price" value={deleteData.price} onChange={handleDeleteInputChange} />
                <Button type="submit" className="delete_btn">Delete</Button>
              </form>
            </div>

            {/* Update Section */}
            <div className="box update-box">
              <h2>Update Item</h2>
              <form onSubmit={handleUpdate}>
                <Input type="text" name="index" placeholder="Enter Index Number" value={updateIndex} onChange={handleUpdateIndexChange} />
                <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
                <Textarea name="paragraph" placeholder="Paragraph" value={formData.paragraph} onChange={handleInputChange} />
                <Input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <Input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" value={formData.rating} onChange={handleInputChange} />
                <Button type="submit">Update</Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Acrud;
