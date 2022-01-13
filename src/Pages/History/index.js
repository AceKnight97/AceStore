import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import {} from "antd";
import { useMergeState } from "../../Helpers/customHooks";
import "./_history.scss";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import AntdTable from "../../Components/Tables/AntdTable";
import { useLocation, useHistory } from "react-router-dom";
import { getFoodData } from "../FoodOrder/helper";
import auth from "../../Helpers/auth";
import { getPrice } from "../../Helpers";
import { queryHistory } from "./helper";
import { connect } from "react-redux";
import HistoryTable from "../../Components/Tables/HistoryTable";

const History = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    orderHistory: getFoodData(location.state),
  });
  const { className } = props;

  const fetchHistory = async () => {
    const orderHistory = await queryHistory();
    // console.log({ orderHistory });
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

  const { address, phone, email } = auth.getDataLogin();

  return (
    <div className={classnames("history", className)}>
      <HomeHeader></HomeHeader>
      <div className="history-body">
        {_.map(orderHistory, (x, index) => (
          <HistoryTable
            key={index}
            data={x.data}
            date={x.date}
            index={index}
          ></HistoryTable>
        ))}
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
