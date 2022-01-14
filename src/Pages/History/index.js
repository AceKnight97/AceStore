import {} from "antd";
import classnames from "classnames";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import HistoryTable from "../../Components/Tables/HistoryTable";
import auth from "../../Helpers/auth";
import { useMergeState } from "../../Helpers/customHooks";
import { getFoodData } from "../FoodOrder/helper";
import { queryHistory } from "./helper";
import "./_history.scss";

const History = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    orderHistory: getFoodData(location.state),
  });
  const { className } = props;

  const fetchHistory = async () => {
    const orderHistory = await queryHistory();
    setState({ orderHistory });
  };
  const { orderHistory } = state;

  useEffect(() => {
    if (auth.getToken()) {
      fetchHistory();
    } else {
      history.push("/home");
    }
  }, [props.login]);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  return (
    <div className={classnames("history", className)}>
      <HomeHeader></HomeHeader>
      <div className="history-body">
        {orderHistory.length === 0 ? (
          <div className="history-body-no-his">There is no data to display</div>
        ) : (
          _.map(orderHistory, (x, index) => (
            <HistoryTable
              key={index}
              data={x.data}
              date={x.date}
              index={index}
              fetchHistory={fetchHistory}
            ></HistoryTable>
          ))
        )}
      </div>
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
