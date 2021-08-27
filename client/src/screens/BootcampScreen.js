import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Col, Spinner, Row, ListGroup } from "react-bootstrap";
import { listBootcampDetails } from "../actions/bootcampActions";
import { BOOTCAMP_DETAILS_RESET } from "../constants/bootcampConstants";

const BootcampScreen = ({ match }) => {
  const { bootcampId } = match.params;
  const dispatch = useDispatch();

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, error, bootcamp } = bootcampDetails;

  useEffect(() => {
    dispatch(listBootcampDetails(bootcampId));
    return () => dispatch({ type: BOOTCAMP_DETAILS_RESET });
  }, [dispatch, bootcampId]);

  return (
    <>
      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}

      {!bootcamp && loading ? (
        <Spinner animation="border" />
      ) : (
        bootcamp && (
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
                    <Card.Header className="bg-primary text-white">
                      {course.title}
                    </Card.Header>
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
                </span>
                Rating
              </h1>

              <Link
                to={`/bootcamp/${bootcamp.id}/reviews`}
                className="btn btn-dark btn-block my-3"
              >
                <i className="fas fa-comments"></i> Read Reviews
              </Link>
              <Link
                to={`/bootcamp/${bootcamp.id}/add-review`}
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
        )
      )}
    </>
  );
};

export default BootcampScreen;
