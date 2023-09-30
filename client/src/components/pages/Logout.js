import { API_URL } from "../../config";
import { logOut } from "../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.status === 200) {
        setIsAuthenticated(false);
        dispatch(logOut());
        navigate('/');
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
  );
};

export default Logout;