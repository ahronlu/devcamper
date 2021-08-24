import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Badge, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { deleteBootcamp, getMyBootcamp } from "../actions/bootcampActions";
import { deleteCourse, listMyCourses } from "../actions/courseActions";
import BootcampItem from "../components/BootcampItem";

const ManageCoursesScreen = ({ history, userInfo }) => {
  const dispatch = useDispatch();

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, bootcamp } = bootcampDetails;

  const courseList = useSelector((state) => state.courseList);
  const { courses } = courseList;

  const courseDelete = useSelector((state) => state.courseDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = courseDelete;

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (userInfo.role === "user") history.push("/");
    else {
      !bootcamp?.id && dispatch(getMyBootcamp());
      bootcamp?.id && dispatch(listMyCourses(bootcamp.id));
    }
  }, [history, dispatch, deleteSuccess, bootcamp.id]);

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          {deleteLoading && <Spinner animation="border" />}
          {deleteLoading && <Spinner animation="boder" />}
          {deleteError && (
            <Alert variant="danger" dismissible>
              {deleteError}
            </Alert>
          )}
          {loading && !bootcamp ? (
            <Spinner animation="border" />
          ) : (
            <Card.Body>
              <Link
                to="/manage-bootcamp"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              {bootcamp?.location && <BootcampItem bootcamp={bootcamp} />}
              <Link
                to={`/bootcamp/${bootcamp?.id}/add-course`}
                className="btn btn-primary btn-block mb-4"
              >
                Add Bootcamp Course
              </Link>
              {courses?.length ? (
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course._id}>
                        <td>{course.name}</td>
                        <td>
                          <a href="add-course.html" class="btn btn-secondary">
                            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                          </a>
                          <button class="btn btn-danger">
                            <i class="fas fa-times" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <p className="lead">You have not yet added any courses</p>
                </>
              )}
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ManageCoursesScreen;
