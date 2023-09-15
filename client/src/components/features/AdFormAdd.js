import { useDispatch } from "react-redux";
import { updateAds } from "../../redux/adsRedux";
import { useNavigate } from "react-router-dom";
import AddForm from "./AddForm";

const AdFormAdd = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = ad => {
    navigate("/");
    dispatch(updateAds(ad));
  }; 

  return (
    <div>
      <AddForm actionText="Add new ad" action={handleAdd}/>
    </div>
    
  );
};

export default AdFormAdd;