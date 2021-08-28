// import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
// import { useState } from "react";

const HomeScreen = ({ history }) => {
  // const [counter, setCounter] = useState(0);

  // const { bootcamps, loading, error } = useSelector(
  //   (state) => state.bootcampList
  // );

  // useEffect(() => {
  //   bootcamps.length > 0 && counter && history.push("/bootcamps");
  // }, [bootcamps.length, history]);

  return (
    <div className="showcase ">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="dark-overlay">
        <div className="showcase-inner">
          <h1 className="display-4">Find a Code Bootcamp</h1>
          <p className="lead">
            Find, rate and read reviews on coding bootcamps
          </p>
          <Link to="/bootcamps" className="btn btn-primary btn-block my-3">
            Find Bootcamps
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
