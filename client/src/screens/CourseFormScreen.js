import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Row,
  Col,
  Card,
  Form,
  FormCheck,
  Spinner,
} from "react-bootstrap";
import { updateBootcamp, createBootcamp } from "../actions/bootcampActions";
import { getUserDetails } from "../actions/userActions";

const initialState = {
  name: "",
  description: "",
  website: "",
  phone: "",
  email: "",
  address: "",
  location: { formattedAddress: "" },
  careers: [],
  jobAssistance: false,
  jobGuarantee: false,
  acceptGi: false,
  housing: false,
};

const CourseFormScreen = ({ match, history }) => {
  const courseId = match.params.id;

  const [course, setCourse] = useState(initialState);

  const dispatch = useDispatch();

  const bootcampUpdate = useSelector((state) => state.bootcampUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = bootcampUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [match, dispatch]);

  const handleChange = (e) => {
    e.target.type === "checkbox"
      ? setCourse({
          ...course,
          [e.target.name]: e.target.checked,
        })
      : setCourse({
          ...course,
          [e.target.name]: e.target.value,
        });
  };

  //   const handleCareersChange = (e) => {
  //     const options = e.target;
  //     let value = [];
  //     for (let i = 0, l = options.length; i < l; i++) {
  //       if (options[i].selected) {
  //         value.push(options[i].value);
  //       }
  //     }
  //     setCourse({ ...course });
  //   };

  const SubmitBoocamp = async (e) => {
    e.preventDefault();
    try {
      if (courseId) {
        await dispatch(updateBootcamp());
      } else {
        await dispatch(createBootcamp());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <a
              href="manage-courses.html"
              class="btn btn-link text-secondary my-3"
            >
              <i class="fas fa-chevron-left"></i> Manage Courses
            </a>
            <h1 class="mb-2">DevWorks Bootcamp</h1>
            <h3 class="text-primary mb-4">Add Course</h3>
            <form action="manage-bootcamp.html">
              <div class="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label>Duration</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="Duration"
                  class="form-control"
                />
                <small class="form-text text-muted">
                  Enter number of weeks course lasts
                </small>
              </div>
              <div class="form-group">
                <label>Course Tuition</label>
                <input
                  type="number"
                  name="tuition"
                  placeholder="Tuition"
                  class="form-control"
                />
                <small class="form-text text-muted">USD Currency</small>
              </div>
              <div class="form-group">
                <label>Minimum Skill Required</label>
                <select name="minimumSkill" class="form-control">
                  <option value="beginner" selected>
                    Beginner (Any)
                  </option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div class="form-group">
                <textarea
                  name="description"
                  rows="5"
                  class="form-control"
                  placeholder="Course description summary"
                  maxlength="500"
                ></textarea>
                <small class="form-text text-muted">
                  No more than 500 characters
                </small>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="scholarshipAvailable"
                  id="scholarshipAvailable"
                />
                <label class="form-check-label" for="scholarshipAvailable">
                  Scholarship Available
                </label>
              </div>
              <div class="form-group mt-4">
                <input
                  type="submit"
                  value="Add Course"
                  class="btn btn-dark btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFormScreen;
