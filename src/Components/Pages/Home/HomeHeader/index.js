import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Button } from "antd";
import { useMergeState } from "../../../../Helpers/customHooks";
import logo from "../../../../Images/Pages/Home/logo-min.jpg";
import LoginModal from "../../../Modals/LoginModal";
import RegisterModal from "../../../Modals/RegisterModal";
// import Supergraphic from "../../../UI/Supergraphic";
// import Loading from "../../../UI/Loading";

const MOCKING_USER = {
  // isVerify: false,
  // username: 'Truong Thanh Triet',
};

const HomeHeader = (props) => {
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
  const onClickUsername = () => {};
  const onClickLogout = () => { };
  const { isVerify, username } = MOCKING_USER;
  return (
    <>
      {/* <Loading></Loading> */}

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

      <LoginModal visible={visibleLogin} onClickCancel={onClickLogin} />
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
};

export default HomeHeader;
