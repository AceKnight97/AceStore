import PropTypes from "prop-types";
import React, { useEffect, useCallback } from "react";
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
import APP_FLOW_ACTIONS from "../Constants";
import { useEmitter, useMergeState } from "../Helpers/customHooks";
import { loginRequest, logoutRequest } from "../Redux/Actions/login";
import auth from "../Helpers/auth";

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

  const loginRequestListener = useCallback(() => {
    auth.logout();
    props.logoutRequest();
  }, []);

  useEmitter(APP_FLOW_ACTIONS.LOGOUT_REQUEST, loginRequestListener, []);

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
  logoutRequest: PropTypes.func.isRequired,
});

const mapDispatchToProps = {
  reloadPageRequest,
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
