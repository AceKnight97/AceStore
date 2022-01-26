import { Button } from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import auth from "../../../../Helpers/auth";
import { useMergeState } from "../../../../Helpers/customHooks";
import { loginRequest, logoutRequest } from "../../../../Redux/Actions/login";
import LoginModal from "../../../Modals/LoginModal";
import RegisterModal from "../../../Modals/RegisterModal";

const HomeHeader = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useMergeState({
    visibleLogin: false,
    visibleRegister: false,
  });
  const { className } = props;
  const { visibleLogin, visibleRegister } = state;
  const onClickLogin = () => {
    setState({ visibleLogin: !visibleLogin });
  };
  const onClickRegister = () => {
    setState({ visibleRegister: !visibleRegister });
  };
  const onClickActive = () => {};
  const onClickUsername = () => {
    if (location.pathname !== "/user") {
      history.push("/user");
    }
  };
  const onClickHistory = () => {
    if (location.pathname !== "/history") {
      history.push("/history");
    }
  };
  const onClickLogout = () => {
    auth.logout();
    props.logoutRequest();
    history.push("/retail-store");
    setState({});
  };

  const { isVerify = true, username } = auth.getDataLogin();

  useEffect(() => {
    if (_.isEmpty(props.login) && _.isEmpty(auth.getDataLogin())) {
      console.log("No current user");
      setState({});
    }
  }, [props.login]);

  return (
    <>
      <div className={classnames("home-header", className)}>
        {/*  <img src={logo} alt="Logo" /> */}

        <div className="home-header-btns">
          {username ? (
            <>
              {!isVerify && (
                <Button
                  type="link"
                  onClick={onClickActive}
                  className="home-header-active-account-btn"
                >
                  Activate account
                </Button>
              )}

              <Button
                type="link"
                onClick={onClickUsername}
                className="home-header-username-btn"
              >
                {username}
              </Button>
              <Button
                type="link"
                onClick={onClickHistory}
                className="home-header-username-btn"
              >
                History
              </Button>
              <Button
                type="link"
                onClick={onClickLogout}
                className="home-header-logout-btn"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                type="link"
                onClick={onClickLogin}
                className="home-header-login-btn"
              >
                Login
              </Button>
              <Button
                type="link"
                onClick={onClickRegister}
                className="home-header-register-btn"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      <LoginModal
        visible={visibleLogin}
        onClickCancel={onClickLogin}
        loginRequest={props.loginRequest}
      />
      <RegisterModal
        visible={visibleRegister}
        onClickCancel={onClickRegister}
      />
    </>
  );
};
HomeHeader.defaultProps = {
  className: "",
};

HomeHeader.propTypes = {
  className: PropTypes.string,
  login: PropTypes.shape({
    isSuccess: PropTypes.bool,
  }).isRequired,
  loginRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = {
  loginRequest,
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
