import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner loading="border" />
        ) : userInfo ? (
          <Component {...props} userInfo={userInfo} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
