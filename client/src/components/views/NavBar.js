import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { API_URL } from '../../config'; 
import { useSelector } from 'react-redux';
import Logout from '../pages/Logout';


const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector(state => state.user); // Get user data from Redux store

  useEffect(() => {
      // Make an API request to check the user's authentication status
      const checkAuthStatus = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/user`, {
            credentials: 'include', // Include cookies in the request
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error checking authentication status:', error);
        }
      };

      checkAuthStatus();
  }, [user]);
    return (
      <div className="">
        <Navbar 
          bg="secondary" 
          variant="dark" 
          expand="sm" 
          className="justify-content-between mt-4 mb-4 rounded px-3"
        >
          <Navbar.Brand>NoticeBoard.app</Navbar.Brand>
          <Nav>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
          {isAuthenticated ? (
            <NavDropdown title={<><FontAwesomeIcon icon={faUser} /> My Account</>} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/logout">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <Logout />
            </NavDropdown>
          ) : (
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          )}
        </Nav>
        </Navbar>
      </div>
    );
  };
  
  export default NavBar;