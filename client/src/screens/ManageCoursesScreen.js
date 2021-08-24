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
        <Card className="card bg-white py-2 px-4">
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
                class="btn btn-link text-secondary my-3"
              >
                <i class="fas fa-chevron-left"></i> Manage Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>
              {bootcamp?.location && <BootcampItem bootcamp={bootcamp} />}
              <Link
                to={`/bootcamp/${bootcamp?.id}/add-course`}
                class="btn btn-primary btn-block mb-3"
              >
                Add Bootcamp Course
              </Link>
              {courses?.length ? (
                <></>
              ) : (
                <>
                  <p class="lead">You have not yet added any courses</p>
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
