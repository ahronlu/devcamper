import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ResetPasswordScreen = () => {
  return (
    <Row>
      <Col md={8} class="m-auto">
        <Card class="bg-white py-2 px-4">
          <Card.Body>
            <Link to="/login">Back to login</Link>
            <h1 class="mb-2">Reset Password</h1>
            <p>
              Use this form to reset your password using the registered email
              address.
            </p>
            <Form>
              <Form.Group>
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  name="email"
                  class="form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="submit"
                  value="Reset Password"
                  class="btn btn-dark btn-block"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPasswordScreen;
