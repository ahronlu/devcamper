import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BootcampListScreen from "./screens/BootcampListScreen";
import ManageAccountScreen from "./screens/ManageAccountScreen";
import BootcampScreen from "./screens/BootcampScreen";
import BootcampReviewsScreen from "./screens/BootcampReviewsScreen";
import ManageBootcampScreen from "./screens/ManageBootcampScreen";
import ManageCoursesScreen from "./screens/ManageCoursesScreen";
import BootcampFormScreen from "./screens/BootcampFormScreen";
import ReviewAddScreen from "./screens/ReviewAddScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Container className="mt-5">
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route exact path="/bootcamps/:page" component={BootcampListScreen} />
          <Route exact path="/bootcamps/" component={BootcampListScreen} />
          <Route path="/bootcamp/create" component={BootcampFormScreen} />
          <Route path="/bootcamp/:id/edit" component={BootcampFormScreen} />
          <Route exact path="/bootcamp/:id" component={BootcampScreen} />
          <Route path="/bootcamp/:id/reviews" component={BootcampReviewsScreen} />
          <Route path="/bootcamp/:id/add-review" component={ReviewAddScreen} />
          <Route path="/manage-account" component={ManageAccountScreen} />
          <Route path="/manage-bootcamp" component={ManageBootcampScreen} />
          <Route path="/manage-courses" component={ManageCoursesScreen} />
          <Route path="/bootcamp/:id/add-course" component={CourseFormScreen} />
          <Route path="/bootcamp/:id/course/:id/edit" component={CourseFormScreen} />
        </Container>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
