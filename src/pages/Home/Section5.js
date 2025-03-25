import React from "react"; // Import React to define the component
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components for layout
import { Link } from "react-router-dom"; // Import Link for navigation

function Section5() {
  return (
    // Contact Section Wrapper
    <section className="contact_section">
      <Container> {/* Bootstrap container for responsiveness */}
      
        
        <row>  
          <br></br> 
          <br></br>
        </row>

        <Row className="justify-content-center">
          <Col sm={8} className="text-center">
            <h2>Fastest Delivery</h2>
            <p>
              We Guarantee fast delivery. Save your Time, Rupee, and Taste.
            </p>

          
            <Link to="/" className="nobtn">
              Call: 999-888-7777
            </Link>
          </Col>
        </Row>


        <row>  
          <br></br> 
          <br></br> 
        </row>

      </Container>
    </section>
  );
}

export default Section5; 
