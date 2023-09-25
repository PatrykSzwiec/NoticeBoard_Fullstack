import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAdById, updateAds , fetchAds} from '../../redux/adsRedux';
import EditForm from "./EditForm";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { API_URL } from "../../config";
import { Alert } from 'react-bootstrap';

const AdFormEdit = ({user}) => {

  const [ status, setStatus] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adData = useSelector((state) => getAdById(state, id));
  console.log('adData: ',adData);

  useEffect(() => {
    return () => {
      // Clear status when component unmounts
      setStatus('');
    };
  }, []);

  const handleEdit = async (ad) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('content', ad.content);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('image', ad.image);
    fd.append('user', ad.user);
    fd.append('publishDate', ad.publishDate);

    const options = {
      method: 'PUT',
      body: fd,
      credentials: 'include',
    };

    fetch(`${API_URL}/ads/${id}`, options)
    .then((res) => {
      console.log('Response:', res);
      return res.json();
    })
    .then((data) => {
      console.log('Response data:', data); // Log the response data
      if (data.message === 'Ad updated') {
        setStatus('success');
        fetchAds()(dispatch);
        console.log('wszystko git');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setStatus('serverError');
      }
    })
    .catch((err) => {
      setStatus('serverError');
      console.error('Fetch error:', err);
    });
  };

  
  if(!adData) return <Navigate to="/" />
    return (
      <div>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully edited!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
          <p>You have to fill all the fields. Photo has to be one of this type of file: *.jpg, *.jpeg, *.gif, *.png.</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
        <EditForm 
          actionText="Edit ad" 
          action={handleEdit} 
          {...adData}
          />
      </div>
    );
};

export default AdFormEdit;