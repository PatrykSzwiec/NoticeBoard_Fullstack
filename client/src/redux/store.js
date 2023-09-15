import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';
import initialState from './initialState';
import thunk from 'redux-thunk';


const subreducers = {
  ads: adsReducer,
  user: usersReducer
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;