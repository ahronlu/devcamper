import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserDetails, updateUserDetails } from "../actions/userActions";

const ManageAccountScreen = ({ history, userInfo }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user, success } = userDetails;

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [userInfo, history, dispatch, user]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails({ name, email }));
  };

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Card.Body>
              <h1 className="mb-2">Manage Account</h1>
              {error && (
                <Alert variant="danger" dismissible>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" dismissible>
                  Account Updated
                </Alert>
              )}
              <Form onSubmit={submit}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        type="submit"
                        value="Save"
                        className="btn btn-success btn-block"
                      />
                    </Col>
                    <Col md={6}>
                      <Link
                        to="/update-password"
                        className="btn btn-secondary btn-block"
                      >
                        Update Password
                      </Link>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ManageAccountScreen;
