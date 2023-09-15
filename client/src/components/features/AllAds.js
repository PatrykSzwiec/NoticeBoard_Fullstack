import { useSelector } from "react-redux";
import { getAllAds } from "../../redux/adsRedux";
import { Row } from "react-bootstrap";
import Ad from "../pages/Ad";


const AllAds = () => {

  const ads = useSelector(getAllAds);

	return (
    <Row className="justify-content-between">
        {ads.map(ad => <Ad key={ad._id} {...ad} />)}  
    </Row>  
	);
};

export default AllAds;