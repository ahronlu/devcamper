import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteBootcamp } from "../actions/bootcampActions";

const ManageBootcampScreen = () => {
  const dispatch = useDispatch();
  const [bootcamp, setBootcamp] = useState(null);
  const { bootcamps } = useSelector((state) => state.bootcampList);
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleDelete = () => {
    dispatch(deleteBootcamp(bootcamp.id));
  };

  useEffect(() => {
    bootcamps &&
      setBootcamp(bootcamps.find((bootcamp) => bootcamp.user === userInfo.id));
  }, [bootcamps, userInfo]);

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="card bg-white py-2 px-4">
          <div className="card-body">
            <h1 className="mb-4">Manage Bootcamp</h1>
            {bootcamp ? (
              <>
                <div className="card mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src="img/image_1.jpg"
                        className="card-img"
                        alt="..."
                      />
                    </div>
                    <Col md={8}>
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to={`/bootcamps/${bootcamp.id}`}>
                            {bootcamp.name}
                            <span className="float-right badge badge-success">
                              {bootcamp.averageRating}
                            </span>
                          </Link>
                        </h5>
                        <span className="badge badge-dark mb-2">
                          {bootcamp.location.city}, {bootcamp.location.state}
                        </span>
                        <p className="card-text">
                          {bootcamp.careers.map((c, i) =>
                            i < bootcamp.careers.length - 1 ? c + ", " : c
                          )}
                        </p>
                      </div>
                    </Col>
                  </div>
                </div>
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
                  to={`/bootcamps/${bootcamp._id}/edit`}
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
                  className="btn btn-danger btn-block"
                >
                  Remove Bootcamp
                </button>
              </>
            ) : (
              <>
                <p className="lead">You have not yet added a bootcamp</p>
                <Link
                  to="/bootcamps/create"
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
              * You must be affiliated with the bootcamp in some way in order to
              add it to DevCamper.
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ManageBootcampScreen;
