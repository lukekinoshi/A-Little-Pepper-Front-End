import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Assets/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div style={{ background: "#F8C771" }}>
      <Container>
        <Row className="d-flex align-items-center justify-content-around" xs={1} md={3} lg={3}>
          <Col className="d-flex align-items-center justify-content-beggining py-3">
            <Link to="/" style={{ color: "white", listStyle: "none" }}>
              <img src={logo} width="100" height="100" />
            </Link>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
          <h6>
          A Little Pepper © 2022
            </h6>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Link className="me-2" style={{color:"black"}}>
          <FontAwesomeIcon icon={faInstagram} size="2xl"/>
            </Link>
            <Link className="ms-2" style={{color:"black"}}>
          <FontAwesomeIcon icon={faTwitter} size="2xl"/>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
