import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Badge, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { deleteBootcamp } from "../actions/bootcampActions";
import { getUserDetails } from "../actions/userActions";

const ManageCoursesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bootcampDelete = useSelector((state) => state.bootcampDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = bootcampDelete;

  const handleDelete = () => {
    dispatch(deleteBootcamp(bootcamp.id));
  };

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (userInfo.role === "user") history.push("/");
    if (!user.name) {
      dispatch(getUserDetails());
    }
  }, [user, history, dispatch, user]);

  const bootcamp = user && user.bootcamps && user.bootcamps[0];

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="card bg-white py-2 px-4">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Card.Body>
              <Link to="/manage-bootcamp" class="btn btn-link text-secondary my-3"><i class="fas fa-chevron-left"></i> Manage Bootcamp</Link>
              <h1 className="mb-4">Manage Courses</h1>
              {bootcamp.courses ? (
                <>
                </>
              ) : (
                <>
		  <p class="lead">You have not yet added any courses</p>
		  <Link to="add-course" class="btn btn-primary btn-block">Add Your first course</Link>
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
