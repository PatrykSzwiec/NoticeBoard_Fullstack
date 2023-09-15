import shortid from 'shortid';
import { API_URL } from '../config';

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id);

// actions
const createActionName = actionName => `app/ads/${actionName}`;
const REMOVE_AD = createActionName('REMOVE_AD');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const SEARCH_ADS = createActionName('SEARCH_ADS');
const UPDATE_ADS = createActionName('UPDATE_ADS');

// action creators
export const removeAd = payload => ({ type: REMOVE_AD, payload });
export const addAd = payload => ({ type: ADD_AD, payload });
export const editAd = payload => ({ type: EDIT_AD, payload });
export const searchAd = (payload) => ({ type: SEARCH_ADS, payload: { payload } });
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });

export const fetchAds = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/ads`);

      dispatch(updateAds(response.data));
    } catch (error) {
      console.log(error); 
    }
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_AD:
      return [...statePart.filter(ad => ad._id !== action.payload)];
    case ADD_AD:
      return [...statePart, { ...action.payload, _id: shortid() }];
    case EDIT_AD:
      return statePart.map(ad => (ad.id === action.payload.id ? { ...ad, ...action.payload } : ad));
    case SEARCH_ADS:
      return statePart.filter((ad) => ad.title.includes(action.payload));
    case UPDATE_ADS:
      return [...action.payload];
    default:
      return statePart;
  };
};

export default adsReducer;