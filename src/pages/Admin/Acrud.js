import { useState, useEffect } from "react";
import { Button } from "../../component/ui/Button";
import { Input } from "../../component/ui/Input";
import "../../styles/Acrudstyle.css";
import menuData from "../../pages/Menu/Section1";
import { useNavigate } from "react-router-dom";

const Acrud = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ image: "", title: "", paragraph: "", price: "", rating: "" });
    const [search, setSearch] = useState("");
    const [updateIndex, setUpdateIndex] = useState(null);
    const navigate = useNavigate();

    // Load menu data from localStorage or fallback to imported menuData
    useEffect(() => {   
        const savedMenu = JSON.parse(localStorage.getItem("menuItems")) || menuData.items;
        if (Array.isArray(savedMenu)) {
            setMenuItems(savedMenu);
        }
    }, []);

    // Save menu data to localStorage
    const updateMenuStorage = (updatedMenu) => {
        localStorage.setItem("menuItems", JSON.stringify(updatedMenu));
        setMenuItems(updatedMenu);
    };

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Insert a new menu item
    const handleInsert = (e) => {
        e.preventDefault();
        const { image, title, paragraph, price, rating } = formData;

        if (!image || !title || !paragraph || !price || !rating) {
            return alert("All fields are required!");
        }

        const newItem = { id: Date.now(), ...formData };
        const updatedMenu = [...menuItems, newItem];
        updateMenuStorage(updatedMenu);
        setFormData({ image: "", title: "", paragraph: "", price: "", rating: "" });
        alert("Menu item added successfully!");
    };

    // Delete a menu item
    const handleDelete = (index) => {
        const updatedMenu = menuItems.filter((_, i) => i !== index);
        updateMenuStorage(updatedMenu);
        alert("Menu item deleted successfully!");
    };

    // Edit a menu item
    const handleEdit = (index) => {
        setUpdateIndex(index);
        setFormData({ ...menuItems[index] });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Update existing menu item
    const handleUpdate = (e) => {
        e.preventDefault();
        if (updateIndex === null) return alert("No menu item selected for update.");

        const updatedItems = menuItems.map((item, index) =>
            index === updateIndex ? { ...formData, id: item.id } : item
        );

        updateMenuStorage(updatedItems);
        setUpdateIndex(null);
        setFormData({ image: "", title: "", paragraph: "", price: "", rating: "" });
        alert("Menu item updated successfully!");
    };

    return (
        <div className="admin-container">
            {/* Header */}
            <div className="admin-header">
                <h2>Food Menu Admin</h2>
            </div>

            {/* Top Bar */}
            <div className="top-bar">
                <Button className="back-btn" onClick={() => navigate("/Home")}>🔙 Back</Button>
                <Input
                    type="text"
                    className="search-input"
                    placeholder="Search menu items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="show-orders-btn" onClick={() => navigate("/Orders")}>📜 All Orders</Button>
            </div>

            {/* Form Section */}
            <div className="box insert-box">
                <h2>{updateIndex !== null ? "Update Menu Item" : "Add Menu Item"}</h2>
                <form onSubmit={updateIndex !== null ? handleUpdate : handleInsert}>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="img" />
                    {formData.image && (
                        <img src={formData.image} alt="Uploaded" className="uploaded-image" />
                    )}
                    <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
                    <Input type="text" name="paragraph" placeholder="Description" value={formData.paragraph} onChange={handleInputChange} />
                    <Input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                    <Input type="number" name="rating" placeholder="Rating (1-5)" value={formData.rating} onChange={handleInputChange} />
                    <Button type="submit">{updateIndex !== null ? "Update" : "Insert"}</Button>
                </form>
            </div>

            {/* Table Section */}
            <div className="table-container">
                <h2 className="table-title">🍽️ Menu Items</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.length > 0 ? (
                            menuItems
                                .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
                                .map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                            />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.paragraph}</td>
                                        <td>${item.price}</td>
                                        <td>⭐ {item.rating}</td>
                                        <td>
                                            <Button className="edit-btn" onClick={() => handleEdit(index)}>✏️</Button>
                                            <Button className="delete-btn" onClick={() => handleDelete(index)}>❌</Button>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="7">No menu items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Navigation */}
            <div className="show-menu-container">
                <Button className="show-menu-btn" onClick={() => navigate("/menu")}>📜 Show Menu</Button>
            </div>
        </div>
    );
};

export default Acrud;
