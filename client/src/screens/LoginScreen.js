import React, { useEffect, useState } from "react";
import { Row, Col, Form, Spinner, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Row>
      <Col md={6} className="m-auto">
        <Card className="bg-white p-4 mb-4">
          <Card.Body>
            <h1>
              <i className="fas fa-sign-in-alt"></i> Login
            </h1>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            <p>
              Log in to list your bootcamp or rate, review and favorite
              bootcamps
            </p>
            <Form onSubmit={submit}>
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
              <Form.Group className="mb-4">
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
              <Form.Group>
                <Form.Control
                  type="submit"
                  value={loading ? "Loading..." : "Login"}
                  className="btn btn-primary btn-block"
                  disabled={loading}
                />
              </Form.Group>
            </Form>
            <p>
              {" "}
              Forgot Password? <Link to="/reset-password">Reset Password</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
