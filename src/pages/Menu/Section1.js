import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../component/Layouts/Cards";

// Function to Render Star Ratings
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

  // Load data from localStorage when component mounts
  useEffect(() => {
    const loadMenu = () => {
      const storedMenuData = JSON.parse(localStorage.getItem("menuItems")) || [];
      setMenuItems(storedMenuData);
    };

    loadMenu(); // Initial load

    // Listen for localStorage updates from Acrud.js
    const handleStorageChange = () => {
      loadMenu();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Combine predefined data with dynamically added data
  const combinedMenuItems = [ ...menuItems];

  return (
    <section className="menu_section">
      <Container>
        {/* Heading Section */}
        <Row className="text-center mb-5">
          <h2 className="fw-bold">OUR FOOD</h2>
          <h5 className="text-muted">The meal was delicious, with a tangy and flavorful taste.</h5>
        </Row>

        {/* Food Items Grid */}
        <Row className="g-4">
          {combinedMenuItems.length > 0 ? (
            combinedMenuItems.map((cardData, index) => (
              <Col key={index} xs={6} sm={3} md={4} lg={3}>
                <Cards
                  image={cardData.image}
                  rating={cardData.rating}
                  title={cardData.title}
                  paragraph={cardData.paragraph}
                  price={cardData.price}
                  renderRatingIcons={renderRatingIcons}
                />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p>No items available. Add items from the Insert page.</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Menu;
