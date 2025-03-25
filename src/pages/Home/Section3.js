import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Section3() {
  return (
    <section className="menu_section">
      <Container>
        <Row className="text-center"> 
          <Col lg={12}>
            <h2>OUR FOOD</h2>
            <p className="para">
              Food is more than just sustenance; it’s an experience that brings people together, 
              tells stories of culture, and satisfies the senses. From sizzling street food to 
              gourmet fine dining, every dish has a unique flavor, texture, and history. Whether 
              you’re a passionate home cook, a food enthusiast exploring new cuisines, or someone 
              who loves discovering the best eateries, food is an adventure worth savoring. 
              With endless possibilities, from comforting classics to innovative culinary trends, 
              there’s always something new to try, taste, and enjoy. Let’s celebrate the joy of food 
              and the magic it brings to our lives!
            </p>
          </Col>
        </Row>

        {/* Video Row */}
        <Row className="abc">
          <Col md={6} className="text-center">
            <video width="`100%" height="auto" autoPlay muted loop className="img-fluid">
              <source src="/assets/Thali.webm" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
          <Col md={6} className="text-center">
            <video width="100%" height="auto" autoPlay muted loop className="img-fluid">
              <source src="/assets/pizza.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
     
        </Row>
      </Container>
    </section>
  );
}

export default Section3;
