import AdFormAdd from "../features/AdFormAdd";
import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config";

const AddAd = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const options = {
          method: 'GET',
          credentials: 'include',
        };

        const response = await fetch(`${API_URL}/auth/user`, options);
        console.log('Response status code:', response.status);
        if (response.ok) {
          const userData = await response.json();
          console.log(userData, 'KURWA USER');
          setUser(userData);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchUserData();
  }, []); 

    return (
      <div>
        <p className="text-center" >AddAd</p>
        {user !== null && <AdFormAdd user={user} />}
      </div>
    );
  };
  
  export default AddAd;