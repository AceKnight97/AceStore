import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import SubscribeNewFoodOrders from "../../Apollo/Functions/Subscribe/subscribeNewFoodOrders";
import DatepickerCT from "../../Components/Inputs/DatepickerCT";
import CustomerOrdersTable from "../../Components/Tables/CustomerOrdersTable";
import Loading from "../../Components/UI/Loading";
import { useMergeState } from "../../Helpers/customHooks";
import { mutationGetFoodOrders } from "./helper";
import "./_customer-orders.scss";

const CustomerOrders = (props) => {
  const [state, setState] = useMergeState({
    data: [],
    currentDate: moment(),
    loading: true,
  });
  const { className, isAll } = props;
  const { currentDate, data, loading } = state;

  const getFoodOrders = async () => {
    if (!currentDate) {
      return;
    }
    setState({ loading: true });
    try {
      const res = await mutationGetFoodOrders({
        currentDate,
        isAll,
      });
      // console.log({ res });
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
          {moment(currentDate || undefined).format("dddd, MMMM DD, YYYY")}
        </div>

        <SubscribeNewFoodOrders
          className="ml-24"
          updateOrders={getFoodOrders}
        ></SubscribeNewFoodOrders>
      </div>

      <CustomerOrdersTable
        data={data}
        isEditable={props.isAll}
      ></CustomerOrdersTable>
      {loading && <Loading></Loading>}
    </div>
  );
};
CustomerOrders.defaultProps = {
  className: "",
  isAll: false,
};
CustomerOrders.propTypes = {
  className: PropTypes.string,
  isAll: PropTypes.bool,
};

export default CustomerOrders;
