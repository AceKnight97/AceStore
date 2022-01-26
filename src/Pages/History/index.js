import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import Loading from "../../Components/UI/Loading";
import auth from "../../Helpers/auth";
import { useMergeState } from "../../Helpers/customHooks";
import CustomerOrders from "../CustomerOrders";
import { getFoodData } from "../FoodOrder/helper";
import "./_history.scss";

const History = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    orderHistory: getFoodData(location.state),
    loading: true,
  });
  const { className } = props;

  const { loading } = state;

  useEffect(() => {
    if (!auth.isSuccess()) {
      console.log({ login: props.login, auth: auth.isSuccess() });
      history.push("/retail-store");
      setState({});
    }
  }, [props.login]);
  return (
    <div className={classnames("history", className)}>
      <HomeHeader></HomeHeader>
      <div className="history-body">
        <CustomerOrders email={auth.getDataLogin()?.email}></CustomerOrders>
      </div>
      {loading && <Loading></Loading>}
    </div>
  );
};
History.defaultProps = {
  className: "",
};
History.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(History);
