import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Row,
  Col,
  Card,
  Form,
  FormCheck,
  Spinner,
} from "react-bootstrap";
import { updateBootcamp, createBootcamp, getMyBootcamp } from "../actions/bootcampActions";

const initialState = {
  name: "",
  description: "",
  website: "",
  phone: "",
  email: "",
  address: "",
  careers: [],
  jobAssistance: false,
  jobGuarantee: false,
  acceptGi: false,
  housing: false,
};

const BootcampFormScreen = ({ match, history }) => {
  const bootcampId = match.params.id;

  const [bootcamp, setBootcamp] = useState(initialState);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bootcampUpdate = useSelector((state) => state.bootcampUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = bootcampUpdate;

  const bootcampCreate = useSelector((state) => state.bootcampCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = bootcampCreate;

  const bootcampDetails = useSelector((state) => state.bootcampDetails);
  const { loading, error, bootcamp: myBootcamp } = bootcampDetails;

  useEffect(() => {
    if(!userInfo) history.push('login');
    if(userInfo.role === 'user') history.push('/');
    dispatch(getMyBootcamp());
    bootcampId && myBootcamp && setBootcamp({...myBootcamp, address: `${myBootcamp.location.street}, ${myBootcamp.location.city}, ${myBootcamp.location.state}, ${myBootcamp.location.zipcode}`});
  }, [myBootcamp, bootcampId, dispatch]);

  const handleChange = (e) => {
    e.target.type === "checkbox"
      ? setBootcamp({
          ...bootcamp,
          [e.target.name]: e.target.checked,
        })
      : setBootcamp({
          ...bootcamp,
          [e.target.name]: e.target.value,
        });
  };

  const handleCareersChange = (e) => {
    const options = e.target;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setBootcamp({ ...bootcamp, careers: value });
  };

  const SubmitBoocamp = async (e) => {
    e.preventDefault();
    try {
      if (bootcampId) {
        await dispatch(updateBootcamp(bootcamp));
      } else {
        await dispatch(createBootcamp(bootcamp));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="mb-2">{bootcampId ? "Update" : "Add"} Bootcamp</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={(e) => SubmitBoocamp(e)}>
          <Row>
            <Col md={6}>
              <Card className="bg-white py-2 px-4">
                <Card.Body>
                  <h3>Location & Contact</h3>
                  <p className="text-muted">
                    If multiple locations, use the main or largest
                  </p>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={bootcamp.name}
                      placeholder="Bootcamp Name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={bootcamp.address}
                      onChange={handleChange}
                      placeholder="Full Address"
                      required
                    />
                    <small className="form-text text-muted">
                      Street, city, state, etc
                    </small>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={bootcamp.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={bootcamp.email}
                      onChange={handleChange}
                      placeholder="Contact Email"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      name="website"
                      value={bootcamp.website}
                      onChange={handleChange}
                      placeholder="Website URL"
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-white py-2 px-4">
                <Card.Body>
                  <h3>Other Info</h3>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={bootcamp.description}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Description (What you offer, etc)"
                      maxLength="500"
                    ></Form.Control>
                    <small className="form-text text-muted">
                      No more than 500 characters
                    </small>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Careers</Form.Label>
                    <Form.Control
                      as="select"
                      name="careers"
                      value={bootcamp.careers}
                      onChange={handleCareersChange}
                      multiple
                    >
                      <option disabled>Select all that apply</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Business">Business</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Check>
                    <FormCheck.Input
                      type="checkbox"
                      name="housing"
                      checked={bootcamp.housing}
                      onChange={handleChange}
                      id="housing"
                    />
                    <FormCheck.Label htmlFor="housing">Housing</FormCheck.Label>
                  </Form.Check>
                  <Form.Check>
                    <FormCheck.Input
                      type="checkbox"
                      name="jobAssistance"
                      checked={bootcamp.jobAssistance}
                      onChange={handleChange}
                      id="jobAssistance"
                    />
                    <FormCheck.Label htmlFor="jobAssistance">
                      Job Assistance
                    </FormCheck.Label>
                  </Form.Check>
                  <Form.Check>
                    <FormCheck.Input
                      type="checkbox"
                      name="jobGuarantee"
                      checked={bootcamp.jobGuarantee}
                      onChange={handleChange}
                      id="jobGuarantee"
                    />
                    <FormCheck.Label htmlFor="jobGuarantee">
                      Job Guarantee
                    </FormCheck.Label>
                  </Form.Check>
                  <Form.Check>
                    <FormCheck.Input
                      type="checkbox"
                      name="acceptGi"
                      value={bootcamp.acceptGi}
                      onChange={handleChange}
                      id="acceptGi"
                    />
                    <FormCheck.Label htmlFor="acceptGi">
                      Accepts GI Bill
                    </FormCheck.Label>
                  </Form.Check>
                  <p className="text-muted my-4">
                    *After you add the bootcamp, you can add the specific
                    courses offered
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {updateLoading || (createLoading && <Spinner animation="border" />)}
          {updateError && <Alert variant="danger">{updateError}</Alert>}
          {createError && <Alert variant="danger">{createError}</Alert>}
          {updateSuccess && <Alert variant="success">Bootcamp Updated</Alert>}
          {createSuccess && <Alert variant="success">Bootcamp Created</Alert>}
          <Form.Group>
            <Form.Control
              type="submit"
              value="Submit Bootcamp"
              className="btn btn-success btn-block my-4"
            />
            <Link
              to="/manage-bootcamp"
              className="btn btn-danger btn-block mb-4"
            >
              Cancel
            </Link>
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default BootcampFormScreen;
