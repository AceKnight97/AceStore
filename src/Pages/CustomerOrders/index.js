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
      const res = await mutationGetFoodOrders({ currentDate });
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
      <DatepickerCT
        className="customer-orders-cur-date"
        placeholder="Choose date"
        value={currentDate}
        onChange={onChange}
        name="currentDate"
      ></DatepickerCT>
      <CustomerOrdersTable data={data}></CustomerOrdersTable>
      {/*
     {data.length === 0 ? (
        <div className="no-data">There is no data to display</div>
      ) : (
        _.map(data, (x, i) => (
          <AdminOrderTable
            key={i}
            data={x.data}
            index={i}
            date={x.date}
            isShow={i === 0}
            notes={x.notes}
            status={x.status}
          ></AdminOrderTable>
        ))
      )}
    */}
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
