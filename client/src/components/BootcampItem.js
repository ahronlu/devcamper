import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Spinner, Alert, Badge } from "react-bootstrap";

function BootcampItem({ bootcamp }) {
  return (
    <Card key={bootcamp.id} className="mb-3">
      <Row className="no-gutters">
        <Col className="md-4">
          <img src="img/image_1.jpg" className="card-img" alt="..." />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>
              <Link to={`/bootcamp/${bootcamp.id}`}>
                {bootcamp.name}
                <Badge pill className="float-right badge-success">
                  {bootcamp.averageRating}
                </Badge>
              </Link>
            </Card.Title>
            <Badge pill className="badge-dark mb-2">
              {bootcamp.location.city}, {bootcamp.location.country}
            </Badge>
            <Card.Text>
              {bootcamp.careers.map((c, i) => (
                <span key={i}>
                  {c}
                  {i < bootcamp.careers.length - 1 && ", "}
                </span>
              ))}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default BootcampItem;
