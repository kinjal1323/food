import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext"; // Import useCart

function Cards({ image, rating, title, paragraph, price, renderRatingIcons }) {
  const { addToCart } = useCart(); // Access addToCart function

  const handleAddToCart = () => {
    const item = { image, title, price };
    addToCart(item); // Add item to cart
  };

  return (
    <Col sm={3} lg={4} xl={2} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item_rating">{renderRatingIcons(rating)}</div>
            <div className="wishlist">
              <i className="bi bi-heart"></i>
            </div>
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>
          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">${price}</h5>
            </div>
            <div className="add_to_cart">
              <Link to="/cart" onClick={handleAddToCart}>  {/* ✅ Store item and go to cart */}
                <i className="bi bi-bag me-2"></i>
                Add To Cart 
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;
