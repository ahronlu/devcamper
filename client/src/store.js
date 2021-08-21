import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  bootcampCreateReducer,
  bootcampDeleteReducer,
  bootcampDetailsReducer,
  bootcampListReducer,
  bootcampUpdateReducer,
} from "./reducers/bootcampReducers";
import {
  reviewListReducer,
  reviewDetailsReducer,
} from "./reducers/reviewReducers";

const reducer = combineReducers({
  bootcampList: bootcampListReducer,
  bootcampDetails: bootcampDetailsReducer,
  bootcampDelete: bootcampDeleteReducer,
  bootcampCreate: bootcampCreateReducer,
  bootcampUpdate: bootcampUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;