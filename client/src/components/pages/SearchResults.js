/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import { API_URL } from '../../config';
import { useParams } from 'react-router-dom';
import Ad from './Ad';
import Spinner from '../common/Spinner';
//import { getAllAds } from "../../redux/adsRedux";
//import { useSelector } from 'react-redux';


const SearchResults = () => {

	//const ads = useSelector(getAllAds);

  const searchId = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchData = async () => {
    await fetch(`${API_URL}/ads/search/${searchId}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      {data.length === 0 && <h3>Something went wrong. Try again</h3>}
      {loading && <Spinner />}
      {!loading && (
        <div>
          <h2>Searched adds</h2>
          <Row className="justify-content-between">
            {data.map(ad => <Ad key={ad._id} {...ad} />)}  
          </Row>
        </div>
      )}
    </div>
  );
};

export default SearchResults;