import React from "react"; // Import React
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for layout
import { Link } from "react-router-dom"; // Import Link for navigation
import gj from "../../Food_Assets/assets/menu/gujrati.jpg"; 
import Salad from "../../Food_Assets/food.jpg"; 
import Delivery from "../../Food_Assets/delivery-boy.jpg"; 

// Mock Data Array: Contains objects with image, title, and description
const mockData = [
  {
    image: gj,
    title: "Original",
    paragraph:
      "A Gujarati thali is a traditional, balanced meal consisting of various dishes, including rotli, rice, dal, vegetables, yogurt, and often a sweet dish, all served on a large plate or thali.",
  },
  {
    image: Salad,
    title: "Quality Foods",
    paragraph:
      "High-quality food, encompassing both safety and nutritional value, is crucial for maintaining a healthy and balanced life, with minimally processed foods like fruits, vegetables, and whole grains being excellent choices.",
  },
  {
    image: Delivery,
    title: "Fastest Delivery",
    paragraph:
      "In today's fast-paced world, fast and reliable delivery is crucial for customer satisfaction and business success, with many consumers prioritizing speed and convenience.",
  }
];


function Section2() {
  return (
    <>

      <section className="about_section">
        <Container> {/* Bootstrap container for responsiveness */}
          <Row className="justify-content-center"> 
            <Col lg={8} className="text-center"> 
              <h2>The burger tastes better when you eat it with your family</h2>
              <p>
                Eating good food provides numerous benefits, including improved digestion, 
                increased energy, better mood, and a happy and healthy life.
              </p>
              
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about_wrapper py-5">
        <Container>
          <Row className="justify-content-center">
            {mockData.map((cardData, index) => (
              <Col md={6} lg={4} key={index} className="text-center mb-4 d-flex">
                <div className="about_box p-4 shadow rounded w-100 d-flex flex-column align-items-center">
                  <div className="about_icon mb-3">
                    <img
                      src={cardData.image}
                      className="img-fluid"
                      alt="icon"
                      style={{ maxWidth: "80px" }}
                    />
                  </div>
                  <h4 className="mb-2">{cardData.title}</h4>
                  <p className="text-muted flex-grow-1 text-center">{cardData.paragraph}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Section2; // Export component for use in other parts of the app
