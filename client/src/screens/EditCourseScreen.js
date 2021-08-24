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

const EditCourseScreen = ({ match, history, userInfo }) => {
  const courseId = match.params.id;

  const [course, setCourse] = useState(initialState);

  const dispatch = useDispatch();

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
  const {
    loading: bootcampLoading,
    bootcamp,
    error: bootcampError,
  } = bootcampDetails;

  const courseDetails = useSelector((state) => state.courseDetails);
  const {
    loading: courseLoading,
    course: myCourse,
    error: courseError,
  } = courseDetails;

  useEffect(() => {
    if (userInfo.role === "user") history.push("/");
    if (!myCourse || myCourse._id) {
      dispatch(listCourseDetails(courseId));
    }
    if (!bootcamp || !bootcamp._id) {
      dispatch(getMyBootcamp());
    }
  }, [courseId, dispatch, myCourse, bootcamp]);

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
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          <Card.Body className="card-body">
            <Link
              to="/manage-courses"
              className="btn btn-link text-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Manage Courses
            </Link>
            <h1 className="mb-2">{bootcamp.name}</h1>
            {updateLoading ||
              courseLoading ||
              bootcampLoading ||
              bootcampLoading ||
              (createLoading && <Spinner animation="border" />)}
            {updateError && <Alert variant="danger">{updateError}</Alert>}
            {createError && <Alert variant="danger">{createError}</Alert>}
            {bootcampError && <Alert variant="danger">{bootcampError}</Alert>}
            {courseError && <Alert variant="danger">{courseError}</Alert>}
            <h3 className="text-primary mb-4">Add Course</h3>
            <Form onSubmit={submitCourse}>
              <Form.Control>
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  className="form-control"
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
                  className="form-control"
                />
                <small className="form-text text-muted">
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
                  className="form-control"
                />
                <small className="form-text text-muted">USD Currency</small>
              </Form.Control>
              <Form.Control>
                <label>Minimum Skill Required</label>
                <select
                  name="minimumSkill"
                  className="form-control"
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
                  className="form-control"
                  value={course.description}
                  onChange={handleChange}
                  placeholder="Course description summary"
                  maxlength="500"
                ></textarea>
                <small className="form-text text-muted">
                  No more than 500 characters
                </small>
              </Form.Control>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={course.scholarshipAvailable}
                  onChange={handleChange}
                  name="scholarshipAvailable"
                  id="scholarshipAvailable"
                />
                <label className="form-check-label" for="scholarshipAvailable">
                  Scholarship Available
                </label>
              </div>
              <div className="form-group mt-4">
                <input
                  type="submit"
                  value="Add Course"
                  className="btn btn-dark btn-block"
                />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditCourseScreen;
