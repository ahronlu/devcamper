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
import {
  updateBootcamp,
  createBootcamp,
  getMyBootcamp,
} from "../actions/bootcampActions";
import { getUserDetails } from "../actions/userActions";
import {
  createCourse,
  listCourseDetails,
  updateCourse,
} from "../actions/courseActions";

const initialState = {
  title: "",
  duration: "",
  tuition: "",
  minimumSkill: "",
  description: "",
  scholarshipAvailable: "",
};

const AddCourseScreen = ({ match, history }) => {
  const courseId = match.params.id;

  const [course, setCourse] = useState(initialState);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const courseUpdate = useSelector((state) => state.courseUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = courseUpdate;

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading: bootcampLoading, bootcamp } = bootcampDetails;

  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, course: myCourse } = courseDetails;

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (userInfo.role === "user") history.push("/");
    else {
      dispatch(listCourseDetails(courseId));
      dispatch(getMyBootcamp());
    }
  }, [courseId, dispatch]);

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

  const submitCourse = async (e) => {
    e.preventDefault();
    try {
      if (courseId) {
        await dispatch(updateCourse());
      } else {
        await dispatch(createCourse());
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
            <h1 class="mb-2">{bootcamp.name}</h1>
            <h3 class="text-primary mb-4">Add Course</h3>
            <Form onSubmit={submitCourse}>
              <Form.Control>
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Title"
                />
              </Form.Control>
              <Form.Control>
                <label>Duration</label>
                <input
                  type="number"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  class="form-control"
                />
                <small class="form-text text-muted">
                  Enter number of weeks course lasts
                </small>
              </Form.Control>
              <Form.Control>
                <label>Course Tuition</label>
                <input
                  type="number"
                  name="tuition"
                  value={course.tuition}
                  onChange={handleChange}
                  placeholder="Tuition"
                  class="form-control"
                />
                <small class="form-text text-muted">USD Currency</small>
              </Form.Control>
              <Form.Control>
                <label>Minimum Skill Required</label>
                <select
                  name="minimumSkill"
                  class="form-control"
                  value={course.minimumSkill}
                  onChange={handleChange}
                >
                  <option value="beginner" selected>
                    Beginner (Any)
                  </option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </Form.Control>
              <Form.Control>
                <textarea
                  name="description"
                  rows="5"
                  class="form-control"
                  value={course.description}
                  onChange={handleChange}
                  placeholder="Course description summary"
                  maxlength="500"
                ></textarea>
                <small class="form-text text-muted">
                  No more than 500 characters
                </small>
              </Form.Control>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={course.scholarshipAvailable}
                  onChange={handleChange}
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseScreen;
