import AllAds from "../features/AllAds";
import Spinner from "../common/Spinner";
import Search from "../features/Search";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../config";
import { getAllUsers } from "../../redux/usersRedux";
import { updateAds } from "../../redux/adsRedux";

const Home = props => {

  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getAllUsers);

  useEffect(() => {

    const handleUpdate = () => {
      setPending(true);
      fetch(`${API_URL}/ads`)
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((ads) => {
            dispatch(updateAds(ads));
            setPending(false);
          });
        }
      });
    };
  
    handleUpdate();
  
    if (user) {
      fetch(`${API_URL}/auth/user/${user.login}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            dispatch(updateAds(data._id));
          });
        }
      });
    }
  }, [dispatch, user]);

  return (
    <div>
      {pending && <Spinner />}

      {!pending && (
      <div className="d-flex justify-content-between">
        <Search />
        <Link key={props.id} to={"/ad/add"}>
          <Button variant="success">Add advert</Button>
        </Link> 
        
      </div>
      )}
          
      {!pending && (
        <div>
          <h1>All posts</h1>
          <AllAds />
        </div>
      )}


    </div>
  );
};

export default Home;