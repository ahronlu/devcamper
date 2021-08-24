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
import { getMyBootcamp } from "../actions/bootcampActions";
import { getUserDetails } from "../actions/userActions";
import {
  createCourse,
  listCourseDetails,
  updateCourse,
} from "../actions/courseActions";

const initialState = {
  title: "",
  weeks: "",
  tuition: "",
  minimumSkill: "beginner",
  description: "",
};

const CourseFormScreen = ({ match, history }) => {
  const { bootcampId } = match.params;
  const { courseId } = match.params;

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

  const courseCreate = useSelector((state) => state.courseCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = courseCreate;

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading: bootcampLoading, bootcamp } = bootcampDetails;

  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, course: myCourse } = courseDetails;

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (userInfo.role === "user") history.push("/");
    else {
      !bootcamp && dispatch(getMyBootcamp());
      courseId && dispatch(listCourseDetails(courseId));
    }
  }, [bootcampId, dispatch]);

  const handleChange = (e) => {
    console.log(e.target.value);
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

  const submitCourse = async (e) => {
    e.preventDefault();
    console.log(course);
    try {
      if (courseId) {
        await dispatch(updateCourse(course));
      } else {
        await dispatch(createCourse(bootcampId, course));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="row">
      <div class="col-md-8 m-auto">
        <Card class="bg-white py-2 px-4">
          <div class="card-body">
            <Link to="manage-courses" class="btn btn-link text-secondary my-3">
              <i class="fas fa-chevron-left"></i> Manage Courses
            </Link>
            <h1 class="mb-2">{bootcamp.name}</h1>
            {loading ||
              updateLoading ||
              bootcampLoading ||
              (createLoading && <Spinner animation="border" />)}
            <h3 class="text-primary mb-4">Add Course</h3>
            <Form onSubmit={submitCourse}>
              <div class="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label>Duration</label>
                <input
                  type="number"
                  name="weeks"
                  value={course.weeks}
                  onChange={handleChange}
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
                  value={course.tuition}
                  onChange={handleChange}
                  placeholder="Tuition"
                  class="form-control"
                />
                <small class="form-text text-muted">USD Currency</small>
              </div>
              <div class="form-group">
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
              </div>
              <div class="form-group">
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
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseFormScreen;
