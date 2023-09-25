import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById, removeAd } from "../../redux/adsRedux";
import { Button, Modal, Card, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { IMAGES_URL, API_URL } from "../../config";
import { getAllUsers } from "../../redux/usersRedux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const SingleAd = () => {

  const { id } = useParams();
  const adData = useSelector(state => getAdById(state, id));
  console.log(adData)
  
  const user = useSelector(getAllUsers);
  console.log(user)
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

    
  const dispatch = useDispatch();

  const deleteAd = e => {
    e.preventDefault();
    dispatch(removeAd(id));

    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(`${API_URL}/ads/${adData._id}`, options)
      .then(res => {
        handleClose();
        navigate('/');
      });
      
  };



  if(!adData) return <Navigate to="/" />
  return (
      <div>
        <div className="d-flex justify-content-between">
        <Col className="py-4 col-12 col-sm-6 col-lg-6" >
          <Card>
          <Card.Title>{adData.title}</Card.Title>
            <Card.Img variant="top" src={IMAGES_URL + adData.image} />
            <Card.Body>
              <p><b>Location: </b>{adData.location}</p>
              <p><b>Price: </b>{adData.price}</p>
              <p>Content: {adData.content}</p>
              <p>Published: {adData.publishDate}</p>
              <h5>Seller data</h5>
              
              <p>Login: {adData.user}</p>
              <p>Phone number: {adData.user.phone}</p>
            </Card.Body>
          </Card>
        </Col>
          {!user && (<div>
            <Link to={`/ad/edit/${id}`}>
              <Button variant="outline-success m-1">Edit ad</Button>
            </Link>
            <Button onClick={handleShow} variant="outline-danger m-1">Delete</Button>
          </div>)}
        </div>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This operation will completely remove this ad from the app. 
              <br/>Are you sure you want to do that?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">Cancel</Button>
            <Button onClick={deleteAd} variant="danger">Remove</Button>
          </Modal.Footer>
        </Modal>
        
        

      </div>
    );
};

export default SingleAd;