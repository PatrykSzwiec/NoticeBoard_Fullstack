import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="">
        <Navbar bg="secondary" variant="dark" expand="sm" className="justify-content-between mt-4 mb-4 rounded px-3">
          <Navbar.Brand>NoticeBoard.app</Navbar.Brand>
          <Nav>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  };
  
  export default NavBar;