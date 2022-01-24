import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import HistoryTable from "../../Components/Tables/HistoryTable";
import Loading from "../../Components/UI/Loading";
import auth from "../../Helpers/auth";
import { useMergeState } from "../../Helpers/customHooks";
import CustomerOrders from "../CustomerOrders";
import { getFoodData } from "../FoodOrder/helper";
import { queryHistory } from "./helper";
import "./_history.scss";

const History = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    orderHistory: getFoodData(location.state),
    loading: true,
  });
  const { className } = props;

  const fetchHistory = async () => {
    try {
      const orderHistory = await queryHistory();
      setState({ orderHistory, loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };
  const { orderHistory, loading } = state;

  useEffect(() => {
    if (!auth.getToken()) {
      console.log({ login: props.login, auth: auth.getToken() });
      history.push("/home");
      setState({});
      // console.log({ Nologin: props.login });
    } else {
      fetchHistory();
    }
  }, [props.login]);
  return (
    <div className={classnames("history", className)}>
      <HomeHeader></HomeHeader>
      <div className="history-body">
        {/*
       {orderHistory.length === 0 ? (
          <div className="history-body-no-his">There is no data to display</div>
        ) : (
          _.map(orderHistory, (x, index) => (
            <HistoryTable
              key={index}
              data={x.data}
              date={x.date}
              notes={x.notes}
              status={x.status}
              index={index}
              fetchHistory={fetchHistory}
            ></HistoryTable>
          ))
        )}
      */}
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
