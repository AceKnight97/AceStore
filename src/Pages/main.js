import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Supergraphic from "../Components/UI/Supergraphic";
import APP_FLOW_ACTIONS, { MESSAGES } from "../Constants";
import auth from "../Helpers/auth";
import { useEmitter } from "../Helpers/customHooks";
import { logoutRequest } from "../Redux/Actions/login";
import reloadPageRequest from "../Redux/Actions/reload";
import FoodOrder from "./FoodOrder";
import History from "./History";
import Home from "./Home";
import User from "./User";

const Main = (props) => {
  useEffect(() => {
    window.onbeforeunload = () => {};
    window.onload = () => {
      props.reloadPageRequest();
    };
  }, []);

  const loginRequestListener = useCallback(() => {
    alert(MESSAGES.EXPIRED_TOKEN);
    auth.logout();
    props.logoutRequest();
  }, []);

  useEmitter(APP_FLOW_ACTIONS.LOGOUT_REQUEST, loginRequestListener, []);

  return (
    <main className="div-root">
      <Router>
        <Supergraphic></Supergraphic>
        <Switch>
          <Route exact path="/acestore" name="Home" component={Home} />
          <Route exact path="/history" name="Home" component={History} />
          <Route exact path="/user" name="Home" component={User} />
          <Route
            exact
            path="/food-order"
            name="Food Order"
            component={FoodOrder}
          />
          <Redirect path="/" to={{ pathname: "/acestore" }} />
          <Redirect path="*" to={{ pathname: "/acestore" }} />
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
