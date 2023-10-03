/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAds, fetchAds } from '../../redux/adsRedux';
import Ad from './Ad';
import Spinner from '../common/Spinner';

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const ads = useSelector(getAllAds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ads.length === 0) {
      dispatch(fetchAds())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, ads]);

  useEffect(() => {
    const filteredAds = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setData(filteredAds);
  }, [ads, searchPhrase]);

  return (
    <div>
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