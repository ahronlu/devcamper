import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { listBootcampDetails } from "../actions/bootcampActions";

const BootcampReviewsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const bootcampId = match.params.id;

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, error, bootcamp } = bootcampDetails;

  useEffect(() => {
    dispatch(listBootcampDetails(bootcampId));
  }, [bootcampId, dispatch]);

  return (
    <Row>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Col md={8}>
            <Link
              to={`/bootcamp/${bootcampId}`}
              className="btn btn-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Bootcamp Info
            </Link>
            {bootcamp.reviews.map((review) => (
              <div key={review._id} className="card mb-3">
                <Card.Header className="bg-dark text-white">
                  {review.title}
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Rating:{" "}
                    <span className="text-success">{review.rating}</span>
                  </Card.Title>
                  <p className="card-text">{review.text}</p>
                  <p className="text-muted">Writtern By {review.user.name}</p>
                </Card.Body>
              </div>
            ))}
          </Col>

          <Col md={4}>
            <h1 className="text-center my-4">
              <span className="badge badge-secondary badge-success rounded-circle p-3">
                {bootcamp && bootcamp.averageRating}
              </span>
              Rating
            </h1>
            <Link
              to={`/bootcamp/${bootcampId}/add-review`}
              className="btn btn-primary btn-block my-3"
            >
              <i className="fas fa-pencil-alt"></i> Review This Bootcamp
            </Link>
          </Col>
        </>
      )}
    </Row>
  );
};

export default BootcampReviewsScreen;
