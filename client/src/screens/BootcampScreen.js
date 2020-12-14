import React, { useState, useEffect } from "react";
import { Alert, Card, Col, Spinner, Row, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BootcampScreen = ({ match }) => {
  const [bootcamp, setBootcamp] = useState(null);

  const { bootcamps, error, loading } = useSelector((state) => state.bootcamps);

  useEffect(() => {
    setBootcamp(bootcamps.find((bootcamp) => bootcamp.id === match.params.id));
  }, [match, bootcamps]);

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      {!bootcamp && loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Col md={8}>
            <h1>{bootcamp.name}</h1>
            <p>{bootcamp.description}</p>
            <p className="lead mb-4">
              Average Course Cost:{" "}
              <span className="text-primary">${bootcamp.averageCost}</span>
            </p>
            {bootcamp.courses &&
              bootcamp.courses.map((course) => (
                <Card key={course._id} className="mb-3">
                  <h5 className="card-header bg-primary text-white">
                    {course.title}
                  </h5>
                  <Card.Body>
                    <Card.Title>Duration: {course.weeks} Weeks</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <ListGroup className="mb-3">
                      <ListGroup.Item>
                        Cost: ${course.tuition} USD
                      </ListGroup.Item>
                      <ListGroup.Item className="text-capitalize">
                        Skill Required: {course.minimumSkill}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Scholarship Available:
                        {course.scholarshipAvailable ? (
                          <i className="fas fa-check text-success"></i>
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              ))}
          </Col>

          <Col md={4}>
            <img src="image_1.jpg" className="img-thumbnail" alt="" />

            <h1 className="text-center my-4">
              <span className="badge badge-secondary badge-success rounded-circle p-3">
                {bootcamp.averageRating}
              </span>{" "}
              Rating
            </h1>

            <Link
              to={`/bootcamps/${bootcamp.id}/reviews`}
              className="btn btn-dark btn-block my-3"
            >
              <i className="fas fa-comments"></i> Read Reviews
            </Link>
            <Link
              to={`/reviews/${bootcamp.id}/add`}
              className="btn btn-light btn-block my-3"
            >
              <i className="fas fa-pencil-alt"></i> Write a Review
            </Link>
            <a
              href="https://google.com"
              className="btn btn-secondary btn-block my-3"
            >
              <i className="fas fa-globe"></i> Visit Website
            </a>

            <div id="map" style={{ width: "100%", height: "300px" }}></div>

            <ListGroup className="mt-4 list-group-flush">
              <ListGroup.Item>
                {bootcamp.housing ? (
                  <i className="fas fa-check text-success"></i>
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}{" "}
                Housing
              </ListGroup.Item>
              <ListGroup.Item>
                {bootcamp.jobAssistance ? (
                  <i className="fas fa-check text-success"></i>
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}{" "}
                Job Assistance
              </ListGroup.Item>
              <ListGroup.Item>
                {bootcamp.jobGuarantee ? (
                  <i className="fas fa-check text-success"></i>
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}{" "}
                Job Guarantee
              </ListGroup.Item>
              <ListGroup.Item>
                {bootcamp.acceptGi ? (
                  <i className="fas fa-check text-success"></i>
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}{" "}
                Accepts GI Bill
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BootcampScreen;
