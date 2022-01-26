import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Supergraphic from "../Components/UI/Supergraphic";
import { PAGE_MANAGER } from "../Constants";
import reloadPageRequest from "../Redux/Actions/reload";
import FoodOrder from "./FoodOrder";
import Home from "./Home";
import History from "./History";
import User from "./User";

const Main = (props) => {
  // const location = useLocation();
  // console.log({ location });
  useEffect(() => {
    window.onbeforeunload = () => {};
    window.onload = () => {
      props.reloadPageRequest();
    };
    // window.onload = () => {
    //   props.reloadPageRequest();
    // };
  }, []);
  return (
    <main className="div-root">
      <Router>
        <Supergraphic></Supergraphic>
        <Switch>
          <Route exact path="/retail-store" name="Home" component={Home} />
          <Route exact path="/history" name="Home" component={History} />
          <Route exact path="/user" name="Home" component={User} />
          <Route
            exact
            path="/food-order"
            name="Food Order"
            component={FoodOrder}
          />
          <Redirect path="/" to={{ pathname: "/retail-store" }} />
        </Switch>
      </Router>
    </main>
  );
};

Main.defaultProps = {};

Main.propTypes = {
  reloadPageRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  reloadPageRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
