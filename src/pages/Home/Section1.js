import { Container } from 'react-bootstrap'; // Import Container from react-bootstrap for layout
import Hero from '../../Food_Assets/assets/hero/hero-2.png'; 
import { Row, Col } from "react-bootstrap"; // Import Row and Col for grid layout
import { Link } from "react-router-dom"; // Import Link for navigation between pages


export const Section1 = () => {
  return (
    <section className='hero_section'> {/* Section wrapper with class for styling */}
      <Container> {/* Bootstrap container for responsiveness */}
        <Row> {/* Bootstrap row for layout */}
          <Col lg={7} className="mb-5 mb-lg-0"> {/* Left column (large size 7 out of 12 grid) */}
            <div className="position-relative"> {/* Wrapper for positioning */}
              <img src={Hero} className="img-fluid" alt="Hero" /> {/* Display hero image */}
              <div className="price_badge"> {/* Price badge overlay */}
                <div className="badge_text">
                  <h4 className="h4_xs">Only</h4> 
                  <h4 className="h3_lg">$7.99</h4> 
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={5}> {/* Right column (large size 5 out of 12 grid) */}
            <div className="hero_text text-center"> {/* Centered text content */}
              <h1 className="text-white">New Burger</h1> 
              <h2 className="text-white">With Onion</h2> 
              <p className="text-white pt-2 pb-4">
                Delicious Onion Burger with extra Cheese  
              </p>
              <h3 className='h3_'>Order now</h3>
            </div>
          </Col>
        </Row>

        {/* Navigation buttons below the hero section */}
        <div className="hero_text text-center">
          <Link to="/signup" className="btn1">Sign Up</Link>
          <Link to="/login" className="btn1">Login</Link>
          <Link to="/Admin" className="btn1">Admin Login</Link> 
        </div>
      </Container>
    </section>
  )
}

export default Section1;
