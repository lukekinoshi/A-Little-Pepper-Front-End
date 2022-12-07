import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../Assets/logo.png";
import { UserAuth } from "../Context/AuthContext";

export default function NavBar() {
  const { user } = UserAuth();

  return (
    <div >
      <Navbar expand="lg" bg="light" variant="light" style={{ borderBottom: "1px solid #F8C771" }}>
        <Container >
          <Nav.Link as={Link} to="/" style={{ color: "white" }}>
            <img src={logo} width="85" height="85" className="" alt="" />
          </Nav.Link>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Nav className="ms-auto">
              {/* Below is the conditional for if a user is signed in or not
              Button will change from Sign in to Username  */}
              {user ? (
                <Nav.Link as={Link} to="/profile">
                  <Button variant="outline-dark">Profile</Button>
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/signin">
                  <Button variant="dark">Sign In</Button>
                </Nav.Link>
              )}
            </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </div>
  );
}
