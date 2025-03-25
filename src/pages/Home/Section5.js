import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Section5() {
  return (
    <section className="contact_section">
      <Container>
        {/* Spacer Row */}
        <Row>
          <Col>
            <br />
            <br />
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col sm={8} className="d-flex justify-content-center">
            <video width="20%" height="20%" autoPlay muted loop className="img-fluid">
              <source src="/assets/del.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col sm={8}>
            <h2>Fastest Delivery</h2>
            <p>We Guarantee fast delivery. Save your Time, Rupee, and Taste.</p>
            <Link to="/" className="nobtn">
              Call: 999-888-7777
            </Link>
          </Col>
        </Row>

      
        {/* Spacer Row */}
        <Row>
          <Col>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section5;