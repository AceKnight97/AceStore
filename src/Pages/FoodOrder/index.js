import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";
import { Button } from "antd";
import { useMergeState } from "../../Helpers/customHooks";
import auth from "../../Helpers/auth";
import "./_food-order.scss";
import HomeHeader from "../../Components/Pages/Home/HomeHeader";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AntdTable from "../../Components/Tables/AntdTable";
import {
  createOrderForAnyCustomer,
  getFoodData,
  mutationCreateOrder,
} from "./helper";
import { calcCartTotal } from "../../Components/Pages/Home/HomeBody/helper";
import { getPrice } from "../../Helpers";
import AnyCustomerModal from "../../Components/Modals/AnyCustomerModal";

const FoodOrder = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    foodData: getFoodData(location.state),
    anyCustomerVisible: false,
  });
  const { className } = props;
  const { foodData, anyCustomerVisible } = state;
  useEffect(() => {}, []);
  const { total } = calcCartTotal(location.state);
  const { address, phone, email } = auth.getDataLogin();

  const generateColumns = () => {
    const columns = [
      {
        title: "No.",
        dataIndex: "index",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (cell) => getPrice(cell, undefined, ""),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
    ];
    return columns;
  };

  const orderAnyCustomer = async (anyCustomerData = {}) => {
    setState({ loading: true });
    const res = await createOrderForAnyCustomer(foodData, anyCustomerData);
    const obj = { loading: false };
    if (res.isSuccess) {
      alert("Successfully creating order!");
      auth.setFoodData(undefined);
      _.assign(obj, { anyCustomerVisible: false });
      setTimeout(() => {
        history.push("/home");
      }, 300);
    } else {
      alert("Failed to create order: ", res.message);
    }
    setState(obj);
  };

  const onClickBack = () => {
    history.push("/home");
  };

  const onClickCancel = () => {
    setState({ anyCustomerVisible: !anyCustomerVisible });
  };

  const onClickConfirm = async () => {
    if (!address || !phone || !email) {
      setState({ anyCustomerVisible: true });
      return;
    }
    setState({ loading: true });
    const res = await mutationCreateOrder(foodData, email);
    if (res.isSuccess) {
      alert("Successfully creating order!");
      auth.setFoodData(undefined);
      history.push("/home");
    } else {
      alert("Failed to create order: ", res.message);
    }
    setState({ loading: false });
  };

  return (
    <div className={classnames("food-order", className)}>
      <HomeHeader></HomeHeader>
      <div className="food-order-body">
        <div className="food-order-body-toper">
          <div className="flex">
            <span className="b">Payment Options:</span>
            <span className="ml-4">Cash - When receiving</span>
          </div>
          <div className="flex">
            <span className="b">Total:</span>
            <span className="ml-4">{getPrice(total, undefined, "")}</span>
          </div>
        </div>
        <div className="food-order-body-toper">
          <div className="flex">
            <span className="b">Delivery:</span>
            <span className="ml-4">{address}</span>
          </div>
          <div className="flex">
            <span className="b">Contact at:</span>
            <span className="ml-4">{phone}</span>
          </div>
        </div>
        <div className="food-order-body-btns">
          <Button onClick={onClickBack}>Back</Button>
          <Button type="primary" onClick={onClickConfirm}>
            Confirm
          </Button>
        </div>
        <AntdTable
          className="mt-48"
          rowKey="id"
          totalData={foodData}
          columns={generateColumns()}
        ></AntdTable>
      </div>

      <AnyCustomerModal
        visible={anyCustomerVisible}
        onClickCancel={onClickCancel}
        onClick={orderAnyCustomer}
      ></AnyCustomerModal>
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
