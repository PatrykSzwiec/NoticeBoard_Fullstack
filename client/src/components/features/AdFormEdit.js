import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAdById, updateAds } from '../../redux/adsRedux';
import EditForm from "./EditForm";
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { API_URL } from "../../config";
import { Alert } from 'react-bootstrap';

const AdFormEdit = () => {

  const [ status, setStatus] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adData = useSelector((state) => getAdById(state, id));
  console.log(adData)

  const handleEdit = (ad) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'PUT',
      body: fd,
      credentials: 'include',
    };

    fetch(`${API_URL}/ads/${id}`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus('succes')
          dispatch(updateAds({ ...adData, id }));
          setTimeout(() => navigate('/'), 3000);
        } else if(res.status === 400){
          setStatus('clientError');
        } else if(res.status === 401){
          setStatus('loginError');
        } else{
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  
  if(!adData) return <Navigate to="/" />
    return (
      <div>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully added!</p>
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
          title={adData.title} 
          content={adData.content} 
          price={adData.price} 
          publishDate={adData.publishDate} 
          location={adData.location} 
          login={adData.user.login}/>
      </div>
    );
};

export default AdFormEdit;