import React, { useState, useEffect } from "react";
import { Row, Col, Form, Card, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      history.push("/");
    }
  }, [history, userInfo]);

  const submit = (e) => {
    if (confirmPassword !== password) return;
    e.preventDefault();
    console.log(name, email, password, role);
    dispatch(register(name, email, password, role));
  };

  return (
    <Row>
      <Col md={6} className="m-auto">
        <Card className="bg-white p-4 mb-4">
          <Card.Body>
            <h1>
              <i className="fas fa-user-plus"></i> Register
            </h1>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <p>
              Register to list your bootcamp or rate, review and favorite
              bootcamps
            </p>
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Card.Body className="mb-3">
                <h5>User Role</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="user"
                    onChange={(e) => setRole(e.target.value)}
                    checked
                  />
                  <label className="form-check-label">
                    Regular User (Browse, Write reviews, etc)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    value="publisher"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label className="form-check-label">Bootcamp Publisher</label>
                </div>
              </Card.Body>
              <p className="text-danger">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
              <Form.Group>
                <Form.Control
                  type="submit"
                  value={loading ? "Loading..." : "Register"}
                  className="btn btn-primary btn-block"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
