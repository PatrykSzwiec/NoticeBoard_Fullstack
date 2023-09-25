import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../config";
import styles from './Ad.module.scss';


const Ad = ({ title, location, image, _id }) => {

  return (
    <Col className="py-4 col-12 col-sm-6 col-lg-4">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <b>Location: </b>{location}
          </Card.Text>
          <Link to={"/ad/" + _id}>
            <Button variant="success">Read more</Button>
          </Link> 
        </Card.Body>
        <Card.Img 
          variant="top" 
          src={IMAGES_URL + image} 
          className={styles['ad-image']}
        />
      </Card>
    </Col>
  );
};

export default Ad;