import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../Assets/logo.png";

export default function NavBar() {
  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Nav.Link as={Link} to="/" style={{ color: "white" }}>
            <img src={logo} width="100" height="100" className="" alt="" />
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Example
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Example
              </Nav.Link>
              <Nav.Link as={Link} to={"/"}>
                Example
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Example
              </Nav.Link>
            </Nav>
            <Nav>
              {/* Below is the conditional for if a user is signed in or not
              Button will change from Sign in to Username  */}
            {/* {user ? ( */}
                <Nav.Link
              as={Link} to="/"
              >
               <Button variant="outline-dark">
                  UserName
                </Button>
             </Nav.Link> 
              {/* ) : (  */}
              <Button variant="warning">
                Sign In
              </Button>
             {/* )}  */}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
