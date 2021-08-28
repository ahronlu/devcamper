import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Badge, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { listBootcampDetails } from "../actions/bootcampActions";
import { REVIEW_LIST_RESET } from "../constants/reviewConstants";
import { deleteReview } from "../actions/reviewActions";

const BootcampReviewsScreen = ({ match }) => {
  const { bootcampId } = match.params;

  const [canReview, setCanReview] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, error, bootcamp } = bootcampDetails;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = reviewDelete;

  useEffect(() => {
    if (!bootcamp.id || deleteSuccess) {
      dispatch(listBootcampDetails(bootcampId));
    }
    return () => dispatch({ type: REVIEW_LIST_RESET });
  }, [bootcampId, dispatch]);

  useEffect(() => {
    bootcamp &&
      setCanReview(
        bootcamp.reviews.some((review) => review.user._id !== userInfo?.id)
      );
  }, [bootcamp, userInfo?.id]);

  const handleDelete = (courseId) => {
    if (!window.confirm("Are you sure?")) return;
    dispatch(deleteReview(courseId));
  };

  return (
    <Row>
      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}
      {deleteError && (
        <Alert variant="danger" dismissible>
          {deleteError}
        </Alert>
      )}
      {deleteLoading && <Spinner animation="border" />}
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
              <Card key={review._id} className="mb-3">
                <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
                  {review.title}
                  {userInfo?.id === review.user._id && (
                    <div>
                      <Link
                        to={`/bootcamp/${bootcamp.id}/review/${review._id}/edit`}
                        className="btn btn-secondary"
                      >
                        <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(review._id)}
                      >
                        <i className="fas fa-times" aria-hidden="true"></i>
                      </Button>
                    </div>
                  )}
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Rating:{" "}
                    <span className="text-success">{review.rating}</span>
                  </Card.Title>
                  <Card.Text>{review.text}</Card.Text>
                  <p className="text-muted">Writtern By {review.user.name}</p>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col md={4}>
            <h1 className="text-center my-4">
              <Badge
                pill
                className=" badge-secondary badge-success rounded-circle p-3"
              >
                {bootcamp && parseInt(bootcamp.averageRating)}
              </Badge>
              Rating
            </h1>
            {userInfo?.role === "user" && canReview && (
              <Link
                to={`/bootcamp/${bootcampId}/add-review`}
                className="btn btn-primary btn-block my-3"
              >
                <i className="fas fa-pencil-alt"></i> Review This Bootcamp
              </Link>
            )}
          </Col>
        </>
      )}
    </Row>
  );
};

export default BootcampReviewsScreen;
