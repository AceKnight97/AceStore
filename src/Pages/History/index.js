import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import auth from "../../Helpers/auth";
import CustomerOrders from "../CustomerOrders";
import "./_history.scss";

const History = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { className } = props;

  useEffect(() => {
    if (!auth.isSuccess()) {
      console.log({ login: props.login, auth: auth.isSuccess() });
      history.push("/acestore");
      setState({});
    }
  }, [props.login]);

  return (
    <div className={classnames("history", className)}>
      <HomeHeader></HomeHeader>
      <div className="history-body">
        <CustomerOrders isAll={false}></CustomerOrders>
      </div>
    </div>
  );
};
History.defaultProps = {
  className: "",
};
History.propTypes = {
  className: PropTypes.string,
  login: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
