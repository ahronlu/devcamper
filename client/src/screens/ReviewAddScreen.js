import React from "react";
// import { useSelector } from "react-redux";
import { Card, Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function ReviewAddScreen({ match }) {
  const { bootcampId } = match.params;

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <Row>
      <Col md={8} className="m-auto">
        <Card className="bg-white py-2 px-4">
          <Card.Body>
            <Link
              to={`/bootcamp/${bootcampId}`}
              className="btn btn-link text-secondary my-3"
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>{" "}
              Bootcamp Info
            </Link>
            <h1 className="mb-2">DevWorks Bootcamp</h1>
            <h3 className="text-primary mb-4">Write a Review</h3>
            <p>You must have attended and graduated this bootcamp to review</p>
            <Form onSubmit={submit}>
              <Form.Group>
                {/* <Form.Control htmlFor="rating">
                  Rating: <span className="text-primary">8</span>
                </Form.Control> */}
                <Form.Control
                  type="range"
                  className="custom-range"
                  min="1"
                  max="10"
                  step="1"
                  value="8"
                  id="rating"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Review title"
                />
              </Form.Group>
              <Form.Group>
                <textarea
                  name="review"
                  rows="10"
                  className="form-control"
                  placeholder="Your review"
                ></textarea>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="submit"
                  value="Submit Review"
                  className="btn btn-dark btn-block"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ReviewAddScreen;
