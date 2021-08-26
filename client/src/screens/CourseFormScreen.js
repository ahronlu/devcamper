import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Row, Col, Card, Form, Spinner } from "react-bootstrap";
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
    if (createSuccess) history.push("/manage-courses");
    if (!userInfo) history.push("/login");
    else if (userInfo.role === "user") history.push("/");
    else {
      !bootcamp && dispatch(getMyBootcamp());
      courseId && dispatch(listCourseDetails(courseId));
    }
  }, [bootcampId, dispatch, createSuccess]);

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
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          <Card.Body>
            <Link
              to="manage-courses"
              className="btn btn-link text-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Manage Courses
            </Link>
            <h1 className="mb-2">{bootcamp.name}</h1>
            {loading ||
              updateLoading ||
              bootcampLoading ||
              (createLoading && <Spinner animation="border" />)}
            <h3 className="text-primary mb-4">Add Course</h3>
            <Form onSubmit={submitCourse}>
              <Form.Group>
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  name="weeks"
                  value={course.weeks}
                  onChange={handleChange}
                  placeholder="Duration"
                />
                <Form.Text className="text-muted">
                  Enter number of weeks course lasts
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Course Tuition</Form.Label>
                <Form.Control
                  type="number"
                  name="tuition"
                  value={course.tuition}
                  onChange={handleChange}
                  placeholder="Tuition"
                />
                <Form.Text className="text-muted">USD Currency</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Minimum Skill Required</Form.Label>
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
              </Form.Group>
              <Form.Group>
                <textarea
                  name="description"
                  rows="5"
                  className="form-control"
                  value={course.description}
                  onChange={handleChange}
                  placeholder="Course description summary"
                  maxlength="500"
                ></textarea>
                <Form.Text className="text-muted">
                  No more than 500 characters
                </Form.Text>
              </Form.Group>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  name="scholarshipAvailable"
                  id="scholarshipAvailable"
                />
                <Form.Check.Label for="scholarshipAvailable">
                  Scholarship Available
                </Form.Check.Label>
              </Form.Check>
              <Form.Group className="mt-4">
                <Form.Control
                  type="submit"
                  value="Add Course"
                  className="btn btn-dark btn-block"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CourseFormScreen;
