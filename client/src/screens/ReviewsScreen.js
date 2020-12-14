import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const ReviewsScreen = ({ match }) => {
  const bootcampId = match.params.id;
  const [bootcamp, setBootcamp] = useState(null);
  const [bootcampReviews, setBootcampReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { reviews } = useSelector((state) => state.reviewList);
  const { bootcamps } = useSelector((state) => state.bootcampList);

  useEffect(() => {
    bootcamps && setBootcamp(bootcamps.find((b) => b.id === bootcampId));
    reviews &&
      setBootcampReviews(
        reviews.filter((review) => review.bootcamp === bootcampId)
      );
    setLoading(false);
  }, [bootcamps, bootcamp, bootcampId, reviews]);

  return (
    <Row>
      {!bootcampReviews.length ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Col md={8}>
            <Link
              to={`/bootcamps/${bootcampId}`}
              className="btn btn-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Bootcamp Info
            </Link>
            {bootcampReviews.map((review) => (
              <div key={review._id} className="card mb-3">
                <h5 className="card-header bg-dark text-white">
                  {review.title}
                </h5>
                <div className="card-body">
                  <h5 className="card-title">
                    Rating:{" "}
                    <span className="text-success">{review.rating}</span>
                  </h5>
                  <p className="card-text">{review.text}</p>
                  <p className="text-muted">Writtern By {review.user.name}</p>
                </div>
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
              to={`/bootcamps/${bootcampId}/reviews/add`}
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

export default ReviewsScreen;
