import React from "react"; // Import React for creating a functional component
import { Container, Row } from "react-bootstrap";

import User1 from "../../Food_Assets/assets/blog/review-author-1.jpg";
import User2 from "../../Food_Assets/assets/blog/review-author-2.jpg";
import User3 from "../../Food_Assets/assets/blog/review-author-3.jpg";
import User4 from "../../Food_Assets/assets/blog/review-author-5.jpg";

function Section1() {
  return (
    <section className="blog_section"> {/* Main section for styling */}
      <Container> {/* Bootstrap container for responsiveness */}
        <Row> {/* Bootstrap row for structuring content */}
            {/* First Review */}
            <Container className="a"> {/* Container with class "a" for styling */}
              <h5>Mr NEWLOVE</h5> {/* User's name */}
              <p>
                " Etiam sapien sem at sagittis congue augue massa varius
                sodales sapien undo tempus dolor egestas magna suscipit magna
                tempus aliquet porta sodales augue suscipit luctus neque "
              </p>
              <div className="user_img"> {/* Wrapper for image */}
                <img src={User1} className="img-fluid" alt="User-1" /> {/* User's image */}
              </div>
            </Container>

            {/* Second Review */}
            <Container>
              <h5>Ms NEWLOVE</h5>
              <p>
                " Etiam sapien sem at sagittis congue augue massa varius
                sodales sapien undo tempus dolor egestas magna suscipit magna
                tempus aliquet porta sodales augue suscipit luctus neque "
              </p>
              <div className="user_img">
                <img src={User2} className="img-fluid" alt="User-2" />
              </div>
            </Container>

            {/* Third Review */}
            <Container className="b">
              <h5>Mr NEWLOVE</h5>
              <p>
                " Etiam sapien sem at sagittis congue augue massa varius
                sodales sapien undo tempus dolor egestas magna suscipit magna
                tempus aliquet porta sodales augue suscipit luctus neque "
              </p>
              <div className="user_img">
                <img src={User3} className="img-fluid" alt="User-3" />
              </div>
            </Container>

            {/* Fourth Review */}
            <Container className="c">
              <h5>Mrs NEWLOVE</h5>
              <p>
                " Etiam sapien sem at sagittis congue augue massa varius
                sodales sapien undo tempus dolor egestas magna suscipit magna
                tempus aliquet porta sodales augue suscipit luctus neque "
              </p>
              <div className="user_img">
                <img src={User4} className="img-fluid" alt="User-4" />
              </div>
            </Container>
        </Row>
      </Container>
    </section>
  );
}

export default Section1; 
