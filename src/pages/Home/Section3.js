import React from "react"; 
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for layout

function Section3() {
  return (
    // Main section for displaying food-related content
    <section className="menu_section">
      <Container> {/* Bootstrap container for responsiveness */}
        <Row> {/* Bootstrap row to arrange content */}
          <Col lg={{ span: 8, offset: 2 }} className="abc"> 
            {/* Column takes 8 out of 12 grid spaces  screen width, and is centered (offset: 2), full width */}
            <h2><center>OUR FOOD</center></h2> 
            
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
      </Container>
    </section>
  );
}

export default Section3; 
