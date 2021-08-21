import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BootcampListScreen from "./screens/BootcampListScreen";
import ManageAccountScreen from "./screens/ManageAccountScreen";
import BootcampScreen from "./screens/BootcampScreen";
import { listBootcamps } from "./actions/bootcampActions";
import { listReviews } from "./actions/reviewActions";
import ReviewsScreen from "./screens/ReviewsScreen";
import ManageBootcampScreen from "./screens/ManageBootcampScreen";
import BootcampFormScreen from "./screens/BootcampFormScreen";
import ReviewAddScreen from "./screens/ReviewAddScreen";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBootcamps());
    dispatch(listReviews());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Container className="mt-5">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route exact path="/bootcamps" component={BootcampListScreen} />
          <Route path="/bootcamps/create" component={BootcampFormScreen} />
          <Route path="/bootcamps/:id/edit" component={BootcampFormScreen} />
          <Route exact path="/bootcamps/:id" component={BootcampScreen} />
          <Route path="/bootcamps/:id/reviews" component={ReviewsScreen} />
          <Route path="/bootcamps/:id/add-review" component={ReviewAddScreen} />
          <Route path="/manage-account" component={ManageAccountScreen} />
          <Route path="/manage-bootcamp" component={ManageBootcampScreen} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
