import {
  BOOTCAMP_LIST_REQUEST,
  BOOTCAMP_LIST_SUCCESS,
  BOOTCAMP_LIST_FAIL,
  BOOTCAMP_DELETE_REQUEST,
  BOOTCAMP_DELETE_SUCCESS,
  BOOTCAMP_DELETE_FAIL,
  BOOTCAMP_CREATE_RESET,
  BOOTCAMP_CREATE_FAIL,
  BOOTCAMP_CREATE_SUCCESS,
  BOOTCAMP_CREATE_REQUEST,
  BOOTCAMP_UPDATE_REQUEST,
  BOOTCAMP_UPDATE_SUCCESS,
  BOOTCAMP_UPDATE_FAIL,
  BOOTCAMP_UPDATE_RESET,
  BOOTCAMP_CREATE_REVIEW_REQUEST,
  BOOTCAMP_CREATE_REVIEW_SUCCESS,
  BOOTCAMP_CREATE_REVIEW_FAIL,
  BOOTCAMP_CREATE_REVIEW_RESET,
} from "../constants/bootcampConstants";

export const bootcampsReducer = (state = { bootcamps: [] }, action) => {
  switch (action.type) {
    case BOOTCAMP_LIST_REQUEST:
      return { loading: true, bootcamps: [] };
    case BOOTCAMP_LIST_SUCCESS:
      return {
        loading: false,
        bootcamps: action.payload,
      };
    case BOOTCAMP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bootcampDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOTCAMP_DELETE_REQUEST:
      return { loading: true };
    case BOOTCAMP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOTCAMP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bootcampCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOTCAMP_CREATE_REQUEST:
      return { loading: true };
    case BOOTCAMP_CREATE_SUCCESS:
      return { loading: false, success: true, bootcamp: action.payload };
    case BOOTCAMP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOTCAMP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bootcampUpdateReducer = (state = { bootcamp: {} }, action) => {
  switch (action.type) {
    case BOOTCAMP_UPDATE_REQUEST:
      return { loading: true };
    case BOOTCAMP_UPDATE_SUCCESS:
      return { loading: false, success: true, bootcamp: action.payload };
    case BOOTCAMP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOTCAMP_UPDATE_RESET:
      return { bootcamp: {} };
    default:
      return state;
  }
};

export const bootcampReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOTCAMP_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case BOOTCAMP_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case BOOTCAMP_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case BOOTCAMP_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
