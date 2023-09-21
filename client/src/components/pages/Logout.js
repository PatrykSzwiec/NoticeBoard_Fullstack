import { API_URL } from "../../config";
import { logOut } from "../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { NavDropdown } from "react-bootstrap";

const Logout = () => {
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies in the request
      });
  
      if (response.status === 200) {
        setIsAuthenticated(false); // Update state when logout is successful
        dispatch(logOut());
        window.location.reload();
      } else {
        // Handle logout failure
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle errors if the request fails
    }
  };

  return (
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  );
};

export default Logout;