import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <Container className="showcase fluid">
      <div className="dark-overlay">
        <div className="showcase-inner">
          <h1 className="display-4">Find a Code Bootcamp</h1>
          <p className="lead">
            Find, rate and read reviews on coding bootcamps
          </p>
          <Form action="bootcamps.html">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="miles"
                    placeholder="Miles From"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    placeholder="Enter Zipcode"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Control
              type="submit"
              value="Find Bootcamps"
              className="btn btn-primary btn-block"
            />
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default HomeScreen;
