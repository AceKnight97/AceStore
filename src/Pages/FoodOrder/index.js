import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import {} from "antd";
import { useMergeState } from "../../Helpers/customHooks";
import auth from "../../Helpers/auth";
import "./_food-order.scss";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";

const FoodOrder = (props) => {
  const [state, setState] = useMergeState({
    data: [],
  });
  const { className } = props;
  useEffect(() => {}, []);
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  return (
    <div className={classnames("food-order", className)}>
      <HomeHeader></HomeHeader>
      <div className="food-order-body">Food order</div>
    </div>
  );
};
FoodOrder.defaultProps = {
  className: "",
};
FoodOrder.propTypes = {
  className: PropTypes.string,
};

export default FoodOrder;
