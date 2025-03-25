import React from "react"; 
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for layout
import PromotionImage from "../../Food_Assets/assets/promotion/pro.png"; 

function Section4() {
  return (
    <>
      {/* Promotion Section */}
      <section className="promotion_section">
        <Container> {/* Bootstrap container for a responsive layout */}
          <Row className="align-items-center"> {/* Aligns content vertically in the center */}
            
            {/* Left Column: Promotion Image */}
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" /> 
              {/* Responsive image */}
            </Col>

            {/* Right Column: Text Content */}
            <Col lg={6} className="px-5"> // large screen
              <h2>Nothing brings people together like Indian food</h2> 
      

              <p>
                "India's flavors are more than just tastes; they are memories.
                Eating Indian food is like taking a flavorful journey across the subcontinent.
                Each spice in Indian cuisine brings its own story to the dish."
              </p>


              <ul>
                <li>
                  <p>
                    Fringilla risus, luctus mauris orci auctor purus euismod
                    pretium purus pretium ligula rutrum tempor sapien
                  </p>
         
                </li>
                <li>
                  <p>Spicing things up, one dish at a time</p>
                </li>
                <li>
                  <p>
                    "A flavorful dish that takes you on a journey to the heart of India.
                    Finding joy in the simplicity of spices and the complexity of flavors"
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>


      <section className="bg_parallax_scroll"></section> 

    </>
  );
}

export default Section4; 
