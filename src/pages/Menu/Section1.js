import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../component/Layouts/Cards";

// Importing images for predefined food items
import Image1 from "../../Food_Assets/assets/menu/pizza.jpg";
import Image2 from "../../Food_Assets/assets/menu/dosa.jpg";
import Image3 from "../../Food_Assets/assets/menu/burger.jpg";
import Image4 from "../../Food_Assets/assets/menu/gujrati.jpg";
import Image5 from "../../Food_Assets/assets/menu/manchuria.jpg";
import Image6 from "../../Food_Assets/assets/menu/punjabi.jpg";
import Image7 from "../../Food_Assets/assets/menu/pasta.jpg";
import Image8 from "../../Food_Assets/assets/menu/pavbhaji.jpg";
import Image9 from "../../Food_Assets/assets/menu/frenky.jpg";

// Mock Data (Predefined Food Items)
const mockData = [
  { id: "1", image: Image1, title: "Pizza", paragraph: "Veg cheese pizza", rating: 5, price: 189.15 },
  { id: "2", image: Image2, title: "Dosa", paragraph: "Cheese paneer palak dosa", rating: 4.5, price: 199.50 },
  { id: "3", image: Image3, title: "Vegan Burger", paragraph: "Cheddar cheese, bacon, onion, mustard", rating: 4, price: 78.15 },
  { id: "4", image: Image4, title: "Gujarati Thali", paragraph: "Sabji-roti, dal-bhat, sweet, papad, buttermilk", rating: 4.5, price: 99.25 },
  { id: "5", image: Image5, title: "Manchurian", paragraph: "Dry crispy manchurian", rating: 3.0, price: 120.25 },
  { id: "6", image: Image6, title: "Punjabi Thali", paragraph: "Paneer sabji, chole, paratha, pulav, sweet, curd", rating: 3, price: 190.89 },
  { id: "7", image: Image7, title: "Pasta", paragraph: "White sauce pasta", rating: 2.5, price: 99.19 },
  { id: "8", image: Image8, title: "Pav Bhaji", paragraph: "Butter pav bhaji", rating: 2.0, price: 89.12 },
  { id: "9", image: Image9, title: "Franky", paragraph: "Cheese butter crispy Franky", rating: 4.2, price: 70.12 },
];

const renderRatingIcons = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
      rating--;
    } else if (rating > 0) {
      stars.push(<i key={i} className="bi bi-star-half"></i>);
      rating = 0;
    } else {
      stars.push(<i key={i} className="bi bi-star"></i>);
    }
  }
  return stars;
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const storedMenuData = JSON.parse(localStorage.getItem("menuData")) || [];
    setMenuItems(storedMenuData);
  }, []);

  const combinedMenuItems = [...mockData, ...menuItems];

  return (
    <section className="menu_section">
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
            <h2>OUR FOOD</h2>
            <p className="para">The meal was delicious, with tangy and flavorful taste.</p>
          </Col>
        </Row>
        <Row>
          {combinedMenuItems.length > 0 ? (
            combinedMenuItems.map((cardData, index) => (
              <Cards
                key={index}
                image={cardData.image}
                rating={cardData.rating}
                title={cardData.title}
                paragraph={cardData.paragraph}
                price={cardData.price}
                renderRatingIcons={renderRatingIcons}
              />
            ))
          ) : (
            <p className="text-center">No items available. Add items from the Insert page.</p>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Menu;