import axios from "axios";
import {
  BOOTCAMP_LIST_REQUEST,
  BOOTCAMP_LIST_SUCCESS,
  BOOTCAMP_LIST_FAIL,
  BOOTCAMP_DELETE_SUCCESS,
  BOOTCAMP_DELETE_REQUEST,
  BOOTCAMP_DELETE_FAIL,
  BOOTCAMP_CREATE_REQUEST,
  BOOTCAMP_CREATE_SUCCESS,
  BOOTCAMP_CREATE_FAIL,
  BOOTCAMP_UPDATE_REQUEST,
  BOOTCAMP_UPDATE_SUCCESS,
  BOOTCAMP_UPDATE_FAIL,
  BOOTCAMP_CREATE_REVIEW_REQUEST,
  BOOTCAMP_CREATE_REVIEW_SUCCESS,
  BOOTCAMP_CREATE_REVIEW_FAIL,
} from "../constants/bootcampConstants";

export const listBootcamps = () => async (dispatch) => {
  try {
    dispatch({ type: BOOTCAMP_LIST_REQUEST });

    const {
      data: { data },
    } = await axios.get("/api/v1/bootcamps");

    dispatch({
      type: BOOTCAMP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBootcamp = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOTCAMP_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/bootcamps/${id}`, config);

    dispatch({
      type: BOOTCAMP_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBootcamp = (bootcamp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOTCAMP_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/bootcamps`, bootcamp, config);

    dispatch({
      type: BOOTCAMP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBootcamp = (bootcamp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOTCAMP_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/bootcamps/${bootcamp._id}`,
      bootcamp,
      config
    );

    dispatch({
      type: BOOTCAMP_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBootcampReview = (bootcampId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BOOTCAMP_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/v1/bootcamps/${bootcampId}/reviews`, review, config);

    dispatch({
      type: BOOTCAMP_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BOOTCAMP_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
