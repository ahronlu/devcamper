import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Badge, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
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
              <h1 className="mb-4">Manage Bootcamp</h1>

              {bootcamp ? (
                <>
                  <Card className="mb-3">
                    <Row className="no-gutters">
                      <Col md={4}>
                        <img
                          src="img/image_1.jpg"
                          className="card-img"
                          alt="..."
                        />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title>
                            <Link to={`/bootcamp/${bootcamp.id}`}>
                              {bootcamp.name}
                              <Badge pill className="float-right badge-success">
                                {bootcamp.averageRating}
                              </Badge>
                            </Link>
                          </Card.Title>
                          <Badge pill className="badge-dark mb-2">
                            {bootcamp.location.city}, {bootcamp.location.state}
                          </Badge>
                          <Card.Text>
                            {bootcamp.careers.map((c, i) =>
                              i < bootcamp.careers.length - 1 ? c + ", " : c
                            )}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                  <Form className="mb-4">
                    <Form.Group>
                      <div className="custom-file">
                        <input
                          type="file"
                          name="photo"
                          className="custom-file-input"
                          id="photo"
                        />
                        <label className="custom-file-label" htmlFor="photo">
                          Add Bootcamp Image
                        </label>
                      </div>
                    </Form.Group>
                    <input
                      type="submit"
                      className="btn btn-light btn-block"
                      value="Upload Image"
                    />
                  </Form>
                  <Link
                    to={`/bootcamp/${bootcamp._id}/edit`}
                    className="btn btn-primary btn-block mt-2"
                  >
                    Edit Bootcamp Details
                  </Link>
                  <Link
                    to="/manage-courses"
                    className="btn btn-secondary btn-block"
                  >
                    Manage Courses
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger mb-2 btn-block"
                  >
                    Remove Bootcamp
                  </button>
                  {deleteLoading && <Spinner animation="boder" />}
                  {deleteError && <Alert variant="danger">{deleteError}</Alert>}
                  {deleteSuccess && (
                    <Alert variant="success">Bootcamp Deleted</Alert>
                  )}
                </>
              ) : (
                <>
                  <p className="lead">You have not yet added a bootcamp</p>
                  <Link
                    to="/bootcamp/create"
                    className="btn btn-primary btn-block"
                  >
                    Add Bootcamp
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
