import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import "./_customer-orders.scss";
import { useMergeState } from "../../Helpers/customHooks";
import AdminOrderTable from "../../Components/Tables/AdminOrderTable";
import DatepickerCT from "../../Components/Inputs/DatepickerCT";
import moment from "moment";
import { mutationGetFoodOrders } from "./helper";
import { useEffect } from "react";
import CustomerOrdersTable from "../../Components/Tables/CustomerOrdersTable";

const CustomerOrders = (props) => {
  const [state, setState] = useMergeState({
    data: [],
    currentDate: moment(),
    loading: true,
  });
  const { className } = props;
  const { currentDate, data } = state;

  const getFoodOrders = async () => {
    if (!currentDate) {
      return;
    }
    try {
      const res = await mutationGetFoodOrders({
        currentDate,
        email: props.email,
      });
      setState({ data: res, loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };

  useEffect(() => {
    getFoodOrders();
  }, [currentDate]);

  const onChange = (key, value) => {
    setState({ [key]: value });
  };

  return (
    <div className={classnames("customer-orders", className)}>
      <div className="flex">
        <DatepickerCT
          className="customer-orders-cur-date"
          placeholder="Choose date"
          value={currentDate}
          onChange={onChange}
          name="currentDate"
        ></DatepickerCT>

        <div className="customer-orders-date">
          {moment(currentDate).format("dddd, MMMM DD, YYYY")}
        </div>
      </div>

      <CustomerOrdersTable
        data={data}
        isEditable={!props.email}
      ></CustomerOrdersTable>
    </div>
  );
};
CustomerOrders.defaultProps = {
  className: "",
  email: undefined,
};
CustomerOrders.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
};

export default CustomerOrders;
