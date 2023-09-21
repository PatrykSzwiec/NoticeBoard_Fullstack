import AdFormAdd from "../features/AdFormAdd";
import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config";

const AddAd = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Define an asynchronous function to fetch user data
    async function fetchUserData() {
      try {
        const options = {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies)
        };

        const response = await fetch(`${API_URL}/auth/user`, options);
        console.log('Response status code:', response.status);
        if (response.ok) {
          const userData = await response.json();
          console.log(userData, 'KURWA USER');
          setUser(userData);
        } else {
          // Handle error responses here, e.g., show an error message
          console.error('Error fetching user data');
        }
      } catch (error) {
        // Handle network errors, e.g., show an error message
        console.error('Network error:', error);
      }
    }

    // Call the fetchUserData function
    fetchUserData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

    return (
      <div>
        <p className="text-center" >AddAd</p>
        {user !== null && <AdFormAdd user={user} />}
      </div>
    );
  };
  
  export default AddAd;