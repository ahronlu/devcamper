import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Badge, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { deleteBootcamp, getMyBootcamp } from "../actions/bootcampActions";
import { getUserDetails } from "../actions/userActions";
import { deleteCourse, listMyCourses } from "../actions/courseActions";

const ManageCoursesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, bootcamp } = bootcampDetails;

  const courseList = useSelector((state) => state.courseList);
  const { courses } = courseList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
    else dispatch(getMyBootcamp());
  }, [history, dispatch]);

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="card bg-white py-2 px-4">
          {loading ? (
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
              {bootcamp?.courses.length ? (
                <></>
              ) : (
                <>
                  <p class="lead">You have not yet added any courses</p>
                  <Link
                    to={`/bootcamp/${bootcamp?.id}/add-course`}
                    class="btn btn-primary btn-block"
                  >
                    Add Your first course
                  </Link>
                </>
              )}
              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ManageCoursesScreen;
