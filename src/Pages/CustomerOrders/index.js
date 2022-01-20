import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import "./_customer-orders.scss";
import { useMergeState } from "../../Helpers/customHooks";
import AdminOrderTable from "../../Components/Tables/AdminOrderTable";
import DatepickerCT from "../../Components/Inputs/DatepickerCT";
import moment from "moment";

const CustomerOrders = (props) => {
  const [state, setState] = useMergeState({
    data: [],
    currentDate: moment(),
  });
  const { className } = props;
  const { currentDate } = state;
  const onChange = (key, value) => {
    setState({ [key]: value });
  };
  // console.log({ currentDate });
  return (
    <div className={classnames("custmer-orders", className)}>
      <DatepickerCT
        placeholder="Choose date"
        value={currentDate}
        onChange={onChange}
        name="currentDate"
      ></DatepickerCT>

      <AdminOrderTable></AdminOrderTable>
    </div>
  );
};
CustomerOrders.defaultProps = {
  className: "",
};
CustomerOrders.propTypes = {
  className: PropTypes.string,
};

export default CustomerOrders;
