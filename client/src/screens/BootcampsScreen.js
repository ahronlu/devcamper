import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Spinner, Alert } from "react-bootstrap";

const BootcampsScreen = () => {
  const { bootcamps, loading, error } = useSelector(
    (state) => state.bootcampList
  );

  return (
    <>
      <Row>
        <Col md={4}>
          <Card body className="mb-4">
            <h4 className="mb-3">By Location</h4>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
                      name="miles"
                      placeholder="Miles From"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      className="form-control"
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
          </Card>

          <h4>Filter</h4>
          <Form>
            <Form.Group>
              <Form.Label> Rating</Form.Label>
              <Form.Control
                as="select"
                defaultValue="any"
                className="mb-2"
                custom
              >
                <option value="any">Any</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
                <option value="5">5+</option>
                <option value="4">4+</option>
                <option value="3">3+</option>
                <option value="2">2+</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label> Budget</Form.Label>
              <Form.Control
                as="select"
                defaultValue="any"
                className="mb-2"
                custom
              >
                <option value="any">Any</option>
                <option value="20000">$20,000</option>
                <option value="15000">$15,000</option>
                <option value="10000">$10,000</option>
                <option value="8000">$8,000</option>
                <option value="6000">$6,000</option>
                <option value="4000">$4,000</option>
                <option value="2000">$2,000</option>
              </Form.Control>
            </Form.Group>
            <Form.Control
              type="submit"
              value="Find Bootcamps"
              className="btn btn-primary btn-block"
            />
          </Form>
        </Col>
        <Col md={8}>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {bootcamps &&
            bootcamps.map((bootcamp) => (
              <Card key={bootcamp.id} className="mb-3">
                <Row className="no-gutters">
                  <Col className="md-4">
                    <img src="img/image_1.jpg" className="card-img" alt="..." />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/bootcamps/${bootcamp.id}`}>
                          {bootcamp.name}
                          <span className="float-right badge badge-success">
                            {bootcamp.averageRating}
                          </span>
                        </Link>
                      </Card.Title>
                      <span className="badge badge-dark mb-2">
                        {bootcamp.location.city}, {bootcamp.location.country}
                      </span>
                      <Card.Text>
                        {bootcamp.careers.map((c, i) => (
                          <span key={i}>
                            {c}
                            {i < bootcamps.length - 1 && ", "}
                          </span>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
        </Col>
      </Row>
    </>
  );
};

export default BootcampsScreen;
